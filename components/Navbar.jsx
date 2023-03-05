import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import mypic from "../assets/in.png";
import Image from "next/image";
import { useRouter } from "next/router";
import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const router = useRouter();
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      style={
        router.pathname === "/"
          ? { backgroundColor: `${color}` }
          : { backgroundColor: "#ffc92b" }
      }
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-blue-900">
        <Link href="/">
          {/* <h1 style={{ color: "#1f2b8eff" }} className="font-bold text-4xl">
            Hope
          </h1> */}
          {router.pathname === "/" ? (
            <></>
          ) : (
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold textstyle2">4</h2>
              <h2 className=" text-3xl font-bold textstyle1 text-blue-900">
                hope
              </h2>
              <Image
                src={mypic}
                alt="Picture of the author"
                width={30}
                height={25}
              />
            </div>
          )}
        </Link>

        <ul style={{ color: "#1f2b8eff" }} className="hidden sm:flex">
          <li className="p-4 textstyle1">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4 textstyle1">
            <Link href="/form">Gallery</Link>
          </li>
          <li className="p-4 textstyle1">
            <Link href="/about">About Us</Link>
          </li>
          <li className="p-4 textstyle1">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: "#1f2b8eff" }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: "#1f2b8eff" }} />
          )}
        </div>
        {/* Mobile Menu */}

        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300"
          }
        >
          <ul className="font-calibri">
            <li
              onClick={handleNav}
              className="p-4 text-2xl  hover:text-gray-500"
            >
              <Link href="/">CENTERS OF EXCELLENCE</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-2xl text-blue-900 hover:text-gray-500"
            >
              <Link href="/#gallery">NATIONAL WORKFORCE</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-2xl text-blue-900 hover:text-gray-500"
            >
              <Link href="/about">INTERNATIONAL</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-3xl text-blue-900 hover:text-gray-500"
            >
              <div className="bg-pink-500 rounded-md text-white ">
                <CallTwoToneIcon
                  className="pr-4 "
                  sx={{ fontSize: "50px" }}
                ></CallTwoToneIcon>
                <Link href="tel:8095015040">8095015040</Link>
              </div>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-3xl text-blue-900 hover:text-gray-500"
            >
              <div className="bg-pink-500 rounded-md text-white ">
                <MailOutlineTwoToneIcon
                  className="pr-4 "
                  sx={{ fontSize: "50px" }}
                ></MailOutlineTwoToneIcon>
                <Link href="tel:8095015040">admin@4hope.in</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
