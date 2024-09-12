import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Account = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <main>
                <h2>Account Page</h2>
                {/* Add your Account page content here */}
            </main>
        </div>
    );
}

export default Account;
