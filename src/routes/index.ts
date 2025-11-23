import { lazy } from 'react';

const Auth = lazy(() => import('@/modules/auth/pages/Auth'));
const Profile = lazy(() => import('@/modules/auth/pages/Profile'));
const Files = lazy(() => import('@/modules/files/pages/Files'));

export const routes = [
    {
        path: '/',
        component: Files
    },
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/profile',
        component: Profile
    }
];