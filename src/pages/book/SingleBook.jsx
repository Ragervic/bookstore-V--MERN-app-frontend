import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgURL'
import { useFetchAllBooksQuery, useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/carts/cartSlice';
// import book from './BookCard'
// import { getImgUrl } from '../../utils/getImgURL';


const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id)
    
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading book info</div>
    
    const dispatch = useDispatch()
    const opusToCart = (opus) => {
        dispatch(addToCart(opus))
    }
    return (
        <div className='max-w-lg shadow-md p-5'>
            <h1 className='text-2xl font-bold mb-6'>{book.title}</h1>
            <div className=''>
                <div>
                    <img src={`${getImgUrl(book.coverImage)}`} alt={book.title} className='mb-5' />
                </div>

                <div className='mb-5'>
                    <p className='text-gray-700 mb-2'><strong>Author: </strong>{book.author || 'admin'}</p>
                    <p className='text-gray-700 mb-4'>
                        <strong>Published: </strong>{new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className='text-gray-700 mb-4 capitalize'>
                        <strong>Category: </strong>{book?.category}
                    </p>
                    <p className='text-gray-700'>
                        <strong>Description: </strong>{book.description}
                    </p>
                </div>
                <button onClick={()=>opusToCart(book)} className='btn-primary px-6 space-x-1 flex items-center gap-1'>
                    <FiShoppingCart className='' />
                    <span>Add to cart</span>
                </button>
            </div>
        </div>
    )
}

export default SingleBook