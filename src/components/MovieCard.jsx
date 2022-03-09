import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

const MovieCard = ({ id, title, imageUrl, author, rating, onClick, buttonText = 'Add to wishlist', loadingBtn }) => {
    return (
        <Card style={ { width: '300px', margin: '10px 10px' } }>
            <Card.Img variant="top" src={ imageUrl } className='card-img' />
            <Card.Body>
                <Card.Title>{ title }</Card.Title>
                <Card.Text>
                    by { author }
                </Card.Text>
                <Card.Text>
                    Rating: { rating }
                </Card.Text>
                <Button style={ { width: '200px' } } variant="primary" onClick={ onClick }>
                    { loadingBtn ?
                        <Spinner size='sm' animation="border" variant="light" />
                        : buttonText
                    }
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;