import { type Duration, type DurationAsString, durationMapper } from './duration';

export const materialDurationValues = {
  'short-1': 50,
  'short-2': 100,
  'short-3': 150,
  'short-4': 200,
  'medium-1': 250,
  'medium-2': 300,
  'medium-3': 350,
  'medium-4': 400,
  'long-1': 450,
  'long-2': 500,
  'long-3': 550,
  'long-4': 600,
  'extra-long-1': 700,
  'extra-long-2': 800,
  'extra-long-3': 900,
  'extra-long-4': 1000,
} satisfies Record<string, Duration>;

type Registry = typeof materialDurationValues;

type Key = keyof Registry;

export type MaterialDuration = Key;

export type MaterialDurationValue<T extends Key> = Registry[T];

type StringRegistry = {
  [K in Key]: DurationAsString<Registry[K]>;
};

export const materialDuration = {
  ...materialDurationValues,
  keys(): Key[] {
    return Object.keys(materialDurationValues) as Key[];
  },
  has(key: Key | (string & {})): key is Key {
    return this.keys().includes(key as Key);
  },
  value<T extends Key>(key: T): Registry[T] {
    return materialDurationValues[key];
  },
  asMotion<T extends Key>(key: T): Registry[T] {
    return durationMapper.asMotion(materialDurationValues[key]);
  },
  asString<T extends Key>(key: T): DurationAsString<Registry[T]> {
    return durationMapper.asString(materialDurationValues[key]);
  },
  toStringRegistry(): StringRegistry {
    const result = {} as StringRegistry;

    this.keys().forEach((key) => {
      result[key] = this.asString(key);
    });

    return result as StringRegistry;
  },
} as const;
