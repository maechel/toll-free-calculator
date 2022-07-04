import React from 'react';
import { Link } from 'react-router-dom';

const HomeLink = () => {
    return (
        <div className="my-3">
            <Link to="/">
                 &larr; Hem
            </Link>
        </div>
    );
};

export default HomeLink;