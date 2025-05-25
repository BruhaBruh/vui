import z from 'zod';
import { moduleDependenciesSchema, moduleSchema } from './module';

export const registrySchema = z
  .object({
    dependecyVersions: z.record(z.string(), z.string()),
    modules: z.array(moduleSchema),
  })
  .extend(moduleDependenciesSchema)
  .omit({ dependencies: true, devDependencies: true });

export type Registry = z.Infer<typeof registrySchema>;

export const basicRegistrySchema = z
  .object({
    dependecyVersions: z.record(z.string(), z.string()),
  })
  .extend(moduleDependenciesSchema)
  .omit({ moduleDependencies: true })
  .extend(moduleSchema.pick({ files: true }));

export type BasicRegistry = z.Infer<typeof basicRegistrySchema>;
