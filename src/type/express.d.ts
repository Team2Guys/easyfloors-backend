import { Request } from 'express';

interface userWithoutPassword {
  id: number;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserWithoutPassword;
}
