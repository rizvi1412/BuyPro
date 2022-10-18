import AsyncStorage from '@react-native-async-storage/async-storage';

const storeKey = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    // saving error
  }
};

class _AuthService {
  login = async (username = 'kminchelle', password = '0lelplR') => {
    return fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    })
      .then(res => res.json())
      .then(res => {
        storeKey(res);
        return res;
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };
}

const AuthService = new _AuthService();
export default AuthService;
