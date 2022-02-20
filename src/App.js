import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";

import ReactLoader from "./components/Loader";

import ProtectedRoute from "./helpers/protected.route";
import useAuthListener from "./hooks/useAuthListeners";
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const { user } = useAuthListener();

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Router>
          <Suspense fallback={<ReactLoader />}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.PROFILE} component={Profile} />
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </>
  );
}
