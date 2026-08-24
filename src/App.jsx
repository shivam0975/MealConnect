import { Route, Routes } from "react-router";
import Layout from "./common/components/Layout";
import NotFound from "./common/components/NotFound";
import ProtectedRoute from "./common/components/ProtectedRoute";
import { protectedRoutes, publicRoutes } from "./routes";

const App = () => (
  <Routes>
    {/* Every page renders inside Layout, which supplies the header and footer. */}
    <Route element={<Layout />}>
      {publicRoutes.map(({ path, component: Component, index }) =>
        index ? (
          <Route key={path} index element={<Component />} />
        ) : (
          <Route key={path} path={path} element={<Component />} />
        )
      )}

      {/* One guard per role set, so a route's allowed roles live beside it in
          routes.jsx rather than being duplicated here. */}
      {protectedRoutes.map(({ path, component: Component, roles }) => (
        <Route key={path} element={<ProtectedRoute allow={roles} />}>
          <Route path={path} element={<Component />} />
        </Route>
      ))}

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
