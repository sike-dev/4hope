import React from "react";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      {/* overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]"></div>

      <div className="p-5 text-white z-[2] justify-center">
        <h2 className="text-5xl font-bold">About Us</h2>
        <p className="py-5 text-xl float-right">
          We are a team of two aiming to make the world a better place
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
