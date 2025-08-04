import { useState, useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { validate } from "./validate.jsx";
import useFirestore from "../../../api/useFirestore/useFirestore.jsx";
import { useClickAway } from "react-use";

export default function useFormProductsLogic({
  title,
  quantity,
  price,
  dispatch,
  products,
  productsStorage,
  setProductsStorage,
}) {
  const [errors, setErrors] = useState({});
  const [test, setTest] = useState("");
  const [isViewTips, setIsViewTips] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const { loading, errorFirestore, updateDocument } = useFirestore("invoices");

  const refFormProduct = useRef(null);
  useClickAway(refFormProduct, () => setIsViewTips(false));

  const worth = useMemo(() => quantity * price, [quantity, price]);

  useEffect(() => {
    if (title.trim() === "") setIsViewTips(false);
  }, [title]);

  useEffect(() => {
    const match = products.find(
      (p) => p.data.name.toLowerCase() === title.toLowerCase()
    );
    if (!match) setSelectedProductId(null);
  }, [title, products]);

  const handleChange = (field, value) => {
    dispatch({ type: `SET_${field.toUpperCase()}`, [field]: value });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    if (field === "title") setIsViewTips(true);
  };

  const addProduct = async () => {
    const selectedProduct = products.find(
      (item) => item.id === selectedProductId
    );

    if (selectedProduct && Number(quantity) > Number(selectedProduct.data.quantity)) {
      setErrors({
        quantity: `Niewystarczająca ilość produktu w magazynie. Dostępne: ${selectedProduct.data.quantity} szt.`,
      });
      return;
    }

    const msg = validate(title, price, quantity, test);
    if (msg) {
      setErrors(msg);
      return;
    }

    const objStorage = {
      id: uuidv4(),
      idDB: selectedProductId || "",
      title,
      quantity,
      price,
      worth,
      vat: 0,
    };

    setProductsStorage([...productsStorage, objStorage]);

    if (selectedProduct) {
      const decrementQuantity = Number(selectedProduct.data.quantity) - Number(quantity);
      await updateDocument(
        "products",
        selectedProduct.id,
        { quantity: decrementQuantity },
        null
      );
      dispatch({
        type: "UPDATE_PRODUCT_QUANTITY",
        id: selectedProduct.id,
        newQuantity: decrementQuantity,
      });
    }

    dispatch({ type: "SET_TITLE", title: "" });
    dispatch({ type: "SET_QUANTITY", quantity: 1 });
    dispatch({ type: "SET_PRICE", price: 0 });
    setErrors({});
  };

  return {
    refFormProduct,
    handleChange,
    addProduct,
    setTest,
    setPrice: (val) => dispatch({ type: "SET_PRICE", price: val }),
    setIsViewTips,
    setSelectedProductId,
    test,
    errors,
    loading,
    errorFirestore,
    isViewTips,
    selectedProductId,
  };
}
