import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListeners from "./hooks/useAuthListeners";
import "./wdyr";
import ProtectedRoute from "./helpers/protected.route";
import IsUserLoggedIn from "./helpers/isUserLoggedIn";
import Profile from "./pages/profile";
import "./styles/app.css";
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const { user } = useAuthListeners();

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <IsUserLoggedIn
                user={user}
                loggedInPath={ROUTES.DASHBOARD}
                path={ROUTES.LOGIN}
              >
                <Login />
              </IsUserLoggedIn>
              <IsUserLoggedIn
                user={user}
                IsUserLoggedIn={ROUTES.DASHBOARD}
                path={ROUTES.SIGN_UP}
              >
                <SignUp />
              </IsUserLoggedIn>
              <Route path={ROUTES.PROFILE} component={Profile} />
              <ProtectedRoute user={user} exact path={ROUTES.DASHBOARD}>
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
