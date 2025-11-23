export interface UserInterface {
  id: string | undefined,
  email: string | undefined,
  name: string | undefined
}

export interface ResultInterface {
  success: boolean,
  error?: AuthError
}

export class AuthError extends Error {
  public code: number | string;
  public context?: Record<string, unknown>;

  constructor(message: string, code: number | string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.context = context;

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export default interface AuthInterface {
  login: (username: string, password: string) => Promise<ResultInterface>
  registration: (username: string, password: string, email: string) => Promise<ResultInterface>
  confirmRegistration: (email: string, confirmationCode: string) => Promise<ResultInterface>
  logout: () => Promise<ResultInterface>

  getUser: () => Promise<UserInterface | null>
  checkUser: () => Promise<boolean>
}