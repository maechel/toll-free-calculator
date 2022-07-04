import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button className="mt-2" onClick={() => navigate(-1)}>
            <BsArrowLeft color="white" /> Tillbaka
        </Button>
    );
};

export default BackButton;