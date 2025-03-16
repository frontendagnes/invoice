import {
  auth,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "@/assets/utility/firebase";

export const login = (formData, navigate, dispatch) => {
  signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((result) => {
      if (result) {
        navigate("/");
        dispatch({ type: "ALERT__OK", item: result.user.email });
      } else {
        dispatch({ type: "ALERT__ERROR" });
      }
    })
    .catch((error) => dispatch({ type: "ALERT__ERROR", item: error.message }));
};

export const register = (formData, navigate) => {
  createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then(() => {
      navigate("/authorization");
      dispatch({ type: "ALERT_REGISETER" });
    })
    .catch((error) => {
      console.log("Create user error>>>", error);
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

export const signInGoogle = (dispatch, navigate) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      if (result) {
        navigate("/");
        dispatch({ type: "ALERT__OK", item: result.user.email });
      }
    })
    .catch((error) => dispatch({ type: "ALERT__ERROR", item: error.message }));
};
