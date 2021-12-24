import React from 'react';
import './App.scss';
import { ProductList } from './components/ProductList';
import { Product } from './types';
import productsFromServer from './api/products.json';
import { NewProduct } from './components/NewProduct';
import { ChangeProduct } from './components/ChangeProduct';

type State = {
  products: Product[];
  showModal: boolean;
  addProduct: boolean;
  changeProduct: boolean;
  changedProduct: Product | null;
};

export class App extends React.Component<{}, State> {
  state: State = {
    products: [],
    showModal: false,
    addProduct: false,
    changeProduct: false,
    changedProduct: null,
  };

  componentDidMount() {
    this.setState({ products: productsFromServer });
  }

  addProduct = (newProduct: Product) => {
    this.setState(state => ({
      products: [...state.products,
        newProduct],
    }));
  };

  deleteProduct = (id:number) => {
    this.setState(state => ({
      products: state.products.filter(product => product.id !== id),
    }));
  };

  clickOnAdd = () => {
    this.setState(state => ({
      showModal: !state.showModal,
      addProduct: !state.addProduct,
    }));
  };

  clickOnChange = (product: Product) => {
    this.setState(state => ({
      showModal: !state.showModal,
      changeProduct: !state.changeProduct,
      changedProduct: product,
    }));
  };

  saveChange = (changedProduct: Product) => {
    this.setState(state => {
      return ({
        products: [
          ...state.products,
          changedProduct,
        ],
      });
    });
  };

  render(): React.ReactNode {
    const {
      products, showModal, addProduct, changeProduct, changedProduct,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <div className="App__sidebar-panel">
            <button
              className="App__sidebar-btn"
              type="button"
              onClick={this.clickOnAdd}
              hidden={showModal}
            >
              Add product
            </button>
          </div>
          <ProductList
            products={products}
            onDelete={this.deleteProduct}
            onChange={this.clickOnChange}
          />
        </div>

        {showModal && addProduct && (
          <div className="App__content">
            <NewProduct onAdd={this.addProduct} onCancel={this.clickOnAdd} />
          </div>
        )}
        {showModal && changeProduct && (
          <div className="App__content">
            {changedProduct && (
              <ChangeProduct
                onCancel={this.clickOnAdd}
                product={changedProduct}
                changeProduct={this.saveChange}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
