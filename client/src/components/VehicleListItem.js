import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const VehicleListItem = ({ vehicle }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onClickHandler = () => {
        navigate(`${pathname}/${vehicle.regNr}`);
    };

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" onClick={onClickHandler}>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{vehicle.regNr}</div>
                <small className="me-3">Type: {vehicle.type}</small>
                <small>Model: {vehicle.model}</small>
            </div>
        </ListGroup.Item>
    );
};

VehicleListItem.propTypes = {
    vehicle: PropTypes.shape({
        regNr: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        owner: PropTypes.string,
    }).isRequired,
};

export default VehicleListItem;