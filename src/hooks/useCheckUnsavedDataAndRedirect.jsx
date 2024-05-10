import { useNavigate } from "react-router-dom";

export default function useCheckUnsavedDataAndRedirect(len) {
  const navigate = useNavigate();

  if (len > 0) {
    return () => alert("Kaydedilmemiş veriler var");
  } else {
    return () => navigate(-1);
  }
}
