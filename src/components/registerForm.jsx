import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {register} from "../services/register";
class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", userName: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required(),
      userName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
  };

  doSubmit = async() => {
   
    try {
      await register(this.state.data);
      this.props.history.push("/login");
    } catch (ex) {
      if(ex.response && ex.response.status==400){
        const errors={...this.state.errors};
        errors.email=ex.response.data;
        this.setState({errors});
      }
    } 
   
   };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("userName", "UserName")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
