export default () => {
  return localStorage.getItem('email') ? true : false;
};
