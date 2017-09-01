import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header__nav">
      <NavLink
        to="/franchise/addShop"
        className="header__nav__link"
        activeClassName="on"
      >
        1. 가맹점 등록
      </NavLink>
      <NavLink
        to="/franchise/addProducts"
        className="header__nav__link"
        activeClassName="on"
      >
        2. 판매 상품 등록
      </NavLink>
    </header>
  );
};

export default Header;
