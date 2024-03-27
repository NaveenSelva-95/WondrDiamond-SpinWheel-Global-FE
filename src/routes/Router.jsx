import { Outlet, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layouts";
import { Suspense } from "react";

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <Layout>
          <Suspense>
            <Outlet />
          </Suspense>
        </Layout>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
  return routes;
};

export default Router;
