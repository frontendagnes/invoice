import React from "react";
import "./ViewProducts.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function ViewProducts({ products, setProducts }) {
 
  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };
  return (
    <div className="viewproducts">
      <table>
        <thead>
          <tr>
            <td>lp.</td>
            <td className="table__title">Nazwa towaru:</td>
            <td>Ilość</td>
            <td className="table__price">Cena jedn. netto</td>
            <td className="table__price">Wartość</td>
            <td>Vat</td>
            <td></td>
          </tr>
        </thead>
        {products.map((item, index) => (
          <tbody key={index}>
            <tr>
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
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default ViewProducts;
