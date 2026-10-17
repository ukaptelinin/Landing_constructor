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
import { registerAction } from "../api/register-action";
import { PasswordField } from "@/shared/ui/password-field/ui/PasswordField";

export const RegisterForm = () => {
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
      const result = await registerAction({ login, password, newPassword });

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
      <TextField name="login" isRequired isInvalid={!!fieldErrors.login}>
        <Label>Логин или Email</Label>
        <Input placeholder="Введите email" autoFocus />
        <FieldError>{fieldErrors.login}</FieldError>
      </TextField>

      <TextField
        name="password"
        type="password"
        isRequired
        isInvalid={!!fieldErrors.password}
      >
        <Label>Пароль</Label>

        <PasswordField name="password" placeholder="Введите пароль" />
        <FieldError>{fieldErrors.password}</FieldError>
      </TextField>

      <TextField
        name="newPassword"
        type="password"
        isRequired
        isInvalid={!!fieldErrors.newPassword}
      >
        <Label>Повторите пароль</Label>
        <PasswordField name="newPassword" placeholder="Введите пароль" />

        <FieldError>{fieldErrors.newPassword}</FieldError>
      </TextField>

      {error && <div className="text-danger text-sm text-center">{error}</div>}

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isDisabled={isPending}
      >
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </Form>
  );
};
