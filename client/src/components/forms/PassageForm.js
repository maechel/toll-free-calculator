import moment from 'moment';
import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useActions } from '../../hooks/use-actions';

const isNumericStr = (str) => {
    return /^\d+$/.test(str);
}

const PassageForm = () => {
    const now = moment();
    const [date, setDate] = useState(now.format('YYYY-MM-DD'));
    const [hour, setHour] = useState(now.hour());
    const [minute, setMinute] = useState(now.minute());

    const { id } = useParams();
    const { createPassage } = useActions();

    const saveBtnDisabled = !(date && isNumericStr(hour) && isNumericStr(minute));

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'minute') {
            let checked = value > 59 ? 59 : value < 0 ? 0 : value;
            setMinute(checked);
        } else if (name === 'hour') {
            let checked = value > 23 ? 23 : value < 0 ? 0 : value;
            setHour(checked);
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const momentDate = moment(date);
        momentDate.hour(+hour).minute(+minute).second(0);

        const passage = {
            regNr: id,
            date: momentDate.format('YYYY-MM-DD HH:mm'),
        };

        (async () => {
            await createPassage(passage);
            reset();
        })();
    };

    const reset = () => {
        setHour(0);
        setMinute(0);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <FloatingLabel className="mb-3" controlId="date" label="Date">
                <Form.Control
                    value={date}
                    type="date"
                    placeholder="Datum"
                    onChange={(e) => setDate(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" controlId="hour" label="Timme">
                <Form.Control
                    value={hour}
                    name="hour"
                    type="number"
                    min="0"
                    max="max"
                    onChange={onChangeHandler}
                />
            </FloatingLabel>

            <FloatingLabel className="mb-3" controlId="minute" label="Minute">
                <Form.Control
                    value={minute}
                    name="minute"
                    type="number"
                    min="0"
                    max="59"
                    onChange={onChangeHandler}
                />
            </FloatingLabel>

            <Button variant="primary" type="submit" disabled={saveBtnDisabled}>Spara</Button>
        </Form>
    )
};

export default PassageForm;