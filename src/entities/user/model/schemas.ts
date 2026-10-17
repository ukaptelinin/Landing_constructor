import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().trim().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export const registerSchema = z
  .object({
    login: z.string().trim().email("Некорректный email").max(254),
    password: z.string().min(8, "Минимум 8 символов").max(72),
    newPassword: z.string().min(1, "Повторите пароль"),
  })
  .refine((d) => d.password === d.newPassword, {
    path: ["newPassword"],
    message: "Пароли не совпадают",
  });
