import * as Yup from "yup";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const contactFromSchema = Yup.object().shape({
  message: Yup.string()
    .required("Lütfen mesajınızı yazınız.")
    .min(10, "Mesajınızı biraz daha açıklayın, örn. bulunduğunuz il, ilçe"),
  name: Yup.string()
    .required("İsminizi giriniz")
    .min(3, "İsminizi giriniz.")
    .typeError("İsminizi giriniz"),
  phoneNum: Yup.string()
    .min(10, "Geçerli bir numara giriniz")
    .typeError("Geçerli bir numara giriniz")
    .when("$mail", {
      is: (val) => {
        // console.log(1, Boolean(val));
        return Boolean(val);
      },
      then: (s) => s,
      otherwise: (s) => s.required("Lütfen en az bir iletişim adresi giriniz."),
    }),
  mail: Yup.string()
    .email("Geçerli bir mail adresi giriniz")
    .typeError("Geçerli bir mail adresi giriniz")
    .when("$phoneNum", {
      is: (val) => {
        // console.log(2, Boolean(val));
        return Boolean(val);
      },
      then: (s) => s,
      otherwise: (s) => s.required("Lütfen en az bir iletişim adresi giriniz."),
    }),
});
