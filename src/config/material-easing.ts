export const materialEasingValues = {
  standard: [0.2, 0.0, 0, 1.0],
  'standard-decelerate': [0, 0, 0, 1],
  'standard-accelerate': [0.3, 0.0, 0.8, 0.15],
  emphasized: [0.2, 0.0, 0, 1.0],
  'emphasized-decelerate': [0.05, 0.7, 0.1, 1.0],
  'emphasized-accelerate': [0.3, 0.0, 0.8, 0.15],
} as const;

type Registry = typeof materialEasingValues;

type Key = keyof Registry;

type AsString<T extends Key> =
  `cubic-bezier(${Registry[T][0]}, ${Registry[T][1]}, ${Registry[T][2]}, ${Registry[T][3]})`;

type StringRegistry = {
  [key in Key]: AsString<key>;
};

export const materialEasing = {
  ...materialEasingValues,
  keys(): Key[] {
    return Object.keys(materialEasingValues) as Key[];
  },
  has(key: string): key is Key {
    return Object.keys(materialEasingValues).includes(key);
  },
  asString<T extends Key>(key: T): AsString<T> {
    const [p0, p1, p2, p3] = materialEasingValues[key];

    return `cubic-bezier(${p0}, ${p1}, ${p2}, ${p3})` as AsString<T>;
  },
  toStringRegistry(): StringRegistry {
    const result = {} as Record<Key, AsString<Key>>;

    this.keys().forEach((key) => {
      result[key] = this.asString(key);
    });

    return result as StringRegistry;
  },
} as const;
