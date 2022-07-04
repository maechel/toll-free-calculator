import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container className="mt-3">
            <h3>Beräkning av vägstationsavgift</h3>

            <section>
                <h4>Bakgrund</h4>
                <p>Staden har beslutat vid sin senaste stämma att dom långa bilköerna har blivit ett problem, speciellt
                    under rusningstid. Därför har ett beslut tagits om att införa biltullar. Inkomster från tullavgifter
                    kommer användas för att finansiera ett stort vägprojekt.
                </p>
            </section>

            <section>
                <h4>Avgifter</h4>
                <ul>
                    <li>Avgifter varierar mellan 9 SEK och 22 SEK, beroende på tid på dygnet.</li>
                    <li>Vid flertal passeringar av avgiftsstation under 60 minuter, så skall endast den högsta taxan användas.</li>
                    <li>Vissa typer av fordon är avgiftsfria.</li>
                    <li>Avgiftsfria dagar och perioder är:</li>
                    <ul>
                        <li>Helgdagar (Lördag och Söndag)</li>
                        <li>Nationella helgdagar</li>
                        <li>Dag före nationell helgdag</li>
                        <li>Juli månad</li>
                    </ul>
                </ul>
            </section>

            <section>
                <h4>Avgiftsfria Fordon</h4>
                <ul>
                    <li>Traktorer</li>
                    <li>Motorcyklar</li>
                    <li>Utryckningsfordon</li>
                    <li>Millitärfordon</li>
                    <li>Fordon där ägare har diplomatisk status</li>
                </ul>
            </section>

            <p className="mt-5">Följ länken nedan för att gå till de fordon som är registrerade:</p>
            <Link to="/vehicles">
                <span>Gå till fordon &rarr;</span>
            </Link>
        </Container>
    );
};

export default HomePage;