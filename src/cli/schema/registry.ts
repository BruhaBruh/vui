import z from 'zod';
import { moduleDependenciesSchema, moduleSchema } from './module';

export const registrySchema = z.object({
  ...moduleDependenciesSchema.pick({ moduleDependencies: true }).shape,
  dependecyVersions: z.record(z.string(), z.string()),
  modules: z.array(moduleSchema),
});

export type Registry = z.Infer<typeof registrySchema>;

export const basicRegistrySchema = z.object({
  ...moduleDependenciesSchema.pick({
    dependencies: true,
    devDependencies: true,
  }).shape,
  ...moduleSchema.pick({ files: true }).shape,
  dependecyVersions: z.record(z.string(), z.string()),
});

export type BasicRegistry = z.Infer<typeof basicRegistrySchema>;
