import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

import './custom-buttom.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      isGoogleSignIn ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

// const CustomButton = ({children,props}) => (
//   <CustomButtonContainer {...props}>
//     {children}
//   </CustomButtonContainer>
// );
export default CustomButton;
