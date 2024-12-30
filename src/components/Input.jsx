import { Field } from "formik";

export default function Input({ name, label, as, rows, type }) {
  return (
    <div className="flex flex-col grow gap-1 shadow-sm">
      <label htmlFor={name} className="text-[color:var(--color-primary)]">
        {label}
      </label>
      <Field
        className="w-full border p-3 border-[color:var(--color-primary)]
        focus:outline-[color:var(--color-primary)] focus-within:outline-none
        bg-[color:var(--theme-primary)]"
        name={name}
        as={as}
        rows={rows}
        type={type}
      />
    </div>
  );
}
