import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../shared/ServiceCard';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const mockData = [
          {
            _id: '1',
            date: '2025-07-30T10:30:00Z',
            employee: 'Nguyễn Văn A',
            paymentMethod: 'Tiền mặt',
            status: 'Success',
            service: {
              name: 'Gội đầu dưỡng sinh',
              image: 'https://via.placeholder.com/150',
              price: 150000,
              description: 'Thư giãn và làm sạch sâu da đầu.'
            }
          },
          {
            _id: '2',
            date: '2025-07-28T14:00:00Z',
            employee: 'Trần Thị B',
            paymentMethod: 'Chuyển khoản',
            status: 'Pending',
            service: {
              name: 'Massage body',
              image: 'https://via.placeholder.com/150',
              price: 350000,
              description: 'Thư giãn toàn thân với kỹ thuật massage chuẩn spa.'
            }
          }
        ];
        setBookings(mockData);
      } catch (err) {
        console.error('Lỗi khi lấy lịch sử đặt lịch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) return <p className="text-center my-8">Đang tải lịch sử đặt lịch...</p>;

  return (
    <div className="w-[90%] mx-auto mt-10">
      <h2 className="text-left font-bold text-3xl mb-6 text-[#BA7894]">Lịch sử đặt lịch</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">Không có lịch sử đặt lịch.</p>
      ) : (
        <div className="grid gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 transition hover:shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-6">
                <div>
                  <ServiceCard service={booking.service} />
                </div>

                <div className="flex flex-col justify-center text-gray-700 space-y-2">
                  <p><span className="font-semibold">Dịch vụ:</span> {booking.service?.name}</p>
                  <p><span className="font-semibold">Giá:</span> {booking.service?.price.toLocaleString()}₫</p>
                  <p>
                    <span className="font-semibold">Ngày:</span>{" "}
                    {new Date(booking.date).toLocaleString('vi-VN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                  <p><span className="font-semibold">Nhân viên:</span> {booking.employee || 'Chưa chọn'}</p>
                  <p><span className="font-semibold">Phương thức thanh toán:</span> {booking.paymentMethod}</p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Trạng thái:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'Success'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
