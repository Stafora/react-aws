import { ReactNode } from "react";
import Header from '@/components/common/Header'
import React from "react";

interface PropsInterface{
    children: ReactNode;
}

const Layout = ({children}: PropsInterface) => {
    return(
        <div className="h-screen flex flex-col">
            <Header />
            
            <div className="ml-10 mr-10 flex-1 overflow-y-auto p-4">
                {children}
            </div>
        </div>
    )
}

export default Layout;