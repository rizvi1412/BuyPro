import AsyncStorage from '@react-native-async-storage/async-storage';

const storeKey = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

class _ProductService {
  getProducts = async (skip = 0) => {
    return fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`).then(
      async response => {
        return await response.json();
      },
    );
  };

  searchProducts = async query => {
    return fetch('https://dummyjson.com/products/search?q=' + query).then(
      async response => {
        return await response.json();
      },
    );
  };

  fetchSingleProduct = async id => {
    return fetch(`https://dummyjson.com/products/${id}`).then(
      async response => {
        return await response.json();
      },
    );
  };
}

const ProductService = new _ProductService();
export default ProductService;
