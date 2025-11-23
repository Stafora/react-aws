import React from "react";
import Layout from '@/components/layout';
import FileUpload from '../components/FileUpload'
import FileList from '../components/FileList'

const Files = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Files Page</h1>
            <FileUpload />
            <FileList />
        </Layout>
    )
}

export default Files;