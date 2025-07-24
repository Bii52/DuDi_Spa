import React, {useState, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import services from '../assets/data/service.js'
import ServiceCard from '../shared/ServiceCard'
import Slider from "react-slick";


const Recommended = () => {

    const sliderRef2 = useRef();
    const location = useLocation();
    const isHome = location.pathname=== '/' || location.pathname=== '/home'



    // setting service
  const settings_1 = {
    
    infinite: true,
    autoplay: false,
    speed: 1000,
    swipeToSlide: true,
    slidesToShow: 4,  

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,        
         
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1,
        },
      },
    ]
    
  };
  

  return (
    <div id="recommended__container" className= 'w-[90%] mx-auto my-12 '>
    <div id="heading__container">
        {isHome && (
            <p className='!text-[#BA7894] font-semibold leading-[154%] tracking-[0.1em] text-center uppercase flex items-center justify-center'>
            Our Services
            </p> 
        )}
     
      <h2 className={`text-[#422A3C] ${isHome ? 'text-center':'text-left'}`}>Recommended</h2>
      <p className={isHome ? 'text-center':'text-left'}>Lorem ipsum dolor sit amet consectetur. Eu quis enim tempor et proin neque.</p>
    </div>
    <div className="w-full mx-auto justify-between flex items-center" >
      <button onClick={() => sliderRef2.current.slickPrev()}>
          <i className="ri-arrow-left-s-line text-2xl"></i>
      </button> 
      <div className="flex-1 w-[70%] sm:w-[80%] my-12">
        <Slider ref={sliderRef2} {...settings_1}>
          {services.map((service, index) => (
            <div key={index} className='px-2'> 
             <ServiceCard service={service} />
            </div>
          ))}
        </Slider>           

      </div>
      <button onClick={() => sliderRef2.current.slickNext()} className="items-center justify-center">
          <i className="ri-arrow-right-s-line text-2xl"></i>
      </button>               
    </div>  

  </div> 
  )
}

export default Recommended