import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/images/crown.svg';
import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from '../../components/contexts/cart-context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {
  NavigationContainer,
  Navlinks,
  Navlink,
  Logo,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const handleSignOut = () => {
    signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to="">
          <CrwnLogo />
        </Logo>

        <Navlinks>
          <Navlink to="shop">SHOP</Navlink>

          <Navlink to="contact">CONTACT</Navlink>

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
