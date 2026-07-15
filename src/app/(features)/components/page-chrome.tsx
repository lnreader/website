import { clsx } from "clsx";
import SiteShell from "./site-shell";

interface PageChromeProps {
  readonly children: React.ReactNode;
  readonly containerClassName?: string;
}

export default function PageChrome({
  children,
  containerClassName,
}: PageChromeProps) {
  return (
    <SiteShell>
      <div className={clsx("mx-auto w-full max-w-[1232px] px-5 pt-8 pb-[60px] sm:px-[clamp(24px,3vw,36px)] sm:pt-12 sm:pb-20", containerClassName)}>
        {children}
      </div>
    </SiteShell>
  );
}
