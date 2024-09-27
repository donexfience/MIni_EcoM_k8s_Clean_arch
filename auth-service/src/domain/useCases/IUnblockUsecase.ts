export interface IUserUnBlockUserCase {
    execute(userId: string, isBlocked: boolean): Promise<void>;
  }
  