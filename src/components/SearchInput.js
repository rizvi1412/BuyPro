import React, {useCallback} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {productActionCreators} from '../redux-saga';
import {debounce} from 'lodash';
import {useDispatch} from 'react-redux';

export const SearchInput = ({}) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const searchProducts = async query => {
    if (query === '') {
      dispatch(productActionCreators.fetchProducts({skip: 0}));
    } else {
      dispatch(productActionCreators.searchProduct({query}));
    }
  };
  const debounceSearch = useCallback(
    debounce(val => {
      searchProducts(val);
    }, 2000),
    [],
  );

  const onChange = event => {
    setText(event);
    debounceSearch(event);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder={'Search'}
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
