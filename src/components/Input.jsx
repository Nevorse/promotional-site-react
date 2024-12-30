import { Field } from "formik";

export default function Input({ name, label, as, rows, type }) {


  return (
    <div className="flex flex-col grow gap-1 shadow-sm">
      <label htmlFor={name} className="text-neutral-800">{label}</label>
      <Field
        className="w-full border p-3 focus:outline-slate-400"
        name={name}
        as={as}
        rows={rows}
        type={type}
      />
    </div>
  );
}
