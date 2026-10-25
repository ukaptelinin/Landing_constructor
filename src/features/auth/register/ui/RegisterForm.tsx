"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { registerAction } from "../api/register-action";

export const RegisterForm = () => {
  const { closeAll } = useAppActions();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);

    const login = String(formData.get("login") ?? "");
    const password = String(formData.get("password") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");

    startTransition(async () => {
      try {
        const result = await registerAction({
          login,
          password,
          newPassword,
        });

        if (!result.success) {
          setError(result.error);
          setFieldErrors(result.fieldErrors ?? {});
          return;
        }

        closeAll();
        router.push("/main");
        router.refresh();
      } catch (submissionError) {
        console.error("Register submission error:", submissionError);
        setError("Произошла непредвиденная ошибка");
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

        <PasswordField name="password" placeholder="Введите пароль" />

        <FieldError>{fieldErrors.password}</FieldError>
      </TextField>

      <TextField isRequired isInvalid={Boolean(fieldErrors.newPassword)}>
        <Label>Повторите пароль</Label>

        <PasswordField name="newPassword" placeholder="Повторите пароль" />

        <FieldError>{fieldErrors.newPassword}</FieldError>
      </TextField>

      {error && <div className="text-danger text-center text-sm">{error}</div>}

      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full"
        isDisabled={isPending}
      >
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </Form>
  );
};
