export type Easing = [number, number, number, number];

export type EasingAsString<T extends Easing> =
  `cubic-bezier(${T[0]}, ${T[1]}, ${T[2]}, ${T[3]})`;

export const easingMapper = {
  asMotion<T extends Easing>(value: T) {
    return value;
  },
  asString<T extends Easing>(value: T): EasingAsString<T> {
    return `cubic-bezier(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`;
  },
};
