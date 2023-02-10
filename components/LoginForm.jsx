import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { object, mixed, number } from "yup";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import PinInput from "react-pin-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1661508869516-861e3cd6ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  },
];
const LoginForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  function OnCaptchVerify() {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              OnSignInSubmit();
            },
            "expired-callback": () => {},
          },
          auth
        );
      } else {
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function OnSignInSubmit() {
    setLoading(true);
    await OnCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNu = "+" + ph;
    signInWithPhoneNumber(auth, phoneNu, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("otp sent");
        setLoading(false);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        setLoading(false);
        console.log(error);
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="max-w-[1240px] m-auto mt-12 h-screen">
      <div className="flex justify-center w-auto mt-6 pt-8 !bg-contain">
        <SimpleImageSlider
          width={380}
          height={230}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.0}
        />
      </div>
      <h1 className="text-2xl font-bold text-center p-8">Login</h1>

      <div className="w-fit mx-auto p-4 rounded-full">
        <label className="text-center">Enter Phone Number</label>
        <PhoneInput country={"in"} value={ph} onChange={setPh} />
      </div>

      <div id="recaptcha-container"></div>

      <div className="flex justify-center">
        <Button
          className={`w-24 mt-1 hover:text-black transition-colors ${"outline-0 ring-1 ring-black"}`}
          onClick={() => {
            OnSignInSubmit();
          }}
        >
          {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
          <span>Send OTP</span>
        </Button>
      </div>

      <div className="flex justify-center">
        <PinInput
          length={6}
          initialValue=""
          onChange={(value, index) => {
            setOtp(value);
          }}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "red" }}
          inputFocusStyle={{ borderColor: "blue" }}
          onComplete={(value, index) => {}}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      </div>

      <div className="flex justify-center mb-5">
        <Button
          className={` w-29 mt-1 hover:text-black transition-colors ${"outline-0 ring-1 ring-black"}`}
          onClick={onOTPVerify}
        >
          Verify Otp
        </Button>
      </div>

      <div className="flex justify-center mt-2">
        <h4>Dont have an account yet?</h4>
        <h4 className="text-blue-600">Create one</h4>
      </div>
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  classname: yup.string().required("required"),
  // address2: yup.string().required("required"),
});

export default LoginForm;
