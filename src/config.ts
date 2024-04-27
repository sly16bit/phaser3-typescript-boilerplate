export const Directions = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
} as const;

type ObjectValues<T> = T[keyof T];
export type Directions = ObjectValues<typeof Directions>;
