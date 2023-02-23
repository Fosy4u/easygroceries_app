import { Suspense } from "react";
import Loader from "./Loader";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader showLoading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
