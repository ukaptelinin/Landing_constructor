"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { hashPassword } from "@/entities/user/model/password";
import { registerSchema } from "@/entities/user/model/schemas";
import { prisma } from "@/prisma/db";

type RegisterResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string>;
    };

type RegisterInput = {
  login: string;
  password: string;
  newPassword: string;
};

export async function registerAction(
  input: RegisterInput,
): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);

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

  const email = parsed.data.login.trim().toLowerCase();
  const plainPassword = parsed.data.password;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Пользователь уже существует",
        fieldErrors: {
          login: "Этот email уже используется",
        },
      };
    }

    const passwordHash = await hashPassword(plainPassword);

    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);

    if (isPrismaUniqueConstraintError(error)) {
      return {
        success: false,
        error: "Пользователь уже существует",
        fieldErrors: {
          login: "Этот email уже используется",
        },
      };
    }

    return {
      success: false,
      error: "Не удалось создать пользователя",
    };
  }

  try {
    await signIn("credentials", {
      login: email,
      password: plainPassword,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Automatic sign-in error:", error);

    if (error instanceof AuthError) {
      return {
        success: false,
        error:
          "Аккаунт создан, но автоматически войти не удалось. Войдите вручную.",
      };
    }

    return {
      success: false,
      error:
        "Аккаунт создан, но автоматически войти не удалось. Войдите вручную.",
    };
  }
}

function isPrismaUniqueConstraintError(
  error: unknown,
): error is { code: "P2002" } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}
