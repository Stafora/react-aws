import React, { forwardRef } from "react";

type InputProps = {
    label: string;
    error?: string | undefined;
    type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, type = 'text', ...rest }, ref) => {
        return (
            <div className="w-full mb-2">
                <label className="text-lg block font-medium mb-2 w-full">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={`p-2 border-2 mb-1 w-full outline-none ${
                        error ? "border-rose-700" : "border-white"
                    }`}
                    type={type}
                    {...rest}
                />
                {error && <div className="text-rose-700 w-full text-xs">{error}</div>}
            </div>
        );
    }
)

export default Input;
