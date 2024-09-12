import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const News = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <main>
                <h2>News Page</h2>
                {/* Add your Account page content here */}
            </main>
        </div>
    );
}

export default News;