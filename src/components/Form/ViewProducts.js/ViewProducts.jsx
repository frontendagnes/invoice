import "./ViewProducts.css";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function ViewProducts({ productsStorage, setProductsStorage }) {
  const removeProduct = (index) => {
    const newProducts = [...productsStorage];
    newProducts.splice(index, 1);
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
                  className="vieproducts__button"
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
