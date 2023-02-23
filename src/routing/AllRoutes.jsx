

import { Route, Navigate, Routes } from "react-router-dom";



/**
 * Renders provided routes using React Router's Switch & Route components.
 * @param {Routes} routes 

 */
const AllRoutes = ({ routes }) => {

  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
            exact
          />
        );
      })}

      {/* catch-all to redirect any unknown paths to default page for the app */}
      <Route
        path="*"
        element={<Navigate to={`/easyGroceries-Shop`} replace />}
      />
    
    </Routes>
  );
};

export default AllRoutes;
