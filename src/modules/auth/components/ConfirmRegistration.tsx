import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";

import Button from '@/components/buttons/Button'
import Input from '@/components/form/Input'
import AuthService from '@/modules/auth/services/auth'
import Title from './_parts/Title'
import { useLoading } from '@/providers/LoadingContext';

type FormValues = {
    code: string;
    email: string;
};

const validationSchema = yup.object({
    code: yup
        .string()
        .required('Code is required')
        .length(6, 'The code must contain exactly 6 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Must be a valid email')
});

const ConfirmRegistration = () => {
    const navigate = useNavigate();
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
        try {
            const result = await AuthService.confirmRegistration(data.email, data.code)

            if (result.success) {
                navigate('/', { replace: true })
            } else if (result?.error?.message) {
                setError('code', {
                    type: "manual",
                    message: result.error.message,
                })
            }
        } catch (error) {
            console.error("Confirmation error:", error);
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
            <Title>Confirm Registration</Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    {...register('email')}
                    error={errors.email?.message}
                />
                <Input
                    label="Confirmation Code"
                    {...register('code')}
                    error={errors.code?.message}
                />

                <div className="mt-6">
                    <Button type="submit" viewType="primary" className="w-full">
                        Confirm Email
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ConfirmRegistration;