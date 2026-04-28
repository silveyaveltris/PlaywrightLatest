export interface User {
  username: string;
  password: string;
}

export interface InvalidCredentials {
  description: string;
  username: string;
  password: string;
  expectedError: string;
}

export const users = {
  standard:  { username: 'standard_user',           password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user',         password: 'secret_sauce' },
  problem:   { username: 'problem_user',            password: 'secret_sauce' },
  glitch:    { username: 'performance_glitch_user', password: 'secret_sauce' },
  errorUser: { username: 'error_user',              password: 'secret_sauce' },
  visual:    { username: 'visual_user',             password: 'secret_sauce' },
} as const satisfies Record<string, User>;

export const invalidCredentials: readonly InvalidCredentials[] = [
  {
    description: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: 'Username and password do not match any user in this service',
  },
  {
    description: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Username is required',
  },
  {
    description: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Password is required',
  },
];

export const lockedOutErrorMessage = 'Sorry, this user has been locked out';