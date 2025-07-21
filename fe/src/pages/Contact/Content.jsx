import bannerImg from '../../assets/images/contact_banner_img.jpg';
import imageShadow from '../../assets/images/image-shadow.png';
import { IoHomeOutline } from 'react-icons/io5';
const Content = () => {
  return (
    <div className="w-screen bg-white flex flex-col sm:flex-row items-center justify-center py-20">
      <div className="shadow-xl shadow-cyan w-60 mb-20 sm:mb-0 h-80 sm:w-80 sm:h-120 sm:mr-10 relative flex">
        <img src={imageShadow} alt="shadow" className="hidden sm:block absolute bottom-6 left-6 w-full h-full z-1" />
        <div className="w-full h-full shadow-xl z-10">
          <img src={bannerImg} alt="banner" className="z-10 h-full w-full cover"/>
        </div>
      </div>

      <div className="w-80 sm:w-120 h-fit ml-10 mr-5 sm:mr-0 flex flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-center text-center">
          <header className="font-[Manrope] font-sans text-xs mb-2">
            GET IN TOUCH WITH US
          </header>
          <span className="font-[Playfair, Display] font-serif max-w-xs text-2xl font-bold mb-4 text-left">
            We are here to help you always...
          </span>
          <span className="font-[Manrope] font-sans description text-left texx">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, buying to many desktop publishing packages.
          </span>
        </div>
        <div className="infor flex flex-col items-start justify-center mt-10 w-full gap-6">
          <div className="flex items-center gap-4 justify-center">
            <div className="border-2 rounded border border-[#422A3C] p-3">
              <IoHomeOutline className="text-xl text-[#422A3C]" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-[Playfair Display] font-serif text-xl font-semibold">Visit Us</span>
              <span className="font-[Manrope] font-sans font-normal" >Mariendalsvej 50D 2 2000 Frederiksberg.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="border-2 rounded border border-[#422A3C] p-3">
              <IoHomeOutline className="text-xl text-[#422A3C]" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-[Playfair Display] font-serif text-xl font-semibold">Visit Us</span>
              <span className="font-[Manrope] font-sans font-normal" >Mariendalsvej 50D 2 2000 Frederiksberg.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="border-2 rounded border border-[#422A3C] p-3">
              <IoHomeOutline className="text-xl text-[#422A3C]" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-[Playfair Display] font-serif text-xl font-semibold">Visit Us</span>
              <span className="font-[Manrope] font-sans font-normal" >Mariendalsvej 50D 2 2000 Frederiksberg.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content;