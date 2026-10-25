// src/widgets/login-dialog/ui/LoginForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Button,
} from "@heroui/react";

import { useAppActions } from "@/app/model/store/app-store";
import { PasswordField } from "@/shared/ui/password-field/ui/PasswordField";

import { loginAction } from "../api/login-action";

export const LoginForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const { closeAll } = useAppActions();

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);

    // Получаем значения до запуска асинхронной операции.
    const login = String(formData.get("login") ?? "").trim();

    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      try {
        const result = await loginAction({
          login,
          password,
        });

        if (!result.success) {
          setError(result.error);
          setFieldErrors(result.fieldErrors ?? {});
          return;
        }

        /*
         * Серверный signIn установил cookie.
         * update() запрашивает актуальную сессию для SessionProvider,
         * используемого Navbar.
         */
        await update();

        closeAll();

        router.push("/main");
        router.refresh();
      } catch (submissionError) {
        console.error("Login form submission error:", submissionError);

        setError("Произошла непредвиденная ошибка. Попробуйте ещё раз.");
      }
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      validationBehavior="aria"
    >
      <TextField name="login" isRequired isInvalid={Boolean(fieldErrors.login)}>
        <Label>Email</Label>

        <Input
          name="login"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          autoFocus
        />

        <FieldError>{fieldErrors.login}</FieldError>
      </TextField>

      <TextField isRequired isInvalid={Boolean(fieldErrors.password)}>
        <Label>Пароль</Label>

        <PasswordField
          name="password"
          /*autoComplete="current-password"*/
          placeholder="Введите пароль"
        />

        <FieldError>{fieldErrors.password}</FieldError>
      </TextField>

      {error && (
        <div role="alert" className="text-danger text-center text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full"
        isDisabled={isPending}
      >
        {isPending ? "Вход..." : "Войти"}
      </Button>
    </Form>
  );
};
