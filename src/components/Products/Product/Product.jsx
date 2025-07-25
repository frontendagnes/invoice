import { useState, useRef, useEffect } from "react";
import "./Product.css";
import { useClickOutside } from "../../../hooks/useClickOutside";
//mui
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
//component
import Tooltip from "../../Tooltip/Tooltip";
import EditProducts from "../EditProducts/EditProducts";

function Product({ product, removeProduct }) {
  const { name, price, quantity, description } = product.data;
  const [isEdit, setIsEdit] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEdit]);

  const refButton = useRef(null);
  const refEdit = useRef(null);

  useClickOutside(refEdit, () => setIsEdit(false), [refButton]);

  const toggleEditProduct = () => {
    setIsEdit((prev) => !prev);
  };
  return (
    <div className="product">
      <div className="product__fields">
        <div>
          <span>Nazwa:</span> {name}
        </div>
        <div>
          <span>Cena: </span>
          {price} zł
        </div>
        <div>
          <span>Ilość:</span> {quantity}
        </div>
        <div>
          <span>Opis:</span> {description}
        </div>
      </div>
      <div className="product__actions">
        <Tooltip text="Edytuj produkt">
          <EditIcon
            ref={refButton}
            color="primary"
            onClick={toggleEditProduct}
          />
        </Tooltip>
        <Tooltip text="Usuń produkt">
          <RemoveCircleIcon color="error" onClick={removeProduct} />
        </Tooltip>
      </div>
      <div
        ref={refEdit}
        className={`product__edit ${isEdit ? "expanded" : ""}`}
      >
        <EditProducts
          name={name}
          price={price}
          quantity={quantity}
          description={description}
          productId={product.id}
          setIsEdit={setIsEdit}
        />
      </div>
    </div>
  );
}

export default Product;
