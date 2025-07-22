import React from 'react';
import bannerImg from '../../assets/images/contact_banner_img.jpg';
import imageShadow from '../../assets/images/image-shadow.png';
import { IoHomeOutline } from 'react-icons/io5';

const contactDetails = [
  {
    title: 'Visit Us',
    detail: 'Mariendalsvej 50D 2 2000 Frederiksberg.',
  },
  {
    title: 'Email Us',
    detail: 'support@servicemarket.com',
  },
  {
    title: 'Call Us',
    detail: '(+22) 123 - 4567 - 900',
  },
];

const Content = () => {
  return (
    <div className="w-screen bg-white flex flex-col sm:flex-row items-center justify-center py-20 px-4">
      <div className="relative shadow-xl w-60 h-80 sm:w-80 sm:h-96 sm:mr-10 mb-10 sm:mb-0">
        <img src={imageShadow} alt="shadow" className="hidden sm:block absolute bottom-6 left-6 w-full h-full z-0" />
        <img src={bannerImg} alt="banner" className="relative z-10 w-full h-full object-cover shadow-lg" />
      </div>

      <div className="w-80 sm:w-[30rem] flex flex-col items-start justify-center">
        <header className="font-manrope text-xs mb-2">GET IN TOUCH WITH US</header>
        <h3 className="font-playfair text-2xl font-bold mb-4">We are here to help you always...</h3>
        <p className="font-manrope text-base text-[#555] mb-8">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, buying to many desktop publishing packages.
        </p>

        <div className="flex flex-col gap-6 w-full">
          {contactDetails.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="border-2 rounded p-3 border-[#422A3C]">
                <IoHomeOutline className="text-xl text-[#422A3C]" />
              </div>
              <div>
                <p className="font-playfair text-xl font-semibold">{item.title}</p>
                <p className="font-manrope">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
