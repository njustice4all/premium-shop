const API = ``;

export const apiAddProducts = (data) => {
  return fetch(`${API}`, {
    // headers: new Headers({
    //   'Accept-Language': 'en-US'
    // }),
    method: 'POST',
    body: data
  });
};
