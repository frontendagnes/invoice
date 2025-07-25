import { useState } from "react";
import "./ProductsList.css";
import usePagination from "../../../hooks/usePagination";
import useFirestore from "../../../api/useFirestore/useFirestore";
import { useStateValue } from "../../../state/StateProvider";
import useFilteredSortedProducts from "../useFilteredSortedProducts";
//mui
import { TextField } from "@mui/material";
//component
import Product from "../Product/Product";
import PaginationUX from "../../PaginationUX/PaginationUX";
import ValidationError from "../../ValidationError/ValidationError";
import DeleteConfirmationModal from "../../DeleteConfirmationModal/DeleteConfirmationModal";
const ITEM_PER_PAGE = 5;

function ProductsList({ products }) {
  const [searchProduct, setSearchProduct] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [nameDeletingItem, setNameDeletingItem] = useState("");
  const [, dispatch] = useStateValue();
  const { errorFirestore, deleteDocument } = useFirestore("invoices");

  const filteredAndSortedProducts = useFilteredSortedProducts(
    products,
    searchProduct
  );

  const {
    currentPage,
    currentPageData,
    totalPages,
    handlePageChange,
    setCurrentPage,
  } = usePagination(filteredAndSortedProducts, ITEM_PER_PAGE);

  const openConfirmModal = (itemId, itemName) => {
    setDeleteId(itemId);
    setNameDeletingItem(itemName);
    setIsDeleting(true);
  };
  const closeConfirmModal = () => {
    setDeleteId("");
    setNameDeletingItem("");
    setIsDeleting(false);
  };
  const removeProduct = async (idProduct) => {
    await deleteDocument("products", idProduct);
    closeConfirmModal();
    dispatch({ type: "ALERT_DELETE" });
  };

  return (
    <div className="products__list">
      <div className="products_error">
        <ValidationError text={errorFirestore} />
      </div>
      <h2>Lista produktów</h2>
      <div className="product__items">
        <div className="products__search">
          <TextField
            value={searchProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
              setCurrentPage(1);
            }}
            label="Wyszukaj produktu po nazwie, ilości i cenie"
            fullWidth
          />
        </div>
        {currentPageData.map((product) => (
          <Product
            key={product.id}
            product={product}
            removeProduct={() =>
              openConfirmModal(product.id, product.data.name)
            }
          />
        ))}
      </div>
      <PaginationUX
        currentPage={currentPage}
        currentPageData={currentPageData}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
      />
      {isDeleting && (
        <DeleteConfirmationModal
          isOpen={isDeleting}
          onClickYes={() => deleteId && removeProduct(deleteId)}
          onClickNo={() => setIsDeleting(false)}
          item={nameDeletingItem}
        />
      )}
    </div>
  );
}

export default ProductsList;
