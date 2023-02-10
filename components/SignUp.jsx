import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { object, mixed, number } from "yup";
import { Button } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import PinInput from "react-pin-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import * as yup from "yup";

const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1661508869516-861e3cd6ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  { url: "3.jpg" },
  { url: "3.jpg" },
];
const SignUpForm = () => {
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

  function OnSignInSubmit() {
    OnCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+919945354300";
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
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
        />
      </div>
      <h1 className="text-2xl font-bold text-center p-8">Login</h1>
      <div id="recaptcha-container"></div>
      {/* <div>
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={object({
            phoneNumber: mixed(),
          })}
          initialValues={{
            phoneNumber: "",
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form className="grid grid-cols-1 mt-5" onSubmit={handleSubmit}>
              <Field
                className="border shadow-lg ml-10 mr-10 mb-5"
                name="phoneNumber"
                type="number"
                component={TextField}
                label="Enter Mobile number/EmailID"
                value={values.phoneNumber}
              />
              <div className="flex justify-center mb-5">
                <Button
                  className={`w-24 mt-1 hover:text-black transition-colors ${"outline-0 ring-1 ring-black"}`}
                >
                  Send Otp
                </Button>
              </div>

              <div className="flex justify-center">
                <PinInput
                  length={6}
                  initialValue=""
                  onChange={(value, index) => {}}
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
                >
                  Verify Otp
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div> */}
      <div className="flex justify-center">
        <Button
          className={`w-24 mt-1 hover:text-black transition-colors ${"outline-0 ring-1 ring-black"}`}
          onClick={() => {
            OnSignInSubmit();
          }}
        >
          Send Otp
        </Button>
      </div>

      <div className="flex justify-center">
        <PinInput
          length={6}
          initialValue=""
          onChange={(value, index) => {}}
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

export default SignUpForm;
