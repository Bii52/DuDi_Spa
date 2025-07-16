import ServiceRequest from "../../components/ServiceRequest";
import Banner from "./Banner";
import Content from "./Content";

const Contact = () => {
  return (
    <>
      <Banner />
      <Content />
      <div class="bg-[#FBF2E0] flex flex-col h-fit w-screen items-center justify-center">
        <div className="w-full h-20 flex flex-col items-center justify-center pt-40 pb-10">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-[Manrope] font-sans text-sm mb-2 font-semi-bold text-[#BA7894]">
              SCHEDULE YOUR PRESENCE
            </span>
            <h3 className="font-[Playfair Display] font-serif text-4xl font-bold text-[#422A3C]">
            Get in touch
            </h3>
          </div>
          <span className="font-[Manrope] font-sans text-base text-[#555555] max-w-2xl text-center mt-4">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
          </span>
        </div>

        <ServiceRequest/>
      </div>
    </>
  );
}

export default Contact;