import Link from "next/link";
import React from "react";
import Image from "next/image";
import mypic from "../assets/in.png";
const Hero = ({ heading, message }) => {
  return (
    <div className="h-screen bg-center bg-cover  pt-28 overflow-hidden">
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
          <h2 className="pl-6 text-5xl font-bold textstyle2">4</h2>
          <h2 className=" text-5xl font-bold textstyle1 text-blue-900">hope</h2>
          <Image
            src={mypic}
            alt="Picture of the author"
            width={50}
            height={50}
          />
        </div>

        <p className="px-5 py-5 text-xl flex justify-center">
          Build the next level of career with world-class resume
        </p>
      </div>
      <div className="mt-5 px-28 py-8 flex justify-center">
        <button className=" textstyle px-8 py-2 border-x-4 border-y-4 border-blue-900 hover:border-blue-600 rounded-lg fill-blue-900 buttonstyle">
          <Link href={"/about"}>Login</Link>
        </button>
      </div>
      <div className="mt-5 px-24 flex justify-center fill-blue-900">
        <button className="textstyle first-line:px-8 py-2 border-x-4 border-y-4 border-blue-900 hover:border-blue-600 w-36 rounded-lg fill-blue-900 buttonstyle">
          <Link href={"/about"}>Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
