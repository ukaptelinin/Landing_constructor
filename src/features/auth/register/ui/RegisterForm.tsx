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

// Пример серверного экшена (нужно создать отдельно)
//import { loginAction } from '@/app/actions/auth';

export const RegisterForm = () => {
  // const [state, formAction, isPending] = useActionState(loginAction, null);
  const { setIsLogin } = useAppActions();
  return (
    <Form
      onClick={() => setIsLogin()}
      className="flex flex-col gap-4"
      validationBehavior="aria"
    >
      <TextField name="login" isRequired>
        <Label>Логин или Email</Label>
        <Input placeholder="Введите логин" autoFocus />
        <FieldError />
      </TextField>

      <TextField name="password" type="password" isRequired>
        <Label>Пароль</Label>
        <Input placeholder="Введите пароль" />
        <FieldError />
      </TextField>

      <TextField name="newPassword" type="password" isRequired>
        <Label>Пароль</Label>
        <Input placeholder="Снова введите пароль " />
        <FieldError />
      </TextField>

      {/* Отображение ошибки от сервера 
      {state?.error && (
        <div className="text-danger text-sm text-center">{state.error}</div>
      )}
*/}
      <Button type="submit" variant="primary" className="w-full mt-2">
        Регистрация
      </Button>
    </Form>
  );
};
