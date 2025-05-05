import z from 'zod';

export const moduleDependenciesSchema = z.object({
  dependencies: z.array(z.string().trim().nonempty()),
  devDependencies: z.array(z.string().trim().nonempty()),
  moduleDependencies: z.array(z.string().trim().nonempty()),
});

const fileSchema = z.object({
  path: z.string().trim().nonempty(),
  content: z.string(),
  hash: z.string().trim()
});

export const moduleSchema = z
  .object({
    name: z.string().trim().nonempty(),
    files: z.array(fileSchema),
  })
  .extend(moduleDependenciesSchema);

export type Module = z.Infer<typeof moduleSchema>;
