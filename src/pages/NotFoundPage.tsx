import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="mb-4 text-6xl font-bold text-primary-500">404</h1>
            <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
            <p className="mb-8 text-text-muted text-center max-w-md">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="rounded bg-primary-500 px-6 py-3 font-medium text-white transition hover:bg-primary-400"
            >
                Go back home
            </Link>
        </div>
    );
};

export default NotFoundPage;
