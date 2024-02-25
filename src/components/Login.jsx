import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Control from "./formikElements/Control";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
const Login = () => {
  const initialValues = {
    phone: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://authservice.azhadev.ir/api/auth/login", values)
      .then((res) => {
        console.log(res);
        localStorage.getItem("token");
        if (
          res.status === 202 ||
          res.status === 200 ||
          res.statusText === "OK"
        ) {
          swal("ورود با موفقیت انجام شد", {
            buttons: "متوجه شدم",
            icon: "success",
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
  });
  const handleLogoutUser = () => {
    axios
      .get("http://authservice.azhadev.ir/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        swal("کاربر با موفقیت از سیستم خارج شد!", {
          buttons: "متوجه شدم",
          icon: "success",
        });
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
            return (
              <div className="wrap-login100">
                <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                  <span className="login100-form-title">ورود اعضا</span>

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
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">ورود</button>
                  </div>
                  {localStorage.getItem("token") ? (
                    <div className="text-center p-t-12 p-b-45">
                      <a className="txt2" href="#" onClick={handleLogoutUser}>
                        خروج از سیستم
                      </a>
                    </div>
                  ) : null}
                  <div className="text-center pos-absolute m-auto w-100 bottom-0">
                    <Link className="txt2" to="/register">
                      ثبت نام
                      <i
                        className="fa fa-long-arrow-left m-l-5"
                        aria-hidden="true"
                      ></i>
                    </Link>
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
