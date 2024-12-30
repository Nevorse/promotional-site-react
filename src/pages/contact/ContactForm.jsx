import { Form, Formik } from "formik";
import Input from "../../components/Input";
import { contactFromSchema } from "../../validations/contactFormSchema";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import classNames from "classnames";

export default function ContactForm() {
  const formikRef = useRef();
  const form = useRef();
  const [error, setError] = useState(["", 0]);
  const [process, setProcess] = useState(false);

  const errorControl = () => {
    const values = formikRef.current.values;
    const err = Object.values(formikRef?.current?.errors)[0];

    if (err) {
      setTimeout(() => {
        setError([err, error[1] + 1]);
      }, 50);
    } 
    else if (!values.mail && !values.phoneNum) {
      setError(["Mesajınızı yazınız.", error[1] + 1]);
    }
  };

  useEffect(() => {
    if (error[1]) {
      toast.error(error[0]);
    }
  }, [error]);

  const handleSubmit = () => {
    setProcess(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        (res) => {
          toast.success("Mesaj gönderildi.", { duration: 6000 });
          setProcess(false);
          formikRef.current.resetForm();
        },
        (error) => {
          toast.error("Bir hata oluştu.");
          setProcess(false);
        }
      )
      .catch(() => {
        toast.error("Sunucu hatası.");
        setProcess(false);
      });
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ name: "", mail: "", phoneNum: "", message: "" }}
      validationSchema={contactFromSchema}
      onSubmit={handleSubmit}>
      {
        <Form
          ref={form}
          className="flex items-center justify-center flex-col gap-4 w-[80%]">
          <div className="flex justify-center flex-wrap w-[90%] gap-5">
            <Input name={"name"} label={"İsim"} as={"input"} />
            <Input name={"phoneNum"} label={"Telefon Numarası"} as={"input"} />
            <Input name={"mail"} label={"E-Posta"} as={"input"} type={"email"} />
          </div>
          <div className="w-[90%]">
            <Input name={"message"} label={"Mesaj"} as={"textarea"} rows={"6"} />
          </div>

          <button
            type={process ? "button" : "submit"}
            className={classNames(
              `inline-flex items-center px-5 py-2 mt-1 font-semibold leading-6 text-sm shadow-md 
              rounded-md text-[color:var(--color-secondary)] bg-[color:var(--color-tertiary)]
              hover:bg-[color:var(--color-tertiary)] transition-all`,
              {
                "cursor-not-allowed": process,
              }
            )}
            disabled={process}
            onClick={errorControl}>
            {process ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-[color:var(--color-secondary)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gönderiliyor...
              </>
            ) : (
              <>Gönder</>
            )}
          </button>
        </Form>
      }
    </Formik>
  );
}
