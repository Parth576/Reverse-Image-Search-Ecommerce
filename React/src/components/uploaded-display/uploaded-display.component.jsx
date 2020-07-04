// import React from 'react';


// import CustomButton from '../custom-button/custom-button.component';


import '../../components/collection-item/collection-item.styles.scss';

// const Display = ({ imageUrl }) => {
//   return (
//     <div className='collection-item'>
//         <div
//           className='image'
//           style={{
//             backgroundImage: `url(${imageUrl})`
//           }}
//         //   onClick={() => history.push(`${match.url}/${id}`)}
//         />
//       {/* <div className='collection-footer'>
//         <span className='name'>{name}</span>
//         <span className='price'>${price}</span>
//       </div> */}
//       <CustomButton inverted>
//         Visit Site
//       </CustomButton>
//     </div>
//   );
// };

// export default Display;

import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
// import { addItem } from '../../redux/cart/cart.actions';

// import './collection-item.styles.scss';

const Display = ({ item }) => {
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
        <CustomButton inverted>
          <a href={Website}>
            Visit Site
          </a>
        </CustomButton>
    </div>
  );
};


export default withRouter(Display);
