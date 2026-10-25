"use client";

import { FC, useState } from "react";
import { InputGroup, Button } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PasswordFieldProps {
  name: string;
  placeholder: string;
}
export const PasswordField: FC<PasswordFieldProps> = ({
  name,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputGroup>
      <InputGroup.Input
        name={name}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
      />
      <InputGroup.Suffix>
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}
          onPress={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? (
            <EyeSlashIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      </InputGroup.Suffix>
    </InputGroup>
  );
};
