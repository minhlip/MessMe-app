'use client';

import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface MessageInputProps {
  id: string;
  required: boolean;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  error: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  type,
  required,
  error,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
        text-black
        font-light
        py-2
        px-4
        bg-neutral-100
        w-full
        rounded-full
        focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
