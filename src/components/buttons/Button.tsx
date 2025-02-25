import React, { ReactNode } from "react";

interface PropsInterface {
    children: ReactNode,
    className?: string,
    type: 'button' | 'submit'
    viewType: 'primary' | 'secondary' | 'danger'
    eventClick?: () => void
}

const Button = (props: PropsInterface) => {
    const { children, className, type = 'submit', eventClick } = props;

    const getClasses = () => {
        switch(props.viewType){
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

    return (
        <button onClick={eventClick} type={type} className={`${className} p-3 ${getClasses()}`} >
            {children}
        </button>
    )
}

export default Button;