// import { useState } from "react";
// import logo from '../../assets/logo.png';
// function Signin2() {
//   const [phone, setPhone] = useState("");

//   const handleSendOtp = async () => {
//     if (!phone.startsWith("+")) {
//       alert("يرجى إدخال الرقم بصيغة دولية، مثال: +963xxxxxxxxx");
//       return;
//     }

//     try {
//       const response = await fetch("https://auth.otpless.app/auth/v1/initiate/otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           clientId: "07o4ox5mrlaaog7atbcs",        // ← ضع هنا الـ clientId الخاص بك
//           clientSecret: "YOUR_CLIENT_SECRET" // ← ضع هنا الـ clientSecret الخاص بك
//         },
//         body: JSON.stringify({
//           phoneNumber: phone,
//           expiry: 30,             // صلاحية الكود بالدقائق
//           otpLength: 4,           // عدد أرقام الكود
//           channels: ["WHATSAPP"]  // الإرسال عبر واتساب
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("OTP Sent:", data);
//         alert("✅ تم إرسال الكود على واتساب");
//         // يمكنك تخزين data.requestId للتحقق من الكود لاحقًا
//       } else {
//         console.error("OTP Error:", data);
//         alert("❌ فشل في إرسال الكود: " + data.message);
//       }
//     } catch (error) {
//       console.error("Network Error:", error);
//       alert("❌ حدث خطأ في الاتصال");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
//       <img src={logo} alt="logo" className="w-16 mb-6" />
//       <h1 className="text-white text-2xl font-bold mb-2">Hello!</h1>
//       <p className="text-gray-400 mb-6">Please enter your account here</p>

//       <input
//         type="tel"
//         placeholder="+963xxxxxxxxx"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="w-full max-w-sm px-4 py-3 mb-4 rounded-full bg-black border border-gray-600 text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
//       />

//       <button
//         onClick={handleSendOtp}
//         className="w-full max-w-sm bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-full transition"
//       >
//         send
//       </button>
//     </div>
//   );
// }

// export default Signin2;



import React, { useEffect } from 'react';

const Signin2 = () => {
  useEffect(() => {
    // تأكد من أن الكود يعمل فقط إذا تم تحميل window.otpless
    if (window.otpless) {
      window.otpless.init({
        appId: '07o4ox5mrlaaog7atbcs', // 🔁 استبدله بـ App ID الحقيقي
        type: 'whatsapp', // 👈 مهم جداً
        // redirectUrl: 'http://localhost:5173/', // 🟡 اختياري، غيّره حسب مشروعك
        onLogin: (userData) => {
          console.log('✅ User Data:', userData);

          // استخراج البيانات
          const phone = userData.mobile;
          const email = userData.email;
          const name = userData.name;

          alert(`Welcome ${name || phone || email}`);
        },
      });
    } else {
      console.error('❌ OTPless script not loaded.');
    }
  }, []);

  return (
    <div>
      <h2>Login with WhatsApp</h2>
      <div id="otpless-login-button"></div>
    </div>
  );
};

export default Signin2;
