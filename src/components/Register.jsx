import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Control from "./formikElements/Control";
import { Link } from "react-router-dom";
const Register = () => {
  const initialValues = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    authMode: "mobile",
    rule: [],
  };
  const onSubmit = (values) => {
    console.log(values);
    alert("Submit Form :)");
  };
  const validationSchema = Yup.object({
    email: Yup.string().when("auth_mode", {
      is: "email",
      then: Yup.string()
        .required("لطفا ایمیل خود را وارد کنید")
        .email("لطفا قالب ایمیل را رعایت کنید : amir@gmail.com"),
    }),
    mobile: Yup.number().when("auth_mode", {
      is: "mobile",
      then: Yup.number().required("لطفا شماره موبایل خود را وارد کنید"),
    }),
    password: Yup.string()
      .required("لطفا رمز عبور خود را کنید")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "حداقل یک حرف بزرگ و یک حرف کوچک لاتین و اعداد و کارکترهای خاص استفاده کنید"
      ),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "با رمز عبور مطابقت ندارد")
      .required("لطفا تکرار رمز عبور خود را وارد کنید"),
    username: Yup.string()
      .required("لطفا نام کاربری خود را وارد کنید")
      .matches(/^[0-9a-zA-Z]+$/, "فقط از حروف لاتین و اعداد استفاده کنید"),
    firstname: Yup.string()
      .required("لطفا نام خود را وارد کنید")
      .matches(
        /^[ابپتثجچهخدذرزسشصظطضعغفقک@-_.:گلمنوهیژئي\s0-9a-zA-Z]+$/,
        "فقط از حروف فارسی و لاتین و اعداد و @ : - _ . استفاده کنید"
      ),
    lastname: Yup.string()
      .required("لطفا نام خانوادگی خود را وارد کنید")
      .matches(
        /^[ابپتثجچهخدذرزسشصظطضعغفقک@-_.:گلمنوهیژئي\s0-9a-zA-Z]+$/,
        "فقط از حروف فارسی و لاتین و اعداد و @ : - _ . استفاده کنید"
      ),
    rule: Yup.string().required("لطفا قوانین رو مطالعه کنید"),
  });
  const authModeValues = [
    { id: "mobile", value: "موبایل" },
    { id: "email", value: "ایمیل" },
  ];
  const ruleValues = [{ id: 1, value: "قوانین سایت را مطالعه کردم." }];

  return (
    <div className="limiter">
      <div className="container-login100">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            console.log(formik);
            return (
              <div className="wrap-login100">
                <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                  <span className="login100-form-title">ثبت نام</span>
                  <Control
                    formik={formik}
                    control="input"
                    type="text"
                    name="firstname"
                    icon="fa fa-user"
                    label="نام"
                  />
                  <Control
                    formik={formik}
                    control="input"
                    type="text"
                    name="lastname"
                    icon="fa fa-user"
                    label="نام خانوادگی"
                  />
                  <Control
                    formik={formik}
                    control="input"
                    type="text"
                    name="username"
                    icon="fa fa-user"
                    label="نام کاربری"
                  />

                  <Control
                    formik={formik}
                    control="Radio"
                    name="authMode"
                    label="نوع اعتبار سنجی"
                    options={authModeValues}
                  />
                  {formik.values.authMode == "mobile" ? (
                    <Control
                      formik={formik}
                      control="input"
                      type="number"
                      name="mobile"
                      icon="fa fa-phone"
                      label="شماره موبایل"
                    />
                  ) : (
                    <Control
                      formik={formik}
                      control="input"
                      type="email"
                      name="email"
                      icon="fa fa-envelope"
                      label="ایمیل"
                    />
                  )}
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
                    name="confirmpassword"
                    icon="fa fa-lock"
                    label="تایید رمز عبور"
                  />
                  <Control control="checkbox" name="rule" option={ruleValues} />
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">ثبت نام</button>
                  </div>
                  <div className="text-center p-t-12 p-b-45">
                    <Link className="txt2" to="/">
                      قبلا ثبت نام کرده ام
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

export default Register;
