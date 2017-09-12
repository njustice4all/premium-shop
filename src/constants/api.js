const API = `http://localhost:7749/send`;

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
