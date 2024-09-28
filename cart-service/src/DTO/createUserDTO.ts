export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
  userId: string;
}
