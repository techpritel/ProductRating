import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
let productRating = "";
class ProductsTable extends Component {
  handleRate({ rating }) {
    productRating = rating;
    return productRating;
  }
  render() {
    const { user } = this.props;
    const columns = [
      {
        path: "productName",
        label: "Product Name",
        content: product =>
          user != undefined && (user && user.isAdmin === "True") ? (
            <Link to={`/products/${product._id}`}>{product.productName}</Link>
          ) : (
            product.productName
          )
      },
      { path: "category.name", label: "Category" },
      { path: "price", label: "Price" },
      { path: "numberInStocks", label: "Stock" },

      {
        path: "productRating",
        label: "Rating",
        key: "Rating",
        content: product => (
          <Rater
            total={5}
            rating={product.productRating}
            interactive={true}
            onRate={this.handleRate.bind(this)}
            onClick={() => this.props.onRatingChange(product, productRating)}
          />
        )
      },
      {
        key: "Delete",
        content: product =>
          user &&
          user.isAdmin === "True" && (
            <button
              type="button"
              id={product._id}
              className="btn btn-danger"
              onClick={() => this.props.onDelete(product)}
            >
              Delete
            </button>
          )
      }
    ];
    const { products, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default ProductsTable;
