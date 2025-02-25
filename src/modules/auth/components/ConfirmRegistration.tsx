import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@/components/buttons/Button'
import Input from '@/components/form/Input'
import AuthService from '@/modules/auth/services/auth'
import Title from './_parts/Title'
import { useLoading } from '@/providers/LoadingContext';
import { useNavigate } from "react-router-dom";

type FormValues = {
    code: string;
    email: string;
};

const validationSchema = yup.object({
    code: yup
        .string()
        .required('Code is required')
        .min(6, 'The username must contain 6 numbers')
        .max(6, 'The username must contain 6 numbers'),
    email: yup
        .string()
        .required('Email is required')
        .email('Must be email')
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
        
        const result = await AuthService.confirmRegistration(data.email, data.code)

        if(result.success){
            navigate('/', { replace: true })
            setLoading(false)
        }
        if(result?.error?.message){
            setError('code', {
                type: "manual",
                message: result?.error?.message,
            })
        }
    };
    
    return (
        <>
            <Title>Registration</Title>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Email" {...register('email')} error={errors.email?.message} />
                <Input label="Code" {...register('code')} error={errors.code?.message} />

                <div className="mt-4 grid grid-column-2 grid-flow-col gap-6">
                    <Button type="submit" viewType="primary">
                        Confirm Email
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ConfirmRegistration;