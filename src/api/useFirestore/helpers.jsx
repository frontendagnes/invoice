import { useCallback } from "react";
import { useStateValue } from "../../assets/utility/StateProvider";

export function useHelpers(setLoading) {
  const [{ user }, dispatch] = useStateValue();

  const handleFirestoreError = useCallback(
    (error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    },
    [dispatch]
  );
  const handleFirestoreLoadingSet = useCallback(() => {
    dispatch({ type: "SET_GLOBAL_LOADING" });
    setLoading(true);
  }, [dispatch, setLoading]);
  const handleFirestoreLoadingUnset = useCallback(() => {
    dispatch({ type: "UNSET_GLOBAL_LOADING" });
    setLoading(false);
  }, [dispatch, setLoading]);
  
  return {
    handleFirestoreError,
    handleFirestoreLoadingSet,
    handleFirestoreLoadingUnset,
  };
}
