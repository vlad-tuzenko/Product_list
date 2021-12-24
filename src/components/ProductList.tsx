import React from 'react';
import { Product } from '../types';
import { ProductItem } from './ProductItem';
import './ProductList.scss';

type Prop = {
  products: Product[];
  onDelete(id:number):void;
};

export const ProductList: React.FC<Prop> = ({ products, onDelete }) => {
  return (
    <>
      <ul className="ProductList">
        {products.map(product => (
          <ProductItem product={product} onDelete={onDelete} key={product.id} />
        ))}
      </ul>
    </>
  );
};
