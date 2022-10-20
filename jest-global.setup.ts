import { loadEnvConfig } from '@next/env';

export default async (): Promise<any> => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
