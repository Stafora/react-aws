import Auth from '@/modules/auth/pages/Auth'
import Profile from '@/modules/auth/pages/Profile';
import Files from '@/modules/files/pages/Files'

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