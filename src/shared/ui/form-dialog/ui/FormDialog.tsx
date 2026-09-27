// src/widgets/login-dialog/ui/LoginDialog.tsx
"use client";

import { FC, ReactNode } from "react";
import { Modal } from "@heroui/react";

interface LoginDialogProps {
  isOpen?: boolean;
  titleDialog: string;
  onOpenChange?: (isOpen: boolean) => void;
  children: ReactNode;
}

export const FormDialog: FC<LoginDialogProps> = ({
  titleDialog,
  isOpen,
  onOpenChange,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-md w-full mt-[15vh]">
            <Modal.Header>
              <h2 className="text-xl font-semibold">{titleDialog}</h2>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
