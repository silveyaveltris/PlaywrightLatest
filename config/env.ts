export type Environment = 'qa' | 'staging' | 'prod';

export interface EnvConfig {
  baseURL: string;
  // Future per-env values live here: apiURL, featureFlags, defaultUser, etc.
}

const configs: Record<Environment, EnvConfig> = {
  qa:      { baseURL: process.env.QA_URL      ?? 'https://www.saucedemo.com/' },
  staging: { baseURL: process.env.STAGING_URL ?? 'https://staging.saucedemo.com/' },
  prod:    { baseURL: process.env.PROD_URL    ?? 'https://www.saucedemo.com/' },
};

export function getEnvConfig(env: Environment): EnvConfig {
  const cfg = configs[env];
  if (!cfg) throw new Error(`Unknown environment: ${env}`);
  return cfg;
}

export const ALL_ENVIRONMENTS: readonly Environment[] = ['qa', 'staging', 'prod'];

export function resolveTargetEnvs(): Environment[] {
  const raw = process.env.TEST_ENV;
  if (!raw) return ['qa'];
  const parsed = raw.split(',').map(s => s.trim()) as Environment[];
  parsed.forEach(e => {
    if (!ALL_ENVIRONMENTS.includes(e)) throw new Error(`Invalid TEST_ENV value: ${e}`);
  });
  return parsed;
}
