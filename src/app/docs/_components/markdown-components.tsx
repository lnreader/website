import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import type { MDXComponents } from "mdx/types";

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(textContent).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textContent(node.props.children);
  }

  return "";
}

function stripLeadingText(node: ReactNode, pattern: RegExp): ReactNode {
  let stripped = false;

  function visit(child: ReactNode): ReactNode {
    if (stripped) {
      return child;
    }

    if (typeof child === "string") {
      const next = child.replace(pattern, "");
      stripped = next !== child;
      return next;
    }

    if (isValidElement<{ children?: ReactNode }>(child)) {
      return cloneElement(child, {
        children: Children.map(child.props.children, visit),
      });
    }

    return child;
  }

  return Children.map(node, visit);
}

function SectionHeading({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">): ReactElement {
  const match = textContent(children).match(/^\s*(\d+)[.)]?\s*/u);
  const generatedNumber = props["data-n"];
  const number =
    match?.[1]?.padStart(2, "0") ??
    (typeof generatedNumber === "string" ? generatedNumber : undefined);
  const cleanedChildren = match
    ? stripLeadingText(children, /^\s*\d+[.)]?\s*/u)
    : children;

  return (
    <h2 {...props} data-n={number}>
      {cleanedChildren}
    </h2>
  );
}

function MarkdownBlockquote({
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">): ReactElement {
  const marker = textContent(children).trimStart().match(/^\[!(TIP|WARNING)\]\s*/u);

  if (!marker) {
    return <blockquote {...props}>{children}</blockquote>;
  }

  const variant = marker[1] === "WARNING" ? "warn" : "tip";
  const cleanedChildren = stripLeadingText(
    children,
    /^\s*\[!(?:TIP|WARNING)\]\s*/u
  );

  return (
    <aside className={`md-callout md-callout--${variant}`}>
      <span className="md-callout__tag">
        {variant === "warn" ? "Warn" : "Tip"}
      </span>
      <div>{cleanedChildren}</div>
      {variant === "tip" && (
        <>
          <i className="md-callout__mark md-callout__mark--tl" />
          <i className="md-callout__mark md-callout__mark--tr" />
          <i className="md-callout__mark md-callout__mark--bl" />
          <i className="md-callout__mark md-callout__mark--br" />
        </>
      )}
    </aside>
  );
}

export const docsMdxComponents: MDXComponents = {
  h2: SectionHeading,
  blockquote: MarkdownBlockquote,
};
