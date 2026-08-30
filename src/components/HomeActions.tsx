import Link from "next/link";
import { KidIcon, type KidIconKind } from "@/components/marks/KidIcons";
import type { Locale } from "@/lib/i18n";
import type { PageContent } from "@/lib/content-types";

const actionMap = [
  { key: "watch", label: "watchLabel", text: "watchText", kind: "watch", className: "action-watch" },
  { key: "play", label: "playLabel", text: "playText", kind: "play", className: "action-play" },
  { key: "create", label: "createLabel", text: "createText", kind: "create", className: "action-create" },
  { key: "explore", label: "exploreLabel", text: "exploreText", kind: "explore", className: "action-explore" }
] as const;

export function HomeActions({ locale, content }: { locale: Locale; content: PageContent }) {
  return (
    <div className="home-actions" aria-label="Vaphia activities">
      {actionMap.map(({ key, label, text, kind, className }) => (
        <Link key={key} href={`/${locale}/${key}`} className={`kid-action ${className}`}>
          <div className="kid-action-visual" aria-hidden="true">
            <span className="shape shape-a" />
            <span className="shape shape-b" />
            <span className="action-spark spark-one" />
            <span className="action-spark spark-two" />
            <KidIcon kind={kind as KidIconKind} />
          </div>
          <div>
            <strong>{content[label]}</strong>
            <span>{content[text]}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
