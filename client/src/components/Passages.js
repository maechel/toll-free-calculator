import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useActions } from '../hooks/use-actions';
import { PassageItem } from './';

const Passages = () => {
    const { id } = useParams();
    const [dateObj, setDateObj] = useState(null);
    const { passages, loading, error } = useSelector((state) => state.passages);

    const navigate = useNavigate();
    const { fetchPassagesById, fetchBillingByIdAndDates } = useActions();

    useEffect(() => {
        (async () => {
            await fetchPassagesById(id);
        })();
    }, [id, fetchPassagesById]);

    useEffect(() => {
        if (dateObj) {
            const dates = Object.keys(dateObj);
            const startDate = dates.at(0);
            const endDate = dates.at(-1);
            (async () => {
                await fetchBillingByIdAndDates(id, startDate, endDate);
            })();
        }

    }, [id, dateObj, fetchBillingByIdAndDates]);

    useEffect(() => {
        if (Array.isArray(passages)) {
            const localCopy = [...passages];
            const sorted = localCopy.sort((a, b) => new Date(a) - new Date(b));
            const timesByDate = sorted
                .reduce((dateMap, passageEvent) => {
                    const [datePart, timePart] = passageEvent.split(' ');

                    if (!dateMap[datePart]) {
                        dateMap[datePart] = [timePart];
                    } else {
                        dateMap[datePart].push(timePart);
                    }

                    return dateMap;
                }, {});

            setDateObj(timesByDate);

        }
    }, [passages]);

    const onAddClickHandler = (id) => () => {
        navigate(`/passages-create/${id}`);
    };

    if (loading) {
        return <div>Laddar...</div>;
    }

    if (error) {
        return <div>Något gick fel vid hämtning av passerdatum</div>;
    }

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-start my-3">
                <h4>Debiteringstider:</h4>
                <Button onClick={onAddClickHandler(id)}>
                    Lägg till passering <BsPlus color="white" />
                </Button>
            </div>
            {dateObj ? (
                <Accordion defaultActiveKey="0">
                    {Object.entries(dateObj).map(([date, timesArr], index) => (
                        <PassageItem key={date + index} index={index} date={date} times={timesArr} />
                    ))}
                </Accordion>
            ) : null}
        </div>
    );
};

export default Passages;