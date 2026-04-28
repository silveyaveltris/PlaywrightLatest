export type Environment = 'qa' | 'staging' | 'prod';

const fromEnvOr = (key: string, fallback: string): string =>
  process.env[key]?.trim() || fallback;

export interface EnvConfig {
  urls: {base: string; };
  // Future per-env values live here: apiURL, featureFlags, defaultUser, etc.
}

const configs: Record<Environment, EnvConfig> = {
  qa: { urls: { base: fromEnvOr('QA_URL', 'https://www.saucedemo.com/') }, },
  staging: { urls: { base: fromEnvOr('STAGING_URL', 'https://staging.saucedemo.com/') }, },
  prod: { urls: { base: fromEnvOr('PROD_URL', 'https://www.saucedemo.com/') }, },
};

export const getEnvConfig = (env: Environment): EnvConfig => configs[env];

export const ALL_ENVIRONMENTS = Object.keys(configs) as readonly Environment[];

export function resolveTargetEnvs(): Environment[] {
  const raw = process.env.TEST_ENV?.trim();
  if (!raw) return ['qa'];
  const parsed = raw.split(',').map(s => s.trim()) as Environment[];
  parsed.forEach(e => {
    if (!ALL_ENVIRONMENTS.includes(e)) {
      throw new Error(
        `Invalid TEST_ENV value: '${e}'. Valid values: ${ALL_ENVIRONMENTS.join(', ')}`,
      );
    }
  });
  return parsed;
}