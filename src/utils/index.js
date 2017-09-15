export default () => {
  // return localStorage.getItem('email') ? true : false;
  return document.cookie.split('email=')[1] ? true : false;
};
