import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useActions } from '../../hooks/use-actions';

const vehicleTypeOptions = [
    'Motorbike',
    'Tractor',
    'Emergency',
    'Diplomat',
    'Foreign',
    'Military',
];

const VehicleForm = () => {
    const [regNr, setRegNr] = useState('');
    const [type, setType] = useState('');
    const [model, setModel] = useState('');
    const { createVehicle } = useActions();

    const saveBtnDisabled = (!regNr || !type || !model);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        (async () => {
            await createVehicle({ regNr, type, model });
            resetForm();
        })();
    };

    const resetForm = () => {
        setRegNr('');
        setType('');
        setModel('');
    };

    const renderVehicleTypeOptions = () => {
        return vehicleTypeOptions.map((type) => (
            <option key={type} value={type}>{type}</option>
        ));
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <FloatingLabel className="mb-3" controlId="regNr" label="Registreringsnummer">
                <Form.Control
                    value={regNr}
                    type="text"
                    onChange={(e) => setRegNr(e.target.value)}
                />
            </FloatingLabel>

            <Form.Select className="mb-3" aria-label="Vehicle Type" onChange={(e) => setType(e.target.value)}>
                <option> -- Välj -- </option>
                <option>Car</option>
                {renderVehicleTypeOptions()}
            </Form.Select>

            <FloatingLabel className="mb-3" controlId="model" label="Modell">
                <Form.Control
                    value={model}
                    type="text"
                    onChange={(e) => setModel(e.target.value)}
                />
            </FloatingLabel>

            <Button variant="primary" type="submit" disabled={saveBtnDisabled}>Spara</Button>
        </Form>
    );
};

export default VehicleForm;