import "server-only";
import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = (password: string) => hash(password, SALT_ROUNDS);

export const verifyPassword = (password: string, hash: string) =>
  compare(password, hash);
