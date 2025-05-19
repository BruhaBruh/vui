import { type Easing, type EasingAsString, easingMapper } from './easing';

export const materialEasingValues = {
  standard: [0.2, 0.0, 0, 1.0],
  'standard-decelerate': [0, 0, 0, 1],
  'standard-accelerate': [0.3, 0.0, 0.8, 0.15],
  emphasized: [0.2, 0.0, 0, 1.0],
  'emphasized-decelerate': [0.05, 0.7, 0.1, 1.0],
  'emphasized-accelerate': [0.3, 0.0, 0.8, 0.15],
} satisfies Record<string, Easing>;

type Registry = typeof materialEasingValues;

type Key = keyof Registry;

export type MaterialEasing = Key;

export type MaterialEasingValue<T extends Key> = Registry[T];

type StringRegistry = {
  [K in Key]: EasingAsString<Registry[K]>;
};

export const materialEasing = {
  ...materialEasingValues,
  keys(): Key[] {
    return Object.keys(materialEasingValues) as Key[];
  },
  has(key: Key | (string & {})): key is Key {
    return this.keys().includes(key as Key);
  },
  value<T extends Key>(key: T): Registry[T] {
    return materialEasingValues[key];
  },
  asMotion<T extends Key>(key: T): Registry[T] {
    return easingMapper.asMotion(materialEasingValues[key]);
  },
  asString<T extends Key>(key: T): EasingAsString<Registry[T]> {
    return easingMapper.asString(materialEasingValues[key]);
  },
  toStringRegistry(): StringRegistry {
    const result = {} as StringRegistry;

    this.keys().forEach((key) => {
      result[key] = this.asString(key);
    });

    return result as StringRegistry;
  },
} as const;
