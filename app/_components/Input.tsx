import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  showValidation: boolean;
  error?: ReactNode;
}

function Input(
  { id, showValidation = false, error, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex-1">
      <input
        id={id}
        ref={ref}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        {...props}
      />
      {showValidation && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
