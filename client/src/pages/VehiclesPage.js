import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HomeLink, VehiclesList } from '../components';
import { BsPlus } from 'react-icons/bs';
import { useActions } from '../hooks/use-actions';

const VehiclesPage = () => {
    const navigate = useNavigate();
    const { randomize } = useActions();

    const onRandomClickHandler = async () => {
        await randomize();
    };

    const onAddClickHandler = async () => {
        navigate('/vehicles-create');
    };

    return (
        <div className="mt-3">
            <HomeLink />
            <div className="d-flex justify-content-between align-items-start">
                <p className="fs-3 d-inline-block">Fordon</p>
                <Button onClick={onRandomClickHandler}>
                    Randomisera <BsPlus color="white" />
                </Button>
                <Button onClick={onAddClickHandler}>
                    Lägg till <BsPlus color="white" />
                </Button>
            </div>
            <VehiclesList />
        </div>
    );
};

export default VehiclesPage;