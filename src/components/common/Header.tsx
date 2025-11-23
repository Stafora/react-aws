import Button from '@/components/buttons/Button';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Auth from '@/modules/auth/services/auth'
import { useLoading } from '@/providers/LoadingContext';
import useUserStore from '@/modules/auth/store/user-store';

const Header = () => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);

    const handleLogout = async () => {
        setLoading(true)
        const response = await Auth.logout()
        if (response.success) {
            navigate('/auth', { replace: true })
            setLoading(false)
        }
    }

    const menu = [
        {
            name: 'Files',
            href: '/'
        },
        {
            name: 'Profile',
            href: '/profile'
        }
    ]

    return (
        <div className="flex w-full pt-4 pb-4 pl-10 pr-10 justify-between">
            <nav>
                <ul className="flex">
                    {menu.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink className={({ isActive }) => `ml-2 mr-2 p-4 min-w-[140px] rounded-sm text-blue-900 border-b-2 text-center hover:text-blue-700 hover:border-blue-700 ${isActive ? 'border-blue-700' : 'border-blue-900'}`} to={item.href}>
                                    {item.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="flex items-center">
                <div className="mr-6">
                    Вы вошли как: {user?.name}
                </div>
                <Button type="button" viewType="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Header;