import { useEffect, useState } from 'react';
import carImage from '../../assets/hero.jpeg'; // Replace with your actual image

export default function AchievementsSection() {
  const [counts, setCounts] = useState({
    experience: 0,
    mechanics: 0,
    repaired: 0,
    branches: 0,
  });

  // Animate counters
  useEffect(() => {
    const targets = {
      experience: 25,
      mechanics: 600,
      repaired: 9900,
      branches: 80,
    };

    const interval = setInterval(() => {
      setCounts(prev => {
        const updated = { ...prev };
        let allDone = true;

        for (const key in targets) {
          if (prev[key] < targets[key]) {
            updated[key] += Math.ceil(targets[key] / 50);
            if (updated[key] > targets[key]) updated[key] = targets[key];
            allDone = false;
          }
        }

        if (allDone) clearInterval(interval);
        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-black text-white">
      {/* Left Image */}
      <div>
        <img
          src={carImage}
          alt="Car side"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="p-10 flex flex-col justify-center space-y-6 bg-[#111]">

        <h4 className="relative text-white mb-16 uppercase tracking-wider pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-6 before:bg-blue-400">
        Achievements
      </h4>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight uppercase">
          Driving in Style,<br /> Expertly Maintained
        </h1>
        <p className="text-gray-300">
          Vivamus non augue non nunc lacinia accumsan eget nec diam. Quisque
          tincidunt, justo sit amet vehicula congue, mi libero euismod purus,
          et ornare felis nibh ut orci.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <StatBox label="Years of Experience" value={counts.experience} suffix="+" />
          <StatBox label="Expert Mechanics" value={counts.mechanics} suffix="+" />
          <StatBox label="Repaired Vehicles" value={counts.repaired} suffix="+" />
          <StatBox label="Company Branches" value={counts.branches} suffix="+" />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, suffix = '' }) {
  return (
    <div className="border-l-2 border-blue-600 pl-4">
      <div className="text-3xl md:text-4xl font-bold">{value.toLocaleString()}{suffix}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}
