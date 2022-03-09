import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { InputGroup, FormControl } from 'react-bootstrap';
import debounce from "lodash/debounce";
import { addDoc, collection } from '@firebase/firestore';
import db from '../firebase';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [bookInput, setBookInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);

    const sendQuery = (query) => {
        // Call API with query parameter here
        axios({
            method: 'get',
            url: `https://www.googleapis.com/books/v1/volumes?q=${ query }`,
        })
            .then(res => {
                if (res) {
                    setBooks(res.data.items.map(book => ({ ...book.volumeInfo, id: book.id })));
                }
            })
            .catch(err => {
                console.log(err, '<<< error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Delay search by 600ms
    const delayedSearch = useCallback(
        debounce((q) => sendQuery(q), 600),
        []
    );

    const handleFindBook = e => {
        setBooks([]);
        setLoading(true);
        setBookInput(e.target.value);
        delayedSearch(e.target.value);
    };

    const handleAddWisthlist = async payload => {
        setLoadingAdd(true);
        const obj = {
            title: payload?.title,
            imageUrl: payload?.imageLinks?.smallThumbnail,
            author: payload?.authors ? payload?.authors[0] : 'No Name',
            rating: payload?.averageRating ? payload.averageRating : 0
        };
        addDoc(collection(db, 'wishlists'), obj)
            .then(res => {
                setLoadingAdd(false);
                setTimeout(() => {
                    alert(`Success add ${ obj.title } to wishlist`);
                }, 500);
            })
            .catch(err => {
                console.log('[addWishlist error]', err);
            });
    };

    return (
        <div className='container-books'>
            <InputGroup className="mt-3 mb-3 input-book">
                <InputGroup.Text id="inputGroup-sizing-default">Find your book</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={ bookInput }
                    onChange={ (e) => handleFindBook(e) }
                />
            </InputGroup>


            <div className='booklists'>
                { loading && <p>Loading...</p> }
                {
                    !bookInput && !loading ?
                        <h3>Type your book title in the input</h3> :
                        books.map((book, idx) => (
                            <MovieCard
                                key={ book?.id }
                                id={ idx }
                                title={ book?.title }
                                imageUrl={ book?.imageLinks?.smallThumbnail }
                                author={ book?.authors ? book?.authors[0] : 'No Name' }
                                rating={ book?.averageRating ? book.averageRating : 0 }
                                onClick={ () => handleAddWisthlist(book) }
                                loadingBtn={ loadingAdd }
                            />
                        ))
                }
            </div>
        </div>
    );
};

export default Home;