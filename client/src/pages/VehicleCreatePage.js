import React from 'react';
import { BackButton, VehicleForm } from '../components';

const VehicleCreatePage = () => {
    return (
        <div>
            <BackButton />
            <h3 className="mt-4">Skapa Fordon</h3>
            <VehicleForm />
        </div>
    );
};

export default VehicleCreatePage;