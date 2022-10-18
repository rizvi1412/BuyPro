import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Loader} from '../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {productActionCreators} from '../redux-saga';
import {SearchInput} from '../components/SearchInput';

const HomeScreen = ({navigation}) => {
  const [text, setText] = React.useState('');
  const isLoading = useSelector(state => state.products.isLoading);
  const moreLoading = useSelector(state => state.products.moreLoading);
  const products = useSelector(state => state.products.products);
  const totalProducts = useSelector(state => state.products.total);
  const currentSkip = useSelector(state => state.products.skip);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActionCreators.fetchProducts({skip: 0}));
  }, []);

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetailScreen', {productId: item.id});
      }}>
      <View style={styles.item}>
        <Text style={styles.rating}>Rating {item.rating}</Text>
        <Image
          source={{uri: item.thumbnail, height: 200}}
          resizeMode={'contain'}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price {item.price}$</Text>
        <Text style={styles.discountPercentage}>
          Discount Offer {item.discountPercentage}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {moreLoading ? (
          <ActivityIndicator color="black" style={{marginLeft: 8}} />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput />
      {isLoading && <Loader />}
      <FlatList
        data={products}
        renderItem={renderItem}
        onEndReached={() => {
          if (currentSkip + 10 < totalProducts) {
            dispatch(productActionCreators.loadMore());
          }
        }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item?.id}
        ListEmptyComponent={() => {
          return <Text style={{textAlign: 'center'}}>No Results</Text>;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
    paddingVertical: 10,
  },
  brandCat: {
    fontSize: 18,
    color: '#42403f',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#42403f',
    paddingBottom: 10,
    textTransform: 'capitalize',
  },
  discountPercentage: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f6f2f2',
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#ff7c40',
  },
  image: {
    fontSize: 16,
    color: '#42403f',
    paddingVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f80000',
    paddingVertical: 10,
    textAlign: 'right',
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b6c05',
    paddingVertical: 10,
    textAlign: 'right',
  },
  stock: {
    fontSize: 46,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 20,
    textTransform: 'capitalize',
  },
});

export default HomeScreen;
