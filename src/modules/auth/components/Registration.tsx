import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthFormsType, AuthFormsEnum } from '@/modules/auth/types'
import Button from '@/components/buttons/Button'
import Input from '@/components/form/Input'
import AuthService from '@/modules/auth/services/auth'
import Title from './_parts/Title'
import { useLoading } from '@/providers/LoadingContext';

interface PropsInterface {
    changeForm: (type: AuthFormsType) => void
}

type FormValues = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
};

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .matches(/^\S+$/, 'Username must not contain spaces')
        .min(2, 'The username must contain a minimum of 2 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'The password must contain a minimum of 8 characters')
        .matches(/[A-Z]/, 'The password must contain at least one capital letter')
        .matches(/[a-z]/, 'The password must contain at least one lowercase letter')
        .matches(/\d/, 'The password must contain at least one digit')
        .matches(/[@$!%*?&#]/, 'The password must contain at least one special character'),
    email: yup
        .string()
        .required('Email is required')
        .email('Must be email'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Login = (props: PropsInterface) => {
    const { changeForm } = props;
    const { setLoading } = useLoading();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        
        const result = await AuthService.registration(data.username, data.password, data.email)

        if(result.success){
            changeForm(AuthFormsEnum.CONFIRM_REGISTRATION)
        }
        if(result?.error?.message){
            setError('email', {
                type: "manual",
                message: result?.error?.message,
            })
        }
        setLoading(false)
    };

    return (
        <>
            <Title>Registration</Title>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Username" {...register('username')} error={errors.username?.message} />
                <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
                <Input label="Confirm password" type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
                <Input label="Email" {...register('email')} error={errors.email?.message} />

                <div className="mt-4 grid grid-column-2 grid-flow-col gap-6">
                    <Button type="submit" viewType="primary">
                        SignUp
                    </Button>
                    <Button type="button" viewType="secondary" eventClick={() => changeForm(AuthFormsEnum.LOGIN)}>
                        Login
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login;