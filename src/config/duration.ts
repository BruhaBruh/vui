export type Duration = number;

export type DurationAsString<T extends Duration> = `${T}ms`;

export const durationMapper = {
  asMotion<T extends Duration>(value: T) {
    return value / 1000;
  },
  asString<T extends Duration>(value: T): DurationAsString<T> {
    return `${value}ms`;
  },
};
