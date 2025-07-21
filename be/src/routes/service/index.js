import { Router } from "express";
import sendMail  from "../../utils/send_mail.js"
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, note } = req.body;
    if (!name || !email || !phone || !service) {
      return res.status(400).json({
        "error": 400,
        "error_text": "Thiếu tên, email, số điện thoại hoặc dịch vụ",
        "data_name": "",
        "data": []
      });
    }
    const phoneRegex = /^\d{10,11}$/;
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        "error": 400,
        "error_text": "Số điện thoại không hợp lệ",
        "data_name": "",
        "data": []
      });
    }
    if (!mailRegex.test(email)) {
      return res.status(400).json({
        "error": 400,
        "error_text": "Email không hợp lệ",
        "data_name": "",
        "data": []
      });
    }

    await sendMail({
      to: process.env.SUPPORT_SERVICE_MAIL,
      subject: `Yêu cầu dịch vụ từ ${name}`,
      text: `Bạn đã gửi yêu cầu dịch vụ: ${service}\nName: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\nGhi chú: ${note || 'Không có ghi chú'}`
    });

    return res.status(200).json({
      "error": 0,
      "error_text": "",
      "data_name": "Yêu cầu dịch vụ đã được gửi thành công",
      "data": []
    });
  } catch (error) {
    console.error("Lỗi gửi email:", error.message);
    return res.status(500).json({
      "error": 500,
      "error_text": "Không thể gửi email!",
      "data_name": "",
      "data": []
    });
  }
});

export default router;