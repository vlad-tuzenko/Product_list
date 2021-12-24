import React from 'react';
import { Product } from '../types';
import { ProductItem } from './ProductItem';
import './ProductList.scss';

type Prop = {
  products: Product[];
};

export const ProductList: React.FC<Prop> = ({ products }) => {
  return (
    <>
      <ul className="ProductList">
        {products.map(product => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </>
  );
};
