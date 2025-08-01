import React, {useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie';
import Slider from "react-slick";
import gallery01 from '../assets/images/gallery-1.png'
import gallery02 from '../assets/images/gallery-2.png'
import gallery03 from '../assets/images/gallery-3.png'
import gallery04 from '../assets/images/gallery-4.png'
import gallery05 from '../assets/images/gallery-5.png'
import subscriptionImg from '../assets/images/subscription-img.png'
import Testimonials from '../shared/Testimonials'
import Recommended from '../shared/Recommended'
import SalePopup from '../pop-up/SalePopup';
import Hero from '../shared/Hero';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate()
  const categoryClickHandle = (categoryName) => {
    console.log('Clicked category:', categoryName)
    navigate(`/services?category=${categoryName}`)
  }
  
  const {data:categories, loading, error} = useFetch(`${BASE_URL}/category`)

  const sliderRef1 = useRef();
  const sliderRef2 = useRef();

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
    Cookies.set('hasSeenPopup', 'true', {expires:1})
  }

  useEffect (()=> {
    const hasSeenPopup = Cookies.get('hasSeenPopup')
    if (!hasSeenPopup) {
      const timer = setTimeout(()=> {
        setShowPopup(true);
      },500)
      return () => clearTimeout(timer);
    }
  },[])

  useEffect (() => {
   
    if (showPopup) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  },[showPopup])
  

  // setting category
  const settings = {
    
    infinite: true,
    autoplay: false,
    speed: 1000,
    swipeToSlide: true,
    slidesToShow: 6,      
    responsive: [
    {      
      breakpoint: 1280,
      settings: {
        slidesToShow: 5,
      },
    },
    {      
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {      
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
    
    ]
  };


  return (
    <>
    {showPopup && <SalePopup onClose={handleClosePopup}/>}   

    <Hero/>    
    
    {/* ==========category start============== */}

    <div className="category__section w-full flex my-6 justify-between">
      <button onClick={() => sliderRef1.current.slickPrev()} className="">
        <i className="ri-arrow-left-s-line text-xl lg:text-3xl xl:text-5xl text-gray-400"></i>
      </button>  
      
      <div className="flex-1 w-[60%] sm:w-[80%] ">
        <Slider ref={sliderRef1} {...settings}>
            {categories.map((category, index) => (
              <div key={categories._id || index } className='flex justify-center items-center'>
                <div className="flex flex-col items-center justify-center" onClick={() => categoryClickHandle(category.name)}>
                  <img src={category.image} alt={`category-${index}`} className="object-cover justify-center min-h-[81.64px]" />
                  <h3 className='font-extrabold !text-xs sm:!text-xl'>{category.name}</h3>
                </div>
              </div>            
        ))} 
        </Slider>
      </div>

      <button onClick={() => sliderRef1.current.slickNext()} className="">
          <i className="ri-arrow-right-s-line text-xl lg:text-3xl xl:text-5xl text-gray-400"></i>
      </button>      
      </div> 
        {/* ==========category end============== */}

          {/* ==========gallery start============== */}
          <div className="gallery__section bg-[#EBF3F580] my-6 py-6">
            <div className="gallery__heading ">
              <h2 className='pb-0 mb-2 text-[#422A3C]'>We are Experienced in making you <br/> very Beautiful</h2>
              <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus beatae expedita, nam laborum vitae et ducimus fugit!</h5>
            </div>
            <div className="gallery__container my-6 py-4 mx-24 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 object-cover">
                <div className="relative overflow-hidden rounded-none rounded-tl-3xl rounded-bl-3xl">
                  <img src={gallery01} alt="" className='w-full h-full' />
                </div>
                <div className="flex flex-col content-center gap-4">
                  <img src={gallery02} alt="" className='w-full h-1/2 object-cover' />
                  <img src={gallery03} alt="w-full h-1/2 object-cover" />
                </div>

                <div className="block sm:hidden md:hidden lg:flex flex-col lg:flex-col gap-4 content-center overflow-hidden rounded-none rounded-tr-3xl rounded-br-3xl ">                  
                  <img src={gallery04} alt="" className='w-full h-1/2 object-cover'/>
                  <img src={gallery05} alt="" className='w-full h-1/2 object-cover mt-4 sm:mt-0'/>
                </div>  

                <div className="hidden sm:block lg:hidden">
                  <img src={gallery04} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block lg:hidden">
                  <img src={gallery05} alt="" className="w-full h-full object-cover" />
                </div>  
              
              </div>
            </div>
          </div>
          {/* ==========gallery end============== */}

          {/* ==========recommended start============== */}    
          <Recommended/>          
          {/* ==========recommended end============== */}
          {/* testimonials start */}
          <Testimonials/>
          {/* testimonials end */}
          {/* email subscription start */}
          <div id='subscription__section'className="flex !bg-[#EBF3F538] justify-center items-center w-full my-16 ">
            <div id='subscription__container'className="grid w-[80%] 2xl:w-[70%] md:grid-cols-2 lg:p-6 w-full justify-between">
              <div id="subscription__img" className='flex object-cover justify-center items-center'>
                <img src={subscriptionImg} alt="" className='m sm:w-[90%] md:h-[90%] '/>
              </div>
              <div id="subscription__content" className='text-left lg:p-6 m-6 space-y-4 2xl:content-center'>
                <h1 className='!text-[#141414] lg:!text-[3.2rem] !text-2xl'>Subscribe to newsletter</h1>
                <p className='!text-[#555555] w-[90%] '>Sign up for our newsletter to stay up-to-date on the latest promotions, discounts, and new features releases.</p>

                  <div id="input__subcribe" className='flex flex-col sm:flex-row w-[90%] md:w-full lg:w-[90%] items-center border border-[#ECBFD3] rounded-3xl max-w-[800px]'>
                    <div className='flex flex-1 my-2'>
                      <i className="ri-mail-line ml-2 flex text-[#004761]"></i>                 
                      <input type="text" placeholder='Enter your mail' className='outline-none text-[#004761] flex-1 pl-1' />
                    </div>
                   
                    <button className='rounded-3xl !bg-[#141414] text-white mr-1 my-1 sm:block hidden'>Subscribe</button>
                  </div>  
                  <button className='mx-auto rounded-3xl !bg-[#141414] justify-center text-white block sm:hidden'>Subscribe</button>
              </div>
              </div>
          </div>
          {/* email subscription end */}      
    </>
  )
}

export default Home