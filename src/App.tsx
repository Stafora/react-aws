import '@/assets/styles/main.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from './routes'
import ProtectedRoute from './modules/auth/page-access/ProtectedRoute'
import { LoadingProvider, useLoading } from '@/providers/LoadingContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function App() {
    return (
        <LoadingProvider>
            <BrowserRouter>
                <GlobalLoader />
                <Routes>
                    {routes.map(({ path, component: Component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <ProtectedRoute>
                                    <React.Suspense fallback={<div>Loading...</div>}>
                                        <Component />
                                    </React.Suspense>
                                </ProtectedRoute>
                            }
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </LoadingProvider>
    );
}

const GlobalLoader = () => {
    const { loading } = useLoading();

    if (loading) {
        return <LoadingSpinner />;
    }

    return null;
};