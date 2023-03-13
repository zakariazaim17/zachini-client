import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Category from "./pages/category";
import Profile from "./pages/Profile/profile";
import Register from "./pages/Register";
import Product from "./pages/product";
import Shop from "./pages/shop";
import Brand from "./pages/brand";
import Authcontext from "./components/context/context.js";
import MainNavigation from "./components/navigation/navigation";
import Sale from "./pages/sale";

const App = () => {
  const ClientToken = localStorage.getItem("clientToken");
  const [Clientdata, setClientdata] = useState({
    token: null,
    id: null,
  });

  const login = (token, id) => {
    setClientdata({ token: token, id: id });
  };

  const logout = () => {
    setClientdata({ token: null, id: null });
  };

  return (
    <Router>
      <React.Fragment>
        <Authcontext.Provider
          value={{
            token: Clientdata.token,
            id: Clientdata.id,
            login: login,
            logout: logout,
          }}
        >
          <MainNavigation />

          <main className="main-content">
            <Switch>
              {!ClientToken && <Redirect from="/shop" to="/login" />}

              {!ClientToken && <Redirect from="/profile" to="/login" />}
              {!ClientToken && <Redirect from="/favourites" to="/login" />}
              {!ClientToken && <Redirect from="/" to="/login" exact />}

              {ClientToken && <Redirect from="/" to="/shop" exact />}

              {ClientToken && <Redirect from="/login" to="/shop" exact />}
              {ClientToken && <Redirect from="/register" to="/shop" exact />}

              {ClientToken && (
                <Route
                  path="/shop/category/:categoryName"
                  component={Category}
                  exact
                />
              )}

              {ClientToken && (
                <Route path="/shop/sale" component={Sale} exact />
              )}

              {ClientToken && <Route path="/profile" component={Profile} />}

              {ClientToken && (
                <Route
                  path="/shop/category/:name/:id"
                  component={Product}
                  exact
                />
              )}

              {ClientToken && (
                <Route path="/shop/products/:id" component={Product} exact />
              )}

              {ClientToken && (
                <Route path="/shop/brand" component={Brand} exact />
              )}

              {ClientToken && (
                <Route
                  path="/shop/brand/:brandName/:productId"
                  component={Product}
                  exact
                />
              )}
              <Route path="/login" component={Login} />
              <Route path="/shop" component={Shop} />
              <Route path="/register" component={Register} />
            </Switch>
          </main>
        </Authcontext.Provider>
      </React.Fragment>
    </Router>
  );
};

export default App;

/*
{ClientToken && (
                <Route path="/categories" component={Categories} exact />
              )}
              {ClientToken && (
                <Route path="/myproducts" component={MyProducts} />
              )}
              {ClientToken && (
                <Route
                  path="/categories/:id"
                  component={GeneralProducts}
                  exact
                />
              )}
              {ClientToken && (
                <Route path="/bidings/:id" component={BidingsRooms} exact />
              )}
              <Route path="/login" component={Auth} />
              {ClientToken && <Route path="/bidings" component={Bidings} />}
              {ClientToken && <Route path="/profile" component={Profile} />}

              {ClientToken && (
                <Route
                  path="/categories/:name/:id"
                  component={specificProduct}
                  exact
                />
              )}
              {ClientToken && (
                <Route path="/favourites" component={favourites} exact />
              )}

              */
