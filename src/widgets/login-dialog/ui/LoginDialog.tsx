// src/widgets/login-dialog/ui/LoginDialog.tsx
"use client";

import { FC, ReactNode } from "react";
import { Button, Modal } from "@heroui/react";
import { LoginForm } from "./LoginForm";

interface LoginDialogProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const LoginDialog: FC<LoginDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-md w-full mt-[15vh]">
            <Modal.Header>
              <h2 className="text-xl font-semibold">Вход в аккаунт</h2>
            </Modal.Header>
            <Modal.Body>
              <LoginForm />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
