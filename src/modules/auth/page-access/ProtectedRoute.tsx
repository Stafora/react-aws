import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Auth from '@/modules/auth/services/auth';
import { useLoading } from '@/providers/LoadingContext';
import useUserStore from '@/modules/auth/store/user-store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { setLoading } = useLoading();
    const location = useLocation();
    const user = useUserStore((state) => state.user);

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(() => !!user);
    const [isChecking, setIsChecking] = useState<boolean>(!user);

    useEffect(() => {
        const checkAccess = async () => {
            if (user) {
                setIsAuthorized(true);
                setIsChecking(false);
                return;
            }

            setLoading(true);
            try {
                const isUser = await Auth.checkUser();
                setIsAuthorized(isUser);
            } catch (error) {
                console.error('Error checking user:', error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
                setIsChecking(false);
            }
        };

        checkAccess();
    }, [location.pathname, setLoading, user]);

    if (isChecking) {
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