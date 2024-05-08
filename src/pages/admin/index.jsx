import { useState } from "react";
import { Outlet } from "react-router-dom";
import { login, logout } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Index() {
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eMail && password) {
      const user = await login(eMail, password);
      if (user) {
        toast.success("Giriş yapıldı.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <Toaster position="top-right" />
      {user ? (
        <>
          <nav className="flex mt-5 w-[90vw] justify-end">
            <button
              onClick={() => logout()}
              className="bg-red-400 text-white border border-red-500 rounded-lg px-4 py-1 text-[15px]">
              Çıkış Yap
            </button>
          </nav>
          <Outlet />
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 mt-10 w-[300px] items-center">
          <input
            type="text"
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
            className="border px-2 py-1 border-slate-400 rounded-md w-full"
            placeholder="e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 border-slate-400 rounded-md w-full"
            placeholder="password"
          />
          <button
            type="submit"
            className="bg-slate-400/90 rounded-lg px-4 py-1 text-[15px] text-gray-100">
            Giriş Yap
          </button>
        </form>
      )}
    </div>
  );
}
