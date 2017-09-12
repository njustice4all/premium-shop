const API = `http://api.aty.kr`;

export const apiSignup = (user) => {
  return fetch(`${API}/sale/memberJoin`, {
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
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  });
}

export const apiAddShop = (data) => {
  return fetch(`${API}`, {
    // headers: new Headers({
    //   'Accept-Language': 'en-US'
    // }),
    method: 'POST',
    body: data
  });
};

export const apiAddProducts = (data) => {
  return fetch(`${API}`, {
    // headers: new Headers({
    //   'Accept': 'application/json, text/plain, */*',
    //   'Content-Type': 'application/json'
    // }),
    method: 'POST',
    body: data
  });
};
