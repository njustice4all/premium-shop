// export { default as initSignin } from './authentication';
// export { default as initSignup } from './authentication';
// export { default as initUpload } from './upload';
// export { default as initAddShop } from './franchise';
// export { default as initAddProducts } from './franchise';
import { initSignin, initSignup } from './authentication';
import { initUpload } from './upload';
import { initAddShop, initAddProducts } from './franchise';
import { initGetShopLists } from './franchiseLists';

export {
  initSignin,
  initSignup,
  initUpload,
  initAddShop,
  initAddProducts,
  initGetShopLists,
};
