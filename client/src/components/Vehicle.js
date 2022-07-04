import find from 'lodash/find';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HomeLink, Passages, VehicleInfo, VehicleOwnerInfo } from './';

const Vehicle = () => {
    const { id } = useParams();
    const { vehicles } = useSelector((state) => state.vehicles);

    const vehicle = Array.isArray(vehicles)
        ? find(vehicles, vehicle => vehicle?.regNr === id)
        : null;

    return (
        <div className="mt-3 mb-5">
            <HomeLink />
            <div className="d-flex justify-content-between align-items-start">
                <VehicleInfo vehicle={vehicle} />
                <VehicleOwnerInfo vehicle={vehicle} />
            </div>

            <hr />
            <Passages />
        </div>
    );
};

export default Vehicle;