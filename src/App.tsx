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
  sortBy: string;
};

export class App extends React.Component<{}, State> {
  state: State = {
    products: [],
    showModal: false,
    addProduct: false,
    changeProduct: false,
    changedProduct: null,
    sortBy: 'name',
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
      const prod = state.products.filter(product => product.id !== changedProduct.id);

      return ({
        products: [
          ...prod,
          changedProduct,
        ],
        showModal: !state.showModal,
        changeProduct: !state.changeProduct,
      });
    });
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      sortBy: event.target.value,
    });
  };

  sortetProductBy = () => {
    const { sortBy, products } = this.state;

    switch (sortBy) {
      case 'name': {
        return products.sort((a, b) => a.name.localeCompare(b.name));
      }

      case 'count': {
        return products.sort((a, b) => b.count - a.count);
      }

      default: {
        return products;
      }
    }
  };

  render(): React.ReactNode {
    const {
      showModal, addProduct, changeProduct, changedProduct, sortBy,
    } = this.state;

    const sortedProducts = this.sortetProductBy();

    return (
      <div className="App">
        <div className="App__sidebar">
          <div className="App__sidebar-panel">
            <button
              className="App__sidebar-btn"
              type="button"
              onClick={this.clickOnAdd}
              disabled={showModal}
            >
              Add product
            </button>
            <form>
              <select className="App__sidebar-select" value={sortBy} onChange={this.handleChangeSelect}>
                <option value="name">Sort by name</option>
                <option value="count">Sort by count</option>
              </select>
            </form>
          </div>
          <ProductList
            products={sortedProducts}
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
