import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Control from "./formikElements/Control";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Service } from "../Api/Axios/Service";
const Register = () => {
  const initialValues = {
    phone: "",
    password: "",
    c_password: "",
  };
  const onSubmit = (values, submitProps) => {
    setTimeout(() => {
      submitProps.setSubmitting(false);
      submitProps.resetForm();
    }, 5000);
    console.log(values);
    Service.post("/register", values).then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      if (res.status === 200 || res.statusText === "OK") {
        swal("ثبت نام با موفقیت انجام شد", {
          buttons: "متوجه شدم",
          icon: "success",
        });
      }
      if (
        localStorage.getItem("token") === "undefined" ||
        res.status === 202 ||
        res.statusText === "Accepted"
      ) {
        swal("این شماره قبلا ثبت نام شده است", {
          buttons: "متوجه شدم",
          icon: "warning",
        });
      }
    });
  };
  const validationSchema = Yup.object({
    phone: Yup.number().required("لطفا شماره موبایل خود را کنید"),
    password: Yup.string()
      .required("لطفا گذواژه خود را وارد کنید")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "حداقل یک حرف بزرگ و یک حرف کوچک لاتین و اعداد و کارکترهای خاص استفاده کنید"
      ),
    c_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "با رمز عبور مطابقت ندارد")
      .required("لطفا گذواژه خود را تکرار کنید"),
  });
  const handleGetUserData = () => {
    Service.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200 || res.statusText === "OK") {
        swal("اطلاعات کاربر در قسمت Log مرورگر ارسال شد", {
          buttons: "متوجه شدم",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            // console.log(formik);
            return (
              <div className="wrap-login100">
                <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                  <span className="login100-form-title">ثبت نام</span>
                  <Control
                    formik={formik}
                    control="input"
                    type="text"
                    name="phone"
                    icon="fa fa-phone"
                    label="شماره تلفن همراه"
                  />
                  <Control
                    formik={formik}
                    control="input"
                    type="password"
                    name="password"
                    icon="fa fa-lock"
                    label="رمز عبور"
                  />
                  <Control
                    formik={formik}
                    control="input"
                    type="password"
                    name="c_password"
                    icon="fa fa-lock"
                    label="تایید رمز عبور"
                  />
                  <div className="container-login100-form-btn">
                    <button
                      className="login100-form-btn"
                      type="submit"
                      disabled={
                        !(formik.dirty && formik.isValid) || formik.isSubmitting
                      }
                    >
                      {formik.isSubmitting ? (
                        <span className="visually-hidden">Loading...</span>
                      ) : (
                        "ثبت نام"
                      )}
                    </button>
                  </div>
                  <div className="text-center p-t-12 p-b-45">
                    <Link className="txt2" to="/">
                      قبلا ثبت نام کرده ام
                    </Link>
                  </div>
                  {localStorage.getItem("token") ? (
                    <div className="w-100 text-center">
                      <button
                        className="btn btn-info"
                        onClick={handleGetUserData}
                        type="button"
                      >
                        دریافت اطلاعات کاربر
                      </button>
                    </div>
                  ) : null}
                </Form>
                <div className="login100-pic js-tilt" data-tilt>
                  <img src="/auth/images/img-01.png" alt="IMG" />
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
