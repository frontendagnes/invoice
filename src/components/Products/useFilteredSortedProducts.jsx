import { useMemo } from "react";

const useFilteredSortedProducts = (products, search) => {
  return useMemo(() => {
    const sorted = [...products].sort(
      (a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)
    );
    const searchLower = search.toLowerCase();

    return sorted.filter((item) => {
      const name = item.data.name.toLowerCase();
      const price = String(item.data.price);
      const quantity = String(item.data.quantity);

      return (
        name.includes(searchLower) ||
        price.includes(searchLower) ||
        quantity.includes(searchLower)
      );
    });
  }, [products, search]);
};

export default useFilteredSortedProducts;
