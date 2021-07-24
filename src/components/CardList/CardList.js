import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBarResult from '../ProgressBarResult/ProgressBarResult';
import './CardList.css';

const round = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

const CardList = ({ recommendations }) => {
    return (
        <div className="cardDeck">
            {
                recommendations.map((user, id) => {
                    return (
                        <Card className="card" key={id} border="primary">
                            <Card.Header style={{fontWeight: 'bold'}}>PaCE@NTU</Card.Header>
                            <Card.Body>
                                <Card.Title>{`#${id + 1} ` + user[0].title}</Card.Title>
                            </Card.Body>
                            <ProgressBarResult className="hello" score={round(user[1] * 100)}/>
                            <Button onClick={() => window.open(user[0].link)} variant="primary">Check it out!</Button>
                        </Card>
                    );
                })
            }
        </div>
    );
}

export default CardList;