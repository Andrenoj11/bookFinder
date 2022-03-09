import { doc, collection, onSnapshot, deleteDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import db from '../firebase';

const Wishlist = () => {
    const [booksWishlist, setBooskWishlist] = useState([]);

    useEffect(() => onSnapshot(collection(db, 'wishlists'), (snapshot) => {
        setBooskWishlist(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    })
        , []);

    const handleDeleteBook = async book => {
        try {
            await deleteDoc(doc(db, 'wishlists', book.id));
        } catch (error) {
            console.log('[deleteWishlists error]', error);
        }
    };

    return (
        <div>
            <h1>My Wishlist</h1>
            <div className='wishlist-container'>
                {
                    booksWishlist.length === 0 &&
                    <p>You don't have a wishlist yet</p>
                }
                {
                    booksWishlist.map((book, idx) => (
                        <MovieCard
                            key={ idx }
                            title={ book?.title }
                            imageUrl={ book?.imageUrl }
                            author={ book?.author ? book?.author : 'No Name' }
                            rating={ book?.rating ? book.rating : 0 }
                            buttonText='Delete from wishlist'
                            onClick={ () => handleDeleteBook(book) }
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Wishlist;