import { ButtonHTMLAttributes, ReactNode } from "react";

const Button = ({
  children,
  ...props //propsの中にchildrenも入ってしまっているため、事前にchildrenを定義し、残りを展開
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) => {
  return (
    <button
      className="px-4 py-2 rounded-full bg-blue-500 text-white"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
