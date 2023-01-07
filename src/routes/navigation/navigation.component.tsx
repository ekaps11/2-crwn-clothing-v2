import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/images/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {
  NavigationContainer,
  Navlinks,
  Navlink,
  Logo,
} from './navigation.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import { selectCartToggler } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const isCartOpen = useSelector(selectCartToggler);

  const handleSignOut = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to="">
          <CrwnLogo />
        </Logo>

        <Navlinks>
          <Navlink to="shop">SHOP</Navlink>

          {currentUser ? (
            <Navlink to="auth" onClick={handleSignOut}>
              SIGN OUT
            </Navlink>
          ) : (
            <Navlink to="auth">SIGN IN</Navlink>
          )}

          <CartIcon />
        </Navlinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
