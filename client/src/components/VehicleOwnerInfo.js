import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/use-actions';

const VehicleOwnerInfo = ({ vehicle }) => {
    const { user, loading, error } = useSelector((state) => state.users);
    const { fetchVehicleOwnerById } = useActions();

    useEffect(() => {
        if (vehicle?.owner) {
            (async () => {
                await fetchVehicleOwnerById(vehicle.owner);
            })();
        }
    }, [vehicle?.owner, fetchVehicleOwnerById]);

    const renderVehicleOwner = () => {
        if (!user) {
            return null;
        }

        const { city, street } = user?.address || {};
        return (
            <div className="mb-3">
                <small>Pnr: {user?.pnr ? user.pnr : ''}</small><br />
                <small>Namn: {user?.firstName} {user.lastName}</small><br />
                <small>Kontakt: {user.phone}</small><br /><br />
                <small>Faktureringsaddress:</small><br />
                <small>{street}, {city}</small><br />
            </div>
        );
    };

    if (loading) {
        return <div>Laddar...</div>
    }

    if (error) {
        return <div>Något gick fel vid hämtning av ägare</div>
    }

    return (
        <div className="align-content-md-start">
            <h5 className="text-decoration-underline">Fordonsägare:</h5>
            {renderVehicleOwner()}
        </div>
    );
};

export default VehicleOwnerInfo;