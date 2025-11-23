import React from 'react';
import { useLoading } from '@/providers/LoadingContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const GlobalLoader = () => {
    const { loading } = useLoading();

    if (loading) {
        return <LoadingSpinner />;
    }

    return null;
};

export default GlobalLoader;
