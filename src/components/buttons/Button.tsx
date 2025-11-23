import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    viewType?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className = '', type = 'button', viewType = 'primary', isLoading, disabled, ...props }, ref) => {

        const getVariantClasses = () => {
            switch (viewType) {
                case 'primary':
                    return 'p-1 min-w-[120px] rounded-sm text-white bg-blue-950 border-2 border-blue-950 text-center hover:bg-blue-900 hover:border-blue-900'
                case 'secondary':
                    return 'p-1 min-w-[120px] rounded-sm text-blue-900 border-2 border-solid border-blue-900 text-center hover:text-blue-700 hover:border-blue-700'
                case 'danger':
                    return 'p-1 min-w-[120px] rounded-sm text-white bg-red-400 border-2 border-red-400 text-center hover:bg-red-500 hover:border-red-500'
                default:
                    return 'p-1 min-w-[120px] rounded-sm text-white bg-green-400 border-2 border-green-400 text-center hover:bg-green-500 hover:border-green-500'
            }
        }

        const baseClasses = "inline-flex items-center justify-center px-4 py-2 border-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        return (
            <button
                ref={ref}
                type={type}
                className={`${baseClasses} ${getVariantClasses()} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </>
                ) : children}
            </button>
        )
    }
);

Button.displayName = "Button";

export default Button;