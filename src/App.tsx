import React from 'react';
import './App.scss';
// import { ProductItem } from './components/ProductItem';
import { ProductList } from './components/ProductList';
import { Product } from './types';
import productsFromServer from './api/products.json';

type State = {
  products: Product[]
};

export class App extends React.Component<{}, State> {
  state: State = {
    products: [],
  };

  componentDidMount() {
    this.setState({ products: productsFromServer });
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <div className="App__sidebar">
          <ProductList products={this.state.products} />
        </div>

        <div className="App__content">
        </div>
      </div>
    );
  }
}
