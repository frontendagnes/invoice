import { useState } from "react";
import "./Products.css";
import useFirestore from "../../api/useFirestore/useFirestore";
import { useStateValue } from "../../state/StateProvider";

//components
import AddProducts from "./AddProducts/AddProducts";
import ProductsList from "./ProductsList/ProductsList";

function Products() {
    const [{ products }, dispatch] = useStateValue();

  return (
    <div className="products">
      <AddProducts />
      <ProductsList products={products}/>
    </div>
  );
}

export default Products;
