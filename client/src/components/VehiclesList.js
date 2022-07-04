import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/use-actions';
import { VehicleListItem } from './';

const VehiclesList = () => {
    const { vehicles, loading, error } = useSelector((state) => state.vehicles);
    const { randomId } = useSelector((state) => state.random);
    const { fetchVehicles } = useActions();

    useEffect(() => {
        (async () => {
            await fetchVehicles();
        })();
    }, [randomId, fetchVehicles]);

    if (loading) {
        return <div>Laddar ...</div>;
    }

    if (error) {
        return <div>Fel vid hämtning av fordon</div>
    }

    const renderVehicles = () => {
        if(vehicles?.length === 0) {
            return (
                <div>
                    <p className="fst-italic">
                        Inga fordon finns registrerade än.
                    </p>
                    <p>
                        Använd knappen <span className="fw-bold">Randomisera</span> för att randomisera fram data,
                        eller <span className="fw-bold">Lägg till</span> för att själv lägga till ett fordon
                    </p>
                </div>
            );
        }
        return vehicles.map((vehicle) => (
            <VehicleListItem key={vehicle.regNr} vehicle={vehicle} />
        ));
    };

    return (
        <ListGroup className="mt-3">
            {renderVehicles()}
        </ListGroup>
    );
};

export default VehiclesList;