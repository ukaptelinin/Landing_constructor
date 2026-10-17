// src/widgets/login-dialog/ui/LoginForm.tsx
"use client";

import { useAppActions } from "@/app/model/store/app-store";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Button,
} from "@heroui/react";
import { useState, useTransition } from "react";
import { loginAction } from "../api/login-action";
import { PasswordField } from "@/shared/ui/password-field/ui/PasswordField";

export const LoginForm = () => {
  const { setIsLogin, closeAll } = useAppActions();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const login = String(formData.get("login") ?? "");
    const password = String(formData.get("password") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");

    startTransition(async () => {
      const result = await loginAction({ login, password });

      if (!result.success) {
        setError(result.error);
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        return;
      }

      setIsLogin(true);
      closeAll();
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      validationBehavior="aria"
    >
      <TextField name="login" isRequired>
        <Label>Логин или Email</Label>
        <Input placeholder="Введите email" autoFocus />
        <FieldError />
      </TextField>

      <TextField name="password" type="password" isRequired>
        <Label>Пароль</Label>
        <PasswordField name="password" placeholder="Введите пароль" />
        <FieldError />
      </TextField>

      {error && <div className="text-danger text-sm text-center">{error}</div>}

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isDisabled={isPending}
      >
        {isPending ? "Вход..." : "Войти"}
      </Button>
    </Form>
  );
};
