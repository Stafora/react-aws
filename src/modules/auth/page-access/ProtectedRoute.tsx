import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Auth from '@/modules/auth/services/auth';
import { useLoading } from '@/providers/LoadingContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { setLoading } = useLoading();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAccess = async () => {
            setLoading(true);
            try {
                if(location.pathname !== '/auth'){
                    const isUser = await Auth.checkUser()
                    setIsAuthorized(isUser);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('Error checking user:', error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [location, setLoading]);

    if (isAuthorized === null) {
        return null;
    }

    if (isAuthorized && location.pathname === '/auth') {
        return <Navigate to="/" replace />;
    }

    if (!isAuthorized && location.pathname !== '/auth') {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;