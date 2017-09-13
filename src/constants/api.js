const API = 'http://api.aty.kr';

export const apiSignup = (user) => {
  return fetch(`${API}/sale/memberJoin`, {
    headers: new Headers({
      'Accept': 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  });
}

export const apiSignin = (user) => {
  return fetch(`${API}/sale/memberLogin`, {
    headers: new Headers({
      'Accept': 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  });
}

export const apiAddShop = (shop) => {
  return fetch(`${API}/sale/addShop`, {
    headers: new Headers({
      'Accept': 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      shop: shop
    })
  });
};

export const apiAddProducts = (products) => {
  return fetch(`${API}/sale/addProducts`, {
    headers: new Headers({
      'Accept': 'application/json',
    }),
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      products: products.products,
      seq: products.seq
    })
  });
};
