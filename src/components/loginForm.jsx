import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authSevice";
import auth from '../services/authSevice';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("UserName"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data.username, this.state.data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "UserName")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
