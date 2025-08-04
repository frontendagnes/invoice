import "./FormProducts.css";
import useFormProductsLogic from "./useFormProducts";
//mui
import { TextField } from "@mui/material";
//components
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";
import ValidationError from "../../ValidationError/ValidationError";
import FormButton from "../FormButton/FormButton.jsx";
import ProductHints from "./ProductHints/ProductHints.jsx";
import AntySpam from "../../AntySpam/AntySpam.jsx";

function FormProducts(props) {
  const {
    title,
    quantity,
    price,
    products,
    dispatch,
    productsStorage,
    setProductsStorage,
  } = props;

  const {
    refFormProduct,
    handleChange,
    addProduct,
    setPrice,
    setTest,
    setIsViewTips,
    setSelectedProductId,
    test,
    errors,
    loading,
    errorFirestore,
    isViewTips,
  } = useFormProductsLogic({
    title,
    quantity,
    price,
    dispatch,
    products,
    productsStorage,
    setProductsStorage,
  });

  return (
    <div className="formproducts">
      <div className="createinvoice__text">Dodaj Produkty:</div>

      <div className="formproducts__error">
        {errorFirestore && <ValidationError text={errorFirestore} />}
        {errors.test && <ValidationError text={errors.test} />}
      </div>

      <div className="formproducts__wrapper" ref={refFormProduct}>
        <div className="formproducts__inputs">
          <div className="formproducts__input">
            <TextField
              value={title}
              name="title"
              onChange={(e) => handleChange("title", e.target.value)}
              label="Nazwa produktu"
              variant="outlined"
              fullWidth
              helperText={errors.title || " "}
              error={!!errors.title}
              autoComplete="off"
            />
          </div>

          {isViewTips && (
            <ProductHints
              value={title}
              products={products}
              setValue={(val) => dispatch({ type: "SET_TITLE", title: val })}
              setPrice={setPrice}
              setIsViewTips={setIsViewTips}
              setSelectedProductId={setSelectedProductId}
            />
          )}

          <div className="formproducts__input">
            <TextField
              value={quantity}
              name="quantity"
              type="number"
              onChange={(e) => handleChange("quantity", e.target.value)}
              label="Ilość"
              variant="outlined"
              fullWidth
              helperText={errors.quantity || " "}
              error={!!errors.quantity}
            />
          </div>

          <div className="formproducts__input">
            <NumericField
              value={price}
              name="price"
              onChange={(e) => handleChange("price", e.target.value)}
              label="Cena jedn."
              numeric
              helperText={errors.price || " "}
              error={!!errors.price}
            />
          </div>
        </div>
        <div className="formproducts__button">
          <FormButton
            text={loading ? "Dodaje..." : "Dodaj produkt"}
            onClick={addProduct}
            disabled={loading}
            styles={{
              height: "56px", // wysokość jak TextField
            }}
          />
        </div>
      </div>

      <AntySpam test={test} setTest={setTest} />
    </div>
  );
}

export default FormProducts;
