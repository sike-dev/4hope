import React from "react";
import { Formik, Form, Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-mui";
import { object, mixed, number } from "yup";
import { Button } from "@mui/material";

const FormDetails = () => {
  return (
    <div className="max-w-[1240px] m-auto p-4 h-screen">
      <h1 className="text-2xl font-bold text-center p-8">
        Fill in your basic details
      </h1>
      <div>
        <Formik
          validationSchema={object({
            phoneNumber: mixed(),
          })}
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            terms: false,
          }}
        >
          <Form className="grid grid-cols-1">
            <Field
              className="border-2 shadow-lg ml-10 mr-10 mb-5"
              name="fullname"
              component={TextField}
              label="Full Name"
            />
            <Field
              className="border shadow-lg ml-10 mr-10 mb-5"
              name="email"
              type="email"
              component={TextField}
              label="Email ID"
            />
            <Field
              className="border shadow-lg ml-10 mr-10 mb-5"
              name="phoneNumber"
              type="number"
              component={TextField}
              label="Mobile Number"
            />
            <div className="m-auto flex flex-col ">
              <Field
                name="terms"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "I accept the terms and conditions" }}
              />
              <Button
                className={`mt-12 hover:text-black transition-colors ${"outline-0 ring-1 ring-black"}`}
              >
                Next
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormDetails;
