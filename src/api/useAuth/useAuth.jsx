import { useState } from "react";

import {
  auth,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "@/api/config/firebase";
import { useStateValue } from "@/utility/StateProvider";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        navigate("/");
        dispatch({ type: "ALERT__OK", item: result.user.email });
      } else {
        dispatch({ type: "ALERT__ERROR" });
      }
    } catch (error) {
      setError(error.message);
      dispatch({ type: "ALERT__ERROR", item: error.message });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/authorization");
      dispatch({ type: "ALERT_REGISETER" });
    } catch (err) {
      setError(err.message);
      dispatch({ type: "ALERT__ERROR", item: err.message });
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        navigate("/");
        dispatch({ type: "ALERT__OK", item: result.user.email });
      }
    } catch (err) {
      setError(err.message);
      dispatch({ type: "ALERT__ERROR", item: err.message });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      dispatch({ type: "ALERT_LOGOUT", item: user?.email });
      dispatch({ type: "GET_COUNT", item: null });
      dispatch({ type: "SET_LOGO", item: null });
      navigate("/");
    } catch (err) {
      setError(err.message);
      dispatch({ type: "ALERT__ERROR", item: err.message });
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({
        type: "ALERT_SUCCESS",
        item: "Jeśli e-mail jest poprawny, instrukcje resetowania hasła zostały wysłane.",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    signInGoogle,
    logout,
    resetPassword,
    loading,
    error,
  };
};

export default useAuth;
