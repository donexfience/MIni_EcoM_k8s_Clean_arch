import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

export class TokenHandler {
  private readonly accessTokenSecret: string;
  private readonly accessTokenExpiry: string;

  constructor() {
    this.accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "ysdfsfasfsdafkl;ads3243022342034";
    this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1h";
  }

  public generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });
  }
  public verifyAccessToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, this.accessTokenSecret) as TokenPayload;
      return decoded.userId || null;
    } catch (error) {
      return null;
    }
  }
}
