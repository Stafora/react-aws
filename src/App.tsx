import '@/assets/styles/main.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from './routes'
import ProtectedRoute from './modules/auth/page-access/ProtectedRoute'
import { LoadingProvider } from '@/providers/LoadingContext';
import GlobalLoader from '@/components/common/GlobalLoader';

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