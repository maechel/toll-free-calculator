import React from 'react';
import { Accordion, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/AccordionItem';
import { useSelector } from 'react-redux';

const PassageItem = ({ date, times, index }) => {
    const { trafficFeesByDate, loading, error } = useSelector((state) => state.billing);

    const renderTimes = (times) => {
        return (
            <ListGroup variant="flush">
                {times.map((time, index) => (
                    <ListGroupItem key={time + index}>{time}</ListGroupItem>
                ))}
            </ListGroup>
        );
    };

    const renderBillingCost = (date) => {
        if (!trafficFeesByDate || !date) {
            return null;
        }
        const { total, reason } = trafficFeesByDate[date] || {};

        return (
            <div>
                <small>Total kostnad: {total} SEK</small>
                {reason && (
                    <small> ** {reason} **</small>
                )}
            </div>
        )
    };

    if (loading) {
        return <div>Laddar...</div>
    }

    if (error) {
        return <div>Fel vid laddning av passering</div>
    }

    return (
        <AccordionItem eventKey={index.toString()} key={date + index}>
            <Accordion.Header>{date}</Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Tider:</Card.Header>
                            <Card.Body>
                                {renderTimes(times)}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Fakturering:</Card.Header>
                            <Card.Body>
                                {renderBillingCost(date)}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Accordion.Body>
        </AccordionItem>
    );
};

export default PassageItem;