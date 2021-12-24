import React from 'react';
import './App.scss';
import { ProductList } from './components/ProductList';
import { Product } from './types';
import productsFromServer from './api/products.json';
import { NewProduct } from './components/NewProduct';

type State = {
  products: Product[];
  showModal: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    products: [],
    showModal: false,
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

  showModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render(): React.ReactNode {
    const { products, showModal } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <button
            type="button"
            onClick={this.showModal}
            hidden={showModal}
          >
            Add product
          </button>
          <ProductList products={products} onDelete={this.deleteProduct} />
        </div>

        {showModal && (
          <div className="App__content">
            <NewProduct onAdd={this.addProduct} onCancel={this.showModal} />
          </div>
        )}
      </div>
    );
  }
}
