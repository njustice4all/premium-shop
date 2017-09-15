import React from 'react';
// import classNames from 'classnames';
// import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header__nav">
      {/*<div
        // to="/franchise/addShop"
        // className="header__nav__link"
        // activeClassName="on"
        className={classNames('header__nav__link', {
          on: window.location.pathname === '/franchise/addShop' ? true : false,
        })}
      >
        1. 가맹점 등록
      </div>
      <div
        // to="/franchise/addProducts"
        // className="header__nav__link"
        // activeClassName="on"
        className={classNames('header__nav__link', {
          on: window.location.pathname === '/franchise/addProducts' ? true : false,
        })}
      >
        2. 판매 상품 등록
      </div>*/}
      <div className="header__nav__link" style={styles.textWrapper}>
        <span>{window.location.pathname === '/franchise/addShop' ? '가맹점 등록' : '판매 상품 등록'}</span>
      </div>
    </header>
  );
};

export default Header;

const styles = {
  textWrapper: {
    flex: 1,
    backgroundColor: '#222831',
    color: '#ffffff',
    height: '65px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '20px',
  },
};
