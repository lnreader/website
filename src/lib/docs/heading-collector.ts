import type { Root, RootContent, Element } from "hast";

export interface DocHeading {
  readonly id: string;
  readonly title: string;
  readonly level: number;
}

/** rehype plugin: collects h1-h6 into `headings` and numbers h2s via `data-n`, for the TOC/`.md h2::before` styling. */
export function createHeadingCollector(headings: Array<DocHeading>) {
  return () => (tree: Root) => {
    collectHeadings(tree, headings, { section: 0 });
  };
}

function extractText(node: Element): string {
  const parts: Array<string> = [];

  (node.children ?? []).forEach((child) => {
    if (child.type === "text") {
      const value = child.value;

      if (value) {
        parts.push(String(value));
      }

      return;
    }

    if (child.type === "element") {
      const nested = extractText(child);

      if (nested) {
        parts.push(nested);
      }
    }
  });

  return parts.join(" ").replace(/\s+/gu, " ").trim();
}

function collectHeadings(
  node: Root | Element,
  headings: Array<DocHeading>,
  state: { section: number }
): void {
  if (node.type === "element") {
    if (isHeading(node)) {
      if (node.tagName === "h2") {
        state.section += 1;
        node.properties = {
          ...node.properties,
          "data-n": String(state.section).padStart(2, "0"),
        };
      }

      const id = node.properties?.id;

      if (typeof id === "string") {
        const title = extractText(node);

        if (title) {
          headings.push({
            id,
            title,
            level: Number.parseInt(node.tagName.replace("h", ""), 10),
          });
        }
      }
    }

    node.children?.forEach((child) => {
      if (child.type === "element") {
        collectHeadings(child, headings, state);
      }
    });

    return;
  }

  node.children.forEach((child: RootContent) => {
    if (child.type === "element") {
      collectHeadings(child, headings, state);
    }
  });
}

function isHeading(node: Element): boolean {
  return Boolean(node.tagName && /^h[1-6]$/u.test(node.tagName));
}
