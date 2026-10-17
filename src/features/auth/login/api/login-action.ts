"use server";

import {
  AuthResult,
  loginSchema,
  userRepository,
  verifyPassword,
} from "@/entities/user/model";

export async function loginAction(input: {
  login: string;
  password: string;
}): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Ошибка валидации",
    };
  }

  const email = parsed.data.login.toLowerCase();

  try {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return { success: false, error: "Неверный email или пароль" };
    }

    const isValid = await verifyPassword(parsed.data.password, user.password);
    if (!isValid) {
      return { success: false, error: "Неверный email или пароль" };
    }

    return { success: true, user: { id: user.id, email: user.email } };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Не удалось войти" };
  }
}
