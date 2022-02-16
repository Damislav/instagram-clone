import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListeners from "./hooks/useAuthListeners";
import "./wdyr";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));
export default function App() {
  const { user } = useAuthListeners();

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Switch>
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.SIGN_UP} component={SignUp} />{" "}
              <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
              <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            </Switch>
          </Router>
        </Suspense>{" "}
      </UserContext.Provider>
    </>
  );
}
