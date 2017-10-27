import { List, Map, fromJS } from 'immutable';

const validateText = text => (text.trim().length > 0 ? true : false);

export const validateState = state => {
  const errors = [];
  const possible = state.possible.filter(item => item.get('isChecked'));

  if (state.images.size === 0) errors.push('images');
  if (!validateText(state.category)) errors.push('category');
  if (!validateText(state.name)) errors.push('name');
  if (!validateText(state.description)) errors.push('description');
  if (!validateText(state.address.get('zipCode'))) errors.push('address');
  if (!validateText(state.contact)) errors.push('contact');
  if (!validateText(state.openingHours)) errors.push('openingHours');
  if (!validateText(state.closeDays)) errors.push('closeDays');
  if (possible.size === 0) errors.push('possible');

  return { errors, possible };
};

export const createUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const convertUrlToBase64 = (images, onResult) => {
  for (let i = 0; i < images.length; i++) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onResult({
          base64: reader.result,
          seq: images[i].seq,
          imageName: images[i].imageName,
        });
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', `http://van.aty.kr/image/${images[i].imageName}`);
    xhr.responseType = 'blob';
    xhr.send();
  }
};

export const convertoDataToState = products => {
  let result = List([]);
  products.forEach((product, index) => {
    result = result.push(
      Map({
        title: product.title,
        price: product.price,
        contents: product.contents,
        productSequence: product.seq,
        images: fromJS(product.image),
        deleteImages: List([]),
        addImages: List([]),
        options: List([]),
      })
    );
  });

  return result;
};

const getModifyImages = images => {
  let modifyImages = List([]);
  images.forEach(image => {
    if (image.get('modified')) {
      modifyImages = modifyImages.push(
        Map({
          image: image.get('image'),
          imageName: image.get('imageName'),
          imageType: image.get('imageType'),
        })
      );
    }
  });

  return modifyImages;
};

export const getModifyProducts = products => {
  let modifyProducts = List([]);
  products.forEach(product => {
    modifyProducts = modifyProducts.push(
      Map({
        seq: product.get('productSequence'),
        title: product.get('title'),
        price: product.get('price'),
        contents: product.get('contents'),
        option: product.get('options'),
        addImages: product.get('addImages'),
        deleteImages: product.get('deleteImages'),
      })
    );
  });

  return modifyProducts;
};
