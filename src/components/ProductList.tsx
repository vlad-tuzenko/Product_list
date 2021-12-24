import React from 'react';
import { Product } from '../types';
import { ProductItem } from './ProductItem';
import './ProductList.scss';

type Prop = {
  products: Product[];
  onDelete(id:number):void;
  onChange(product: Product):void;
};

export const ProductList: React.FC<Prop> = ({ products, onDelete, onChange }) => {
  return (
    <>
      <ul className="ProductList">
        {products.map(product => (
          <ProductItem
            product={product}
            onDelete={onDelete}
            onChange={onChange}
            key={product.id}
          />
        ))}
      </ul>
    </>
  );
};
