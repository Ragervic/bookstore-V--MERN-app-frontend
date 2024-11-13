import React, { useEffect, useState } from 'react'
import BookCard from '../book/BookCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


const categories = ["Choose genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
    // const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose genre");
    // useEffect(() => {
    //     fetch("books.json").then(res => res.json()).then((data) => setBooks(data))
    // }, [])


    // Fetching book data from the backend
    const { data: books=[] } = useFetchAllBooksQuery();

    // filter method accepts 3 arguments/predicates
    const filteredBooks = selectedCategory === "Choose genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

    return (
        <>
            <div className='py-10'>
                <h2 className='text-3xl font-semibold mb-6'>TopSellers</h2>
                {/* category filtering  */}
                <div className='mb-8 flex items-center'>
                    <select name="category"
                        id="category"
                        className='border bg-[#EAEAEA] border-gray-300 rounded-md focus:outline-none px-4 py-2'
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category} >{category}</option>
                            ))
                        }
                    </select>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1180: {
                            slidesPerView: 3,
                            spaceBetween:50,
                        }
                    }}
                    modules={[Pagination,Navigation]}
                    className="mySwiper"
                >
                    {
                        filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                            <SwiperSlide><BookCard key={index} book={book} />
                            </SwiperSlide>

                        ))
                    }
                    
                </Swiper>

            </div>
        </>
    )
}

export default TopSellers