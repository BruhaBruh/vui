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
} as const;

type Registry = typeof materialDurationValues;

type Key = keyof Registry;

type AsString<T extends Key> = `${Registry[T]}ms`;

type StringRegistry = {
  [key in Key]: AsString<key>;
};

export const materialDuration = {
  ...materialDurationValues,
  keys(): Key[] {
    return Object.keys(materialDurationValues) as Key[];
  },
  has(key: string): key is Key {
    return Object.keys(materialDurationValues).includes(key);
  },
  asMotion(key: Key) {
    return materialDurationValues[key] / 1000;
  },
  asString<T extends Key>(key: T): AsString<T> {
    return `${materialDurationValues[key]}ms`;
  },
  toStringRegistry(): StringRegistry {
    const result = {} as Record<Key, AsString<Key>>;

    this.keys().forEach((key) => {
      result[key] = this.asString(key);
    });

    return result as StringRegistry;
  },
} as const;
