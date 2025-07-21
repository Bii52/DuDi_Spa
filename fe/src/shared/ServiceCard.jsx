import React from 'react'


const ServiceCard = ({service}) => {

    const{id, name, rating, reviewsCount, address, image } = service
  return (
    <div id="service__card">
        <div id="service__img">
            <img src={image} alt="" className=' w-full object-cover rounded-tr-2xl rounded-tl-2xl'/>
        </div>
        <div id="service__body">
            <div id="card__top" className='flex w-[90%] mx-auto my-2 lg:justify-between justify-center gap-4'>
                <span className='flex'><i className="ri-star-line"> </i>{rating}</span>
                <span className='flex gap-1'>{reviewsCount} <span className='hidden lg:flex'>Reviews</span></span>                             

            </div>
            <div id="service__info" className='w-[90%] mx-auto mb-3'>
                <h4 className='text-left text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{name}</h4>
                <div className="text-left clamp-2 min-h-[48.8px]">
                    <i className="ri-map-pin-line "></i> {address}
                </div>
            </div>          
        </div>
        <button className='w-[90%] !bg-[#BA7894] rounded-xl text-white'>
                Book Now
        </button>

    
    </div>
  )
}

export default ServiceCard