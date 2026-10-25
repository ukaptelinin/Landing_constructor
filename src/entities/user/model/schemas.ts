import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, "Введите email")
    .email("Введите корректный email"),

  password: z.string().min(1, "Введите пароль"),
});

export const registerSchema = z
  .object({
    login: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите корректный email"),

    password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),

    newPassword: z.string().min(1, "Повторите пароль"),
  })
  .refine((data) => data.password === data.newPassword, {
    path: ["newPassword"],
    message: "Пароли не совпадают",
  });
