import React from 'react';

const VehicleInfo = ({ vehicle }) => {
    return vehicle ? (
        <div className="mb-3">
            <h5 className="text-decoration-underline">Fordon</h5>
            <small>Registreringsnummer: <span className="fw-bold">{vehicle.regNr}</span></small><br />
            <small>Typ: {vehicle.type}</small><br />
            <small>Modell: {vehicle.model}</small><br />
            <small>Registrerad ägare {vehicle.owner}</small>
        </div>
    ) : null;
};

export default VehicleInfo;