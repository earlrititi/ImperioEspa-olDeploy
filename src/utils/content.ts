// Keep collection pages consistent by sorting dated entries newest-first in one place.
type EntryWithDate = {
  data: {
    date: string;
  };
};

export const TIER_LABELS = {
  piquero: "Piquero",
  arcabucero: "Arcabucero",
  "maestre-de-campo": "Maestre de Campo",
} as const;

type TierSlug = keyof typeof TIER_LABELS;

export const getTierLabel = (tier: string) =>
  TIER_LABELS[tier as TierSlug] ?? tier;

export const sortEntriesByDateDesc = <T extends EntryWithDate>(entries: T[]) =>
  [...entries].sort(
    (left, right) =>
      new Date(right.data.date).getTime() - new Date(left.data.date).getTime()
  );
