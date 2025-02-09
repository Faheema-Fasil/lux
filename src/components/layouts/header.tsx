'use client';

import React, { Fragment, useEffect, useState } from 'react';
import AccountDrawer from './account-drawer';
import NavBar from './nav-bar';
import { fetchCartData } from '@/redux/store/cart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import CartDrawer from './cart-drawer';
import { getCartKey, getToken, setCartKey } from '@/storage';
import { useProductImageContext } from '../context/product-image-context';
import MobileSidebar from './mobile-nav';

const Header = ({ menu, footerData }: any) => {
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const { setItems } = useProductImageContext();
  const dispatch: AppDispatch = useDispatch();

  const { about } = footerData;



  // Sync cart items with the product image context
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  // Fetch cart data on initial load
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // Utility function to toggle drawers and prevent body scroll
  const toggleDrawer = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => {
      if (!prev) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      return !prev;
    });
  };

  return (
    <Fragment>
      <NavBar
        toggleAccountDrawer={() => toggleDrawer(setIsAccountDrawerOpen)}
        menu={menu}
        about={about}
        toggleCartDrawer={() => toggleDrawer(setIsCartDrawerOpen)}
        toggleMobileNavbarDrawer={() => toggleDrawer(setIsMobileNavbarOpen)}
      />
      <MobileSidebar
        menu={menu}
        isMobileNavbarOpen={isMobileNavbarOpen}
        toggleMobileNavbarDrawer={() => toggleDrawer(setIsMobileNavbarOpen)}
      />
      <AccountDrawer
        isOpen={isAccountDrawerOpen}
        toggleAccountDrawer={() => toggleDrawer(setIsAccountDrawerOpen)}
      />
      <CartDrawer
        toggleCartDrawer={() => toggleDrawer(setIsCartDrawerOpen)}
        isCartDrawerOpen={isCartDrawerOpen}
      />
    </Fragment>
  );
};

export default Header;
