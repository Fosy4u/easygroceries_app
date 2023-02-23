import React, { useState } from "react";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/components/Banner";
import Loader from "../../../utils/components/Loader";
import ProductList from "../components/ProductList";

const Products = () => {
  const getProductsQuery = organisationsApi.useGetProductsQuery();
  const products = getProductsQuery?.data;
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <Loader showLoading={getProductsQuery?.isLoading} />
      {products?.length > 0 && <ProductList products={products} />}
      {!getProductsQuery.isLoading && products?.length === 0 && (
        <div className="w-100 d-flex text-center justify-content-center mt-4 ">
          <Banner
            show={showBanner}
            variant="warning"
            handleClose={() => setShowBanner(false)}
            className="mb-4"
          >
            <p>
              <b>No products on stock. Please check back later</b>
            </p>
          </Banner>
        </div>
      )}
    </>
  );
};

export default Products;
