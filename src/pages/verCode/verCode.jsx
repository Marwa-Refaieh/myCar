import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Vercode() {
 

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(180); // 3 دقائق

  // مؤقت العد التنازلي
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp]; 
    newOtp[index] = value;
    setOtp(newOtp);

    // الانتقال للخانة التالية
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setTimeLeft(180);
    // إرسال طلب إعادة الإرسال
    console.log('Resending code...');
  };

  const handleVerify = async () => {
    const code = otp.join('');
    try {
      const response = await axios.post('https://your-api.com/verify', { code });
      console.log('Verification success:', response.data);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const { t } = useTranslation('varcode'); 
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <img src="/logo.png" alt="Car Logo" className="w-24 h-24 mx-auto" />

        <h2 className="text-xl font-semibold">{t('ver')}</h2>
        <p className="text-gray-400">
          {t('enter')} <span className="font-bold">0098934***</span>
        </p>

        {/* مربعات الكود */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl border border-yellow-400 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ))}
        </div>

        {/* المؤقت */}
        <p className="text-gray-400 text-sm">
          {t('expires')}: <span className="text-yellow-400">{formatTime(timeLeft)}</span>
        </p>

        {/* إعادة الإرسال */}
        <p className="text-sm text-gray-400">
          {t('didnt')}?{' '}
          <button onClick={handleResend} className="text-yellow-400 underline">
            {t('resent')}
          </button>
        </p>

        {/* زر التحقق */}
        <button
          onClick={handleVerify}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full"
        >
          {t('verify')}
        </button>
      </div>
    </div>
  );
}
