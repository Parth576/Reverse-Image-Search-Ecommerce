import React from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
// import { ReactComponent as Logo } from '../../assests/crown.svg';

import { ReactComponent as Logo } from './../../assets/crown.svg';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from './../../redux/cart/cart.selectors';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { toggleCartHidden } from './../../redux/cart/cart.actions';



import './header.styles.scss';

import {auth} from '../../firebase/firebase.utils';
import SearchBox from "../search-box/search-box.component";
import CartIcon from '../cart-icon/cart-icon.component';  
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer,OptionLink } from './header.styles';
const Header = ({ currentUser, hidden, handleChange, dispatch }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <SearchBox placeholder='Search Products' handleChange={handleChange}/>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {
        currentUser?
            ( hidden ?
            <OptionLink as='div' onClick={() => {
                    auth.signOut();
                }}>SIGN OUT
            </OptionLink>
            :
            <OptionLink as='div' onClick={() => {
                auth.signOut();
                dispatch(toggleCartHidden())
            }}>SIGN OUT
            </OptionLink>
            )
        :
        <Link className='option' to='/signin'>SIGN IN</Link>
      }
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown />}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
