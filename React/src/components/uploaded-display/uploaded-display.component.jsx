import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../components/collection-item/collection-item.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

const Display = ({ item, onclick }) => {
  const { Image, Website, desc, price } = item;
  return (
    <div className='collection-item'>
        <div
          className='image'
          style={{
            backgroundImage: `url(${Image})`
          }}
        />
      <div className='collection-footer'>
        <span className='name'>{desc}</span>
        <span className='price'>{price}</span>
      </div>
        <CustomButton onClick={() => onclick(Website)} inverted>
            Visit Site
        </CustomButton>
    </div>
  );
};


export default withRouter(Display);
