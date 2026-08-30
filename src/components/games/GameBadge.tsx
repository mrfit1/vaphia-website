import { GameIcon } from "@/components/marks/KidIcons";
import type { Mechanic } from "@/lib/games/catalog";

export function GameBadge({ mechanic }: { mechanic: Mechanic }) {
  return (
    <span className="game-badge" aria-hidden="true">
      <GameIcon mechanic={mechanic} />
      <span className="game-badge-glint" />
    </span>
  );
}
