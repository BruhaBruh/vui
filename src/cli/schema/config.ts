import z from 'zod';

export const configSchema = z.object({
  registry: z.url().trim().nonempty(),
  directory: z.string().trim().nonempty(),
  alias: z.string().trim().nonempty(),
});

export type Config = z.Infer<typeof configSchema>;
