export type AuthResult =
  | { success: true; user: { id: string; email: string } }
  | { success: false; error: string; fieldErrors?: Record<string, string> };
