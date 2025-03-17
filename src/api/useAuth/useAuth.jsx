import React, { useState } from "react";

import {
  auth,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "@/assets/utility/firebase";
import { useStateValue } from "@/assets/utility/StateProvider";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [{ alert }, dispatch] = useStateValue();
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
    // createUserWithEmailAndPassword(auth, formData.email, formData.password)
    //   .then(() => {
    //     navigate("/authorization");
    //     dispatch({ type: "ALERT_REGISETER" });
    //   })
    //   .catch((error) => {
    //     console.log("Create user error>>>", error);
    //     dispatch({ type: "ALERT__ERROR", item: error.message });
    //   });
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
  return { login, register, signInGoogle, loading, error };
}

export default useAuth;
