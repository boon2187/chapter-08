import { ComponentProps, ReactNode, forwardRef, ForwardedRef } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  id: string;
  showValidation: boolean;
  error?: ReactNode;
}

function TextArea(
  { id, error, showValidation = false, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className="flex-1">
      <textarea
        id={id}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        ref={ref}
        {...props}
      ></textarea>
      {showValidation && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(TextArea);
