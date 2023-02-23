import React, { useState } from "react";
import { useParams } from "react-router-dom";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/components/Banner";
import Loader from "../../../utils/components/Loader";
import ProductDetail from "../components/ProductDetail";


const Product = () => {
  const { id } = useParams();
  const [showBanner, setShowBanner] = useState(true);
  const getproductQuery = organisationsApi.useGetProductQuery(
    {
      id,
    },
    { skip: !id }
  );
  const product = getproductQuery?.data;


  return (
    <>
      <Loader showLoading={getproductQuery?.isLoading} />
      {product && <ProductDetail product={product} />}
      
      {!getproductQuery.isLoading && !product && (
        <div className="w-100 d-flex text-center justify-content-center mt-4 ">
          <Banner
            show={showBanner}
            variant="danger"
            handleClose={() => setShowBanner(false)}
            className="mb-4"
          >
            <p>
              <b> Product not found </b>
            </p>
          </Banner>
        </div>
      )}
    </>
  );
};

export default Product;
