import React from 'react';
import { BackButton, PassageForm } from '../components';

const PassageCreateForm = () => {
    return (
        <div>
            <BackButton />
            <h3 className="mt-4">Skapa Passering</h3>
            <PassageForm />
        </div>
    );
};

export default PassageCreateForm;