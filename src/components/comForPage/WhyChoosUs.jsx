import { useEffect, useState } from 'react';
import carImage from '../../assets/footer.png'; // replace with your image path

export default function WhyChooseUs() {
  const [progress, setProgress] = useState({
    tech: 0,
    turnaround: 0,
    quality: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        tech: 99,
        turnaround: 85,
        quality: 90,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#111] text-white">
      {/* Left content */}
      <div className="p-10 flex flex-col justify-center space-y-6">
      <h4 className="relative text-white mb-16 uppercase tracking-wider pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-6 before:bg-blue-400">
        WHY CHOOS US
      </h4>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight uppercase">
          Attention to <br /> Detail, Tailored <br /> to You
        </h1>
        <p className="text-gray-300">
          Praesent ut nisi vitae tellus aliquam auctor ac nec felis. Praesent nec augue sollicitudin, facilisis tortor eget, laoreet tortor. Phasellus vitae elit lectus. Sed vitae odio sapien.
        </p>

        {/* Progress Bars */}
        <div className="space-y-4">
          <ProgressBar label="Expert Technicians" value={progress.tech} />
          <ProgressBar label="Quick Turnaround" value={progress.turnaround} />
          <ProgressBar label="Quality Assurance" value={progress.quality} />
        </div>
      </div>

      {/* Right image */}
      <div className="relative">
        <img src={carImage} alt="Car" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-700 h-1.5 rounded">
        <div
          className="bg-blue-500 h-1.5 rounded transition-all duration-1000"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
