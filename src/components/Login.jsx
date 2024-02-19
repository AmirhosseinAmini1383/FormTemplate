import { Form, Formik } from "formik";
import React from "react";
import { initialValues } from "./useFormik/initialValues";
import { onSubmit } from "./useFormik/onSubmit";
import validationSchema from "./useFormik/validationSchema";
import Control from "./formikElements/Control";
const Login = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <div className="wrap-login100">
                <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                  <span className="login100-form-title">ورود اعضا</span>
                  <Control
                    formik={formik}
                    control="input"
                    type="email"
                    name="email"
                    icon="fa fa-envelope"
                    label="ایمیل"
                  />

                  <Control
                    formik={formik}
                    control="input"
                    type="password"
                    name="password"
                    icon="fa fa-lock"
                    label="رمز عبور"
                  />
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">ورود</button>
                  </div>
                  <div className="text-center p-t-12 p-b-45">
                    <a className="txt2" href="#">
                      فراموش کردید؟
                    </a>
                  </div>
                  <div className="text-center pos-absolute m-auto w-100 bottom-0">
                    <a className="txt2" href="#">
                      ثبت نام
                      <i
                        className="fa fa-long-arrow-left m-l-5"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
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

export default Login;
