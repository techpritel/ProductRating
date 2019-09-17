import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/not-found";
import NavBar from "./components/common/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Products from "./components/products";
import ProductForm from "./components/productForm";
import auth from "./services/authSevice";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/common/logout";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/products/:id" component={ProductForm} />
            <Route
              path="/products"
              render={props => <Products {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/products" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
