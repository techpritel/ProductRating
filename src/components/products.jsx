import React, { Component } from "react";
import { trackPromise } from 'react-promise-tracker';
import { getProducts, deleteProduct } from "../services/productService";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getcategories } from "../services/productCategoryService";
import ProductsTable from "./productsTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import Spinner from "./common/spinner";
import { async } from "q";
import { saveProduct } from "../services/productService";
class Products extends Component {
  state = {
    products: [],
    categories: [],
    pageSize: 4,
    currentPage: 1,
    selectedCategory: null,
    sortColumn: { path: "productName", order: "asc" },
    searchQuery: ""
  };
  async componentDidMount() {
    const { data } = await getcategories();
    const categories = [{ _id: "", name: "All Categories" }, ...data];
    const products = await getProducts();
    this.setState({ products: products.data, categories: categories });
  }
  deleteProduct = async product => {
    const originalProducts = this.state.products;
    const updatedProducts = originalProducts.filter(m => m._id !== product._id);
    this.setState({ products: updatedProducts });
    try {
      await deleteProduct(product._id);
      toast.success(product.productName + " deleted Successfully."); 
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This product is already deleted");
      }
      this.setState({ products: originalProducts });
    }
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedCategory: null,
      currentPage: 1
    });
  };
  handleCategorySelect = category => {
    this.setState({
      selectedCategory: category,
      searchQuery: "",
      currentPage: 1
    });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleRating = async (product, rating) => {
    const originalProducts = this.state.products;
    const productPrevRating = product.productRating;

    try {
      product.productRating = rating;
      product.categoryId = product.category._id;
      await saveProduct(product);
    } catch (error) {
      product.productRating = productPrevRating;
      this.setState({ products: originalProducts });
    }
  };
  render() {
    const { selectedCategory, sortColumn } = this.state;
    const { user } = this.props;
    if (this.state.products.length === 0)
      return <p>There is no products in database</p>;
    let filtered = this.state.products;
    if (this.state.searchQuery) {
      filtered = this.state.products.filter(m =>
        m.productName
          .toLowerCase()
          .startsWith(this.state.searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory._id) {
      filtered = this.state.products.filter(
        m => m.category._id === selectedCategory._id
      );
    }
    // const filtered =
    //   selectedCategory && selectedCategory._id
    //     ? this.state.products.filter(m => m.category._id === selectedCategory._id)
    //     : this.state.products;

    const sortedproducts = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const allproducts = paginate(
      sortedproducts,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            onItemSelect={this.handleCategorySelect}
            selectedItem={this.state.selectedCategory}
          />
        </div>

        <div className="col">
          
          {
            user && user.isAdmin==="True" && (
            <Link to="/products/new" className="btn btn-primary">
              New Product
            </Link>
          )}

          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <p>Showing {filtered.length} products in the database.</p>
          <ProductsTable
            products={allproducts}
            onRatingChange={this.handleRating}
            sortColumn={sortColumn}
            onDelete={this.deleteProduct}
            onSort={this.handleSort}
            user={user}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Products;
