import React, { useState } from 'react'

import Login from '@/modules/auth/components/Login'
import Registration from '@/modules/auth/components/Registration'
import ConfirmRegistration from '@/modules/auth/components/ConfirmRegistration'
import { AuthFormsType, AuthFormsEnum } from '@/modules/auth/types'

const Auth = () => {
    const [formType, setFormType] = useState<AuthFormsType>(AuthFormsEnum.LOGIN)

    const ComponentFormMap = {
        [AuthFormsEnum.LOGIN]: Login,
        [AuthFormsEnum.REGISTRATION]: Registration,
        [AuthFormsEnum.CONFIRM_REGISTRATION]: ConfirmRegistration,
    };
    
    const FormComponentRender = ComponentFormMap[formType];

    return(
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/3 bg-gray-950 p-10 rounded-md">
                <FormComponentRender changeForm={setFormType} />
            </div>
        </div>
    )
}

export default Auth;

