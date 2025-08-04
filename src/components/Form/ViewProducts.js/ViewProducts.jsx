import "./ViewProducts.css";
import useFirestore from "../../../api/useFirestore/useFirestore";
import { useStateValue } from "../../../state/StateProvider";
//mui
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function ViewProducts({ productsStorage, setProductsStorage, products }) {
  const { updateDocument } = useFirestore("invoices");
  const [, dispatch] = useStateValue();

  const removeProduct = async (index) => {
    const productToRemove = productsStorage[index];
    if (!productToRemove) return;

    let originalProductInDB;
    if (productToRemove.idDB) {
      originalProductInDB = products.find(
        (item) => item.id === productToRemove.idDB
      );
    }

    if (originalProductInDB) {
      try {
        const quantityInDB = Number(originalProductInDB.data.quantity ?? 0);
        const quantityToRestore = Number(productToRemove.quantity ?? 0);
        const newQuantityInDB = quantityInDB + quantityToRestore;

        await updateDocument("products", originalProductInDB.id, {
          quantity: newQuantityInDB,
        });

        dispatch({
          type: "UPDATE_PRODUCT_QUANTITY",
          id: originalProductInDB.id,
          newQuantity: newQuantityInDB,
        });
      } catch (error) {
        dispatch({
          type: "ALERT__ERROR",
          item: error.message || "Nieznany błąd podczas aktualizacji produktu.",
        });
        return;
      }
    }

    const newProducts = productsStorage.filter((_, i) => i !== index);
    setProductsStorage(newProducts);
  };

  if (!productsStorage.length) {
    return (
      <div className="viewproducts__empty">
        Dodaj produkty do faktury, aby je zobaczyć.
      </div>
    );
  }
  return (
    <div className="viewproducts">
      <table>
        <thead>
          <tr>
            <td>Lp.</td>
            <td className="table__title">Nazwa towaru:</td>
            <td>Ilość</td>
            <td className="table__price">Cena jedn. netto</td>
            <td className="table__price">Wartość</td>
            <td>Vat</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {productsStorage.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.quantity} szt.</td>
              <td>{Number.parseFloat(item.price).toFixed(2)} zł</td>
              <td>{Number.parseFloat(item.worth).toFixed(2)} zł</td>
              <td>{item.vat}</td>
              <td>
                <RemoveCircleIcon
                  className="viewproducts__button"
                  color="error"
                  onClick={() => removeProduct(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProducts;
