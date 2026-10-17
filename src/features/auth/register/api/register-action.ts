"use server";

import {
  AuthResult,
  hashPassword,
  registerSchema,
  userRepository,
} from "@/entities/user/model";

export async function registerAction(input: {
  login: string;
  password: string;
  newPassword: string;
}): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, error: "Проверьте данные", fieldErrors };
  }

  const email = parsed.data.login.toLowerCase();

  try {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      return {
        success: false,
        error: "Пользователь уже существует",
        fieldErrors: { login: "Этот email уже используется" },
      };
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const user = await userRepository.create({ email, password: passwordHash });

    return { success: true, user };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, error: "Не удалось зарегистрироваться" };
  }
}
