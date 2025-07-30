    import React, {useState} from 'react'
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import { useParams } from 'react-router-dom';
    import ServiceCard from '../shared/ServiceCard';
    import services from '../assets/data/service.js'
    import SuccessPopup from '../pop-up/SuccessPopup';
    import FailedPopup from '../pop-up/FailedPopup';

    const Booking = () => {
        
        const {id} = useParams()
        const service = services.find((s) => s.id===id) 

        const [selected, setSelected] = useState("card");
        const [selectedDate, setSelectedDate] = useState(new Date())

        const [showSuccess, setShowSuccess] = useState(false)
        const [showFail, setShowFail] = useState(false)

        const handleConfirm = async () => {
            try {
                const isSuccess = Math.random() < 0.5
                if (isSuccess) setShowSuccess(true)
                else setShowFail(true)
            } catch (err) {
                setShowFail(true);
            }
        } 

    return (
        <>
    
        <div className="grid md:grid-cols-[60%_40%] lg:grid-cols-[70%_30%] w-[90%] mx-auto">
            <div className="flex flex-col">
                <h2 className='text-left'>Confirm Booking</h2>
                <div className="flex flex-col">
                    <h4 className='text-left pl-4 font-bold'>Your details</h4>
                    <div className="flex-col flex md:flex-row gap-4 lg:gap-12 mt-8 w-[90%] mx-auto">
                        <div id="firstname" className='flex-1'>
                            <p className='text-left'>First name</p>
                            <input type="text" placeholder='' className='w-full h-12 lg:h-16 rounded-md pl-2 bg-[#F2F2F2] outline-none' />
                        </div>

                        <div id="lastname" className='flex-1'>
                            <p className='text-left'>Last name</p>
                            <input type="text" placeholder='' className='w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2 outline-none' />
                        </div>
                    </div>

                    <div className="flex-col flex md:flex-row gap-4 lg:gap-12 my-4 w-[90%] mx-auto">
                        <div id="firstname" className='flex-1'>
                            <p className='text-left'>Phone number</p>
                            <input type="phone" placeholder='' className='w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2 outline-none' />
                        </div>

                        <div id="lastname" className='flex-1'>
                            <p className='text-left'>Email</p>
                            <input type="email" placeholder='' className='w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2 outline-none' />
                        </div>
                    </div>

                </div>

                <div id="paymentinfo" className='flex flex-col py-6'>                
                    <h4 className='text-left font-bold pl-4 pb-6'>Payment Information</h4>
                    <div id="radio__group" className='flex flex-col gap-6'>
                    <div className="space-y-4">
                        <label
                            className={`flex gap-4 border pl-4 rounded-md py-3 cursor-pointer transition-colors w-[90%] mx-auto ${
                            selected === "card" ? "bg-[#ECBFD336] text-[#BA7894] border-[#ECBFD3]" : "border-[#0000001A]"
                            }`}
                        >
                            <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={selected === "card"}
                            onChange={() => setSelected("card")}
                            className="w-6 h-6 accent-[#BA7894] my-2"
                            />
                            <div className="text-left">
                            <h4 className='font-[500] !text-2xl'>Credit or Debit Card</h4>
                            <p>Use a credit or debit card to pay with automatic payments</p>
                            </div>
                        </label>

                        <label
                            className={`flex gap-4 border pl-4 rounded-md py-3 cursor-pointer transition-colors w-[90%] mx-auto ${
                            selected === "money" ? "bg-[#ECBFD336] text-[#BA7894] border-[#ECBFD3]" : "border-[#0000001A]"
                            }`}
                        >
                            <input
                            type="radio"
                            name="payment"
                            value="money"
                            checked={selected === "money"}
                            onChange={() => setSelected("money")}
                            className="w-6 h-6 accent-[#BA7894] my-2"
                            />
                            <div className="text-left">
                            <h4 className='font-[500] !text-2xl'>Pay on arrival</h4>
                            <p>Pay on arrival my spa</p>
                            </div>
                        </label>
                    </div>             
                </div>
                <div className="flex-col flex md:flex-row gap-4 lg:gap-12 my-8 w-[90%] mx-auto">
                        <div id="firstname" className='flex-1'>
                            <p className='text-left'>Name on card</p>
                            <input type="text" placeholder='' className='w-full h-12 lg:h-16 rounded-md pl-2 bg-[#F2F2F2] outline-none' />
                        </div>

                        <div id="lastname" className='flex-1'>
                            <p className='text-left'>Credit Card Number</p>
                            <input type="text" placeholder='' className='w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2 outline-none' />
                        </div>
                    </div>

                    <div className="flex-col flex md:flex-row gap-4 lg:gap-12  my-4 w-[90%] mx-auto">
                        <div id="firstname" className='flex-1'>
                            <p className='text-left'>Expiration Date</p>
                            <div className="flex gap-6">
                                {/* Month dropdown */}
                                <select
                                    className="w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2 focus:outline-none"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Month</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {String(i + 1).padStart(2, '0')}
                                    </option>
                                    ))}
                                </select>

                                {/* Year dropdown */}
                                <select
                                    className="w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Year</option>
                                    {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return (
                                        <option key={year} value={year}>{year}</option>
                                    );
                                    })}
                                </select>
                            </div>
                            
                        </div>

                        <div id="lastname" className='flex-1'>
                            <p className='text-left'>CVV/CVC</p>
                            <input type="email" placeholder='' className='w-full h-12 lg:h-16 rounded-md bg-[#F2F2F2] pl-2 outline-none' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:mt-24">
                <div>
                    <ServiceCard service={service}/>
                </div>
                <div className="shadow-[0px_4px_16px_0px_#00000040] border border-[#0000003D] overflow-hidden rounded-[24px] mt-4">
                    <h4 className='text-left font-bold pl-3 my-4'>Your booking details</h4>
                    <div className="grid xl:grid-cols-2  ">
                        <div className="flex flex-col text-left ml-6 mb-3 xl:border-r mr-2">
                            <span className=''>Check-in <i className="ri-calendar-line"></i></span>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date)=> setSelectedDate(date)}
                                showTimeSelect
                                dateFormat="EEE, dd MMM, yyyy" 
                                className='font-bold'                      
                                

                            >
                            </DatePicker>
                            <input type="text" placeholder='From 02:00 PM' className='outline-none' />                      
                        
                        </div>
                        
                        <div className='text-left pl-6 xl:pl-3'>
                            <h4 className='!text-base'>The employee you want</h4>
                            <input type="text" placeholder='Your choose' className='outline-none' />
                        </div>
                    </div>               
                </div>

                <div className="flex flex-col shadow-[0px_4px_16px_0px_#00000040] border border-[#0000003D] overflow-hidden rounded-[24px] mt-4 px-4">
                    <h4 className='text-left font-bold'>Pricing Summary</h4>
                    <div className="text-left">
                        <div className="flex justify-between">
                            <h4 className='font-bold'>{service.name}</h4>
                            <h4>{service.price}</h4>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <select
                            className="h-8 lg:h-12 xl:h-16 rounded-md focus:outline-none text-sm lg:text-base"
                            defaultValue="">                    
                            <option value="" disabled>Tax and service fees </option>
                        </select>
                        <span>8%</span>                    
                    </div>

                <hr className='border h-[0.5px] border-[#E0E0E0] my-4'/>
                <div className="flex justify-between mb-4">
                    <h4>Total</h4>
                    <h4>VND</h4>
                </div>
                </div>
                
            </div>
        </div>
        <div className='my-8'>
            <button onClick={handleConfirm} className='!px-12 !py-4 rounded-md !bg-[#BA7894] text-white'><h4>Confirm & Proceed</h4></button>
        </div>
        {showSuccess && <SuccessPopup onClose={()=>setShowSuccess(false)}/> }
        {showFail && <FailedPopup onClose={()=>setShowFail(false)}/> }
        
        </>

    )
    }

    export default Booking