import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

interface UserPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

// Extend the Express Request interface to include the user object
declare global {
  namespace Express {
    interface Request {
      userPayload?: UserPayload;
    }
  }
}
export const setCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("heelloo form sercurrent user", req.url,)
  const token = req.cookies?.token;
  const SECRET = process.env.JWT_SECRET || "ysdfsfasfsdafkl;ads3243022342034";
  if (!token) {
    next();
  }

  try {
    const decoded = jwt.verify(token, SECRET as string) as UserPayload;
    console.log(decoded, "user");
    req.userPayload = decoded;
    console.log(req.userPayload, "userpayload");
  } catch (error) {
    console.error("Error decoding JWT:", error);
    res.status(401).json({ message: "Invalid token" });
  }
  console.log("heloo form setcurrent user")
  next();
};
