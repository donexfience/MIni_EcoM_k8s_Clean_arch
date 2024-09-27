export interface IUserBlockUserCase {
  execute(userId: string, isBlocked: boolean): Promise<void>;
}
