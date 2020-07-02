import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem ,history, match, title }) => {
  const collectionId = title.toLowerCase();
  const { name, price, imageUrl, id } = item;
  return (
    <div className='collection-item'>
      { match.params.collectionId ?
          <div
          className='image'
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
          onClick={() => history.push(`${match.url}/${id}`)}
        />
        :
        <div
          className='image'
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
          onClick={() => history.push(`${match.url}/${collectionId}/${id}`)}
        />
      }
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CollectionItem));
