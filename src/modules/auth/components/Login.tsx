import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";

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
};

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(2, 'The username must contain a minimum of 2 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'The password must contain a minimum of 8 characters')
});

const Login = (props: PropsInterface) => {
    const { changeForm } = props;
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const onSubmit = async (data: FormValues) => {
        setLoading(true)
        try {
            const result = await AuthService.login(data.username, data.password)

            if (result.success) {
                navigate('/', { replace: true })
            } else if (result?.error?.message) {
                setError('password', {
                    type: "manual",
                    message: result.error.message,
                })
                // Also show general error if needed, or map specific errors
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('root', {
                type: 'manual',
                message: 'An unexpected error occurred'
            });
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Title>Login</Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Username"
                    {...register('username')}
                    error={errors.username?.message}
                />
                <Input
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                />

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button type="submit" viewType="primary">
                        SignIn
                    </Button>
                    <Button type="button" viewType="secondary" onClick={() => changeForm(AuthFormsEnum.REGISTRATION)}>
                        Registration
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login;