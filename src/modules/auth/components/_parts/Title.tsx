import React, { ReactNode } from "react";

type TitleProps = {
    children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
    return (
        <h2 className="text-center text-2xl font-medium mb-2">
            {children}
        </h2>
    )
}

export default Title;