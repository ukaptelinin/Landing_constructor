"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { loginSchema } from "@/entities/user/model/schemas";

type LoginResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string>;
    };

type LoginInput = {
  login: string;
  password: string;
};

export async function loginAction(input: LoginInput): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string" && fieldErrors[field] === undefined) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      success: false,
      error: "Проверьте введённые данные",
      fieldErrors,
    };
  }

  const login = parsed.data.login.trim().toLowerCase();
  const password = parsed.data.password;

  try {
    await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Authentication error:", {
        type: error.type,
        cause: error.cause,
      });

      return {
        success: false,
        error: "Неверный email или пароль",
      };
    }

    console.error("Unexpected login error:", error);

    return {
      success: false,
      error: "Не удалось войти. Попробуйте ещё раз.",
    };
  }
}
