import Link from "next/link";
import { Film, Gamepad2, Palette, Telescope } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { PageContent } from "@/lib/content-types";

const actionMap = [
  { key: "watch", label: "watchLabel", text: "watchText", Icon: Film, className: "action-watch" },
  { key: "play", label: "playLabel", text: "playText", Icon: Gamepad2, className: "action-play" },
  { key: "create", label: "createLabel", text: "createText", Icon: Palette, className: "action-create" },
  { key: "explore", label: "exploreLabel", text: "exploreText", Icon: Telescope, className: "action-explore" }
] as const;

export function HomeActions({ locale, content }: { locale: Locale; content: PageContent }) {
  return (
    <div className="home-actions" aria-label="Vaphia activities">
      {actionMap.map(({ key, label, text, Icon, className }) => (
        <Link key={key} href={`/${locale}/${key}`} className={`kid-action ${className}`}>
          <div className="kid-action-visual" aria-hidden="true">
            <span className="shape shape-a" />
            <span className="shape shape-b" />
            <Icon size={58} strokeWidth={2.2} />
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
