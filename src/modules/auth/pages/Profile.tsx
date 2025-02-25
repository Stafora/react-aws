import React from "react";
import Layout from '@/components/layout';
import useUserStore from '@/modules/auth/store/user-store';

const Profile = () => {
    const user = useUserStore((state) => state.user);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>

            <table className="w-full border-b border-gray-300 text-left text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <td className="py-2 px-4 font-medium">Name:</td>
                        <td className="py-2 px-4">{user?.name}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="py-2 px-4 font-medium">Email:</td>
                        <td className="py-2 px-4">{user?.email}</td>
                    </tr>
                </tbody>
            </table>
        </Layout>
    )
}
  
export default Profile;