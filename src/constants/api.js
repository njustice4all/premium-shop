const API = 'http://van.aty.kr/vanapi';
const URL = 'http://www.juso.go.kr/addrlink/addrLinkApi.do';
const KEY = 'U01TX0FVVEgyMDE3MTEwNzE3MTgwMjEwNzQ2MzY=';

export const apiAddress = query => {
  return fetch(
    `${URL}?currentPage=1&countPerPage=10&keyword=${query}&confmKey=${KEY}&resultType=json`
  );
};

export const apiLoadMoreAddress = (query, page = 1) => {
  return fetch(
    `${URL}?currentPage=${page}&countPerPage=10&keyword=${query}&confmKey=${KEY}&resultType=json`
  );
};

export const apiSignup = user => {
  return fetch(`${API}/memberJoin`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
};

export const apiSignin = user => {
  return fetch(`${API}/memberLogin`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
};

export const apiAddShop = (shop, seq) => {
  return fetch(`${API}/addShop`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      shop: shop,
    }),
  });
};

export const apiAddProducts = products => {
  return fetch(`${API}/addProducts`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      products: products.products,
      seq: products.seq,
    }),
  });
};

export const apiGetShopLists = seq => {
  return fetch(`${API}/getShopList`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      member_seq: seq,
    }),
  });
};

export const apiSetShop = shop => {
  return fetch(`${API}/setShop`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      shop: shop,
    }),
  });
};

export const apiGetProducts = shopSequence => {
  return fetch(`${API}/getProductList`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      shop_seq: shopSequence,
    }),
  });
};

export const apiSetProducts = products => {
  return fetch(`${API}/setProduct`, {
    headers: new Headers({
      Accept: 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ ...products }),
  });
};
