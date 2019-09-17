import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getcategories } from "../services/productCategoryService";
import { saveProduct, getProduct } from "../services/productService";
class ProductForm extends Form {
  state = {
    data: {
      productName: "",
      categoryId: "",
      numberInStocks: "",
      price: "",
      productRating:""
    },
    categories: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    productName: Joi.string()
      .required()
      .label("Product Name"),
    categoryId: Joi.string()
      .required()
      .label("category"),
    numberInStocks: Joi.number()
      .min(0)
      .required()
      .label("Number In Stock"),
    price: Joi.number()
      .min(0)
      .required()
      .label("Price"),
      productRating:Joi.number() .min(0).max(5)
      .required()
      .label("Rating")
  };
  async componentDidMount() {
    const { data } = await getcategories();
    this.setState({ categories: data });
   
    const productId = this.props.match.params.id;
    if (productId === "new") return;
    const product = await getProduct(productId);   
    
    if (!product) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(product.data) });
  }
  doSubmit = async () => {
    console.log(this.state.data);
    await saveProduct(this.state.data);
    this.props.history.push("/products");
  };
  mapToViewModel(product) {
    console.log(product);
    return {
      _id: product._id,
      productName: product.productName,
      categoryId: product.category._id,
      numberInStocks: product.numberInStocks,
      price: product.price,
      productRating:product.productRating
    };
  }
  render() {
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("productName", "Product Name")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("numberInStocks", "Number in Stock", "number")}
          {this.renderInput("price", "Price", "number")}
          {this.renderInput("productRating", "Rating", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductForm;
