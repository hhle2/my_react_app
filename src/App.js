
import './App.css';
import { React, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { image } from '../src/assets'
import { motion } from 'framer-motion'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css/autoplay'
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c407bc35';
const App = () => {
  const new_image = [image.avenger, image.pacific, image.starwar];
  const [movie, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);



  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovie(data.Search);
    console.log(movie.length);
  }

  useEffect(() => {
    searchMovie('spider man');
    
  }, []);

  
  return (
    <div className="app">

      <div className='banner'>
        <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={true}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
        >
            {new_image.map((image, index) => (
                <SwiperSlide key={index}>
                    
                  <motion.img src={image} alt='new_image' className='image'/>
                    
                    
                </SwiperSlide>
            
                
            ))}
            <motion.div whileInView={{ opacity: [1, 0.7], backgroundColor: '#2e2e2e' }} transition={{ duration: 1 }} className='back-overlay'></motion.div>
        </Swiper>

        <div className='title'>

          <h1>MovieLand</h1>
          <motion.h2 whileInView={{ opacity: [0, 1], scale: [0, 1]}} transition={{ duration: 3 }} className='description'>Epic Moments, Endless Memories: Your Life in Reel Time</motion.h2>
        </div>        
        
      </div>
        
      
      <div className='container'>
        <div className='new_search'>
          <div className='search'>
              <input className='input_search' placeholder='Search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}>
              </input>
              <FaSearch className='icon' onClick={() => searchMovie(searchTerm)}/>
          </div>
        </div>
        <div className='new_movie'>
          {movie?.length > 0 ? (movie.map((movie, index) => (
          <div className='movie' key={index}>
            

            <div className='image_box'>
              <img className='movie_image' src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} />
            </div>

            <div className='title_movie'>
              <span>{movie.Type}</span>
              <p>{movie.Year}</p>
              
            </div>
            <div className='name_movie'>
              <h3>{movie.Title}</h3>
            </div>
          </div>
          ))) : (<div className='empty'><h2 style={{height: '50vh'}}>No Movies Found</h2></div>)}
        </div>
      </div>
      
    </div>


  );

  
}

export default App;
