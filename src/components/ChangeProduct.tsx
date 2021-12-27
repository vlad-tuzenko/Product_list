import React from 'react';
import { Product } from '../types';
import './NewProduct.scss';

type Props = {
  product: Product;
  onCancel():void;
  changeProduct(product:Product):void;
};

type State = {
  changedProduct: Product;
};

export class ChangeProduct extends React.Component<Props, State> {
  state: State = {
    changedProduct: {
      id: this.props.product.id,
      imageUrl: this.props.product.imageUrl,
      name: this.props.product.name,
      count: this.props.product.count,
      size: {
        width: this.props.product.size.width,
        height: this.props.product.size.height,
      },
      weight: this.props.product.weight,
      comments: this.props.product.comments,
    },
  };

  handleChange = (
    event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'width' || name === 'height') {
      this.setState(state => ({
        changedProduct: {
          ...state.changedProduct,
          size: {
            ...state.changedProduct.size,
            [name]: +value,
          },
        },
      }));
    } else {
      this.setState(state => ({
        changedProduct: {
          ...state.changedProduct,
          [name]: value,
        },
      }));
    }
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.changeProduct(this.state.changedProduct);
  };

  render(): React.ReactNode {
    const {
      name, imageUrl, id, count, weight, comments,
    } = this.state.changedProduct;
    const { width, height } = this.state.changedProduct.size;

    return (
      <div className="NewProduct">
        Change selected product
        <form className="NewProduct__form" onSubmit={this.handleSubmit}>
          <label htmlFor="name-input" className="NewProduct__label">
            Type name of the product:
            <input
              className="NewProduct__input"
              type="text"
              id="name-input"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </label>

          <label htmlFor="imgUrl-input" className="NewProduct__label">
            Type link to the product image:
            <input
              className="NewProduct__input"
              type="text"
              id="imgUrl-input"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleChange}
              required
            />
          </label>

          <label htmlFor="id-input" className="NewProduct__label">
            Type id of the product:
            <input
              className="NewProduct__input"
              type="number"
              id="id-input"
              name="id"
              value={id}
              onChange={this.handleChange}
              disabled
            />
          </label>

          <label htmlFor="count-input" className="NewProduct__label">
            Type count of the product:
            <input
              className="NewProduct__input"
              type="number"
              id="count-input"
              name="count"
              value={count}
              onChange={this.handleChange}
              required
            />
          </label>

          <label htmlFor="weight-input" className="NewProduct__label">
            Type weight of the product in gr:
            <input
              className="NewProduct__input"
              type="number"
              id="weight-input"
              name="weight"
              value={weight}
              onChange={this.handleChange}
              required
            />
          </label>

          <p>
            Type size of the product:
            <label htmlFor="width-input" className="NewProduct__label">
              Width:
              <input
                className="NewProduct__input"
                type="number"
                id="width-input"
                name="width"
                value={width}
                onChange={this.handleChange}
                required
              />
            </label>

            <label htmlFor="height-input" className="NewProduct__label">
              Height:
              <input
                className="NewProduct__input"
                type="number"
                id="height-input"
                name="height"
                value={height}
                onChange={this.handleChange}
                required
              />
            </label>
          </p>

          <label htmlFor="comment-input" className="NewProduct__label">
            Add comment for the product:
            <textarea
              className="NewProduct__input"
              id="comment-input"
              name="comments"
              onChange={this.handleChange}
            />
          </label>

          <button type="submit">Change this product</button>
          <button type="button" onClick={this.props.onCancel}>Cancel</button>
          {comments}
        </form>
      </div>
    );
  }
}
