import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { login, logout } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { setAllData } from "../../setFuncs";

export default function Index() {
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setAllData("project_albums");
    setAllData("service_albums");
  }, []);

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
              className="bg-red-500 text-white border border-red-500 rounded-lg px-4 py-1.5 text-[15px] leading-5">
              Çıkış yap
            </button>
          </nav>
          <Outlet />
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-1 mt-20 w-[300px] items-center">
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
