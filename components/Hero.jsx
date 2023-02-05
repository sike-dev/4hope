import Link from "next/link";
import React from "react";
import Image from "next/image";
import mypic from "../assets/in.png";
const Hero = ({ heading, message }) => {
  return (
    <div className="h-screen mb-12 bg-fixed bg-center bg-cover custom-img pt-28">
      {/* overlay */}
      <div className=" flex flex-column justify-center py-5">
        <Image
          src={mypic}
          alt="Picture of the author"
          width={100}
          height={100}
        />
      </div>
      <div className=" flex-column items-center py-2">
        <div className="flex justify-center">
          <h2 className="pl-6 text-5xl font-bold text-pink-600">4</h2>
          <h2 className=" text-5xl font-bold text-blue-900">hope</h2>
          <Image
            src={mypic}
            alt="Picture of the author"
            width={50}
            height={50}
          />
        </div>

        <p className="px-5 py-5 text-xl">
          Build the next level of career with world-class resume
        </p>
      </div>
      <div className="mt-5 px-28 py-8 flex-column items-center">
        <button className="px-8 py-2 border w-45">
          <Link href={"/about"}>Login</Link>
        </button>
      </div>
      <div className="mt-5 px-24 flex-column items-center">
        <button className="px-8 py-2 border w-36">
          <Link href={"/about"}>Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
