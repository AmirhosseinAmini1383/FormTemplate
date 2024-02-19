import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string()
    .required("لطفا ایمیل خود را وارد کنید")
    .email("لطفا قالب ایمیل را رعایت کنید مثال : amir@gmail.com"),
  password: Yup.string()
    .required("لطفا گذرواژه خود را وارد کنید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "حد اقل یک حرف بزرگ و یک حرف کوچک لاتین و اعداد و کارکترهای خاص استفاده کنید"
    ),
});
export default validationSchema;
