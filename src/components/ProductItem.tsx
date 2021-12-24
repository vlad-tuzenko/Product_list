import React from 'react';
import { Product } from '../types';

import './ProductItem.scss';

type Props = {
  product: Product
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const commentsLength = product.comments.length;

  return (
    <li className="Product">
      <h3 className="Product__title">{product.name}</h3>
      <img className="Product__img" src={product.imageUrl} alt={product.name} />
      <p className="Product__count">{`Count: ${product.count}`}</p>
      <span>{`Size: ${product.size.height} x ${product.size.width}`}</span>
      <span>{`Weight: ${product.weight}`}</span>
      <div className="Product__comments-title">
        Comments:
        <div className="Product__comments">
          {
            commentsLength !== 0
              ? `${commentsLength} comments`
              : 'There is no comments yet'
          }
        </div>
      </div>
    </li>
  );
};
