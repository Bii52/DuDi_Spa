import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Tách riêng ServiceCard ra ngoài
const ServiceCard = ({ name, image }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <button className="mt-2 text-sm text-pink-600 hover:underline">
        Xem chi tiết
      </button>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Banner */}
        <div className="bg-gradient-to-r from-pink-300 to-red-300 text-white py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Oanh Thư Spa</h1>
          <p className="text-lg">Chăm sóc sắc đẹp & thư giãn cùng chuyên gia</p>
        </div>

        {/* Dịch vụ nổi bật */}
        <div className="py-10 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Dịch vụ nổi bật</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard name="Massage thư giãn" image="/assets/massage.jpg" />
            <ServiceCard name="Chăm sóc da mặt" image="/assets/facial.jpg" />
            <ServiceCard name="Triệt lông công nghệ cao" image="/assets/laser.jpg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
