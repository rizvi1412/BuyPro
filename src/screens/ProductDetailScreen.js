import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductService from '../services/ProductService';
import {Loader} from '../components/Loader';

const ProductDetailScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchSingle();
  }, []);

  const fetchSingle = async () => {
    try {
      setLoading(true);
      const response = await ProductService.fetchSingleProduct(
        route.params.productId,
      );
      setItem(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: 'black'}}
          pagingEnabled={true}
          horizontal={true}
          scrollEventThrottle={16}>
          {item.images.map(image => {
            return (
              <Image
                style={{
                  width: Dimensions.get('window').width,
                  height: 'auto',
                  backgroundColor: 'silver',
                }}
                source={{uri: image}}
                resizeMode={'stretch'}
              />
            );
          })}
        </ScrollView>
        <ScrollView style={{padding: 10}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.discountPercentage}>
            Discount Offer {item.discountPercentage}%
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.price}>Price {item.price}$</Text>
            <Text style={styles.rating}>Rating {item.rating} </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.brandCat}>Brand </Text>
              <Text style={styles.brandCat}>{item.brand}</Text>
            </View>
            <View>
              <Text style={styles.brandCat}>Category </Text>
              <Text style={styles.brandCat}> {item.category}</Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.stock,
              color: item.stock > 0 ? '#ac2a2a' : '#c71313',
            }}>
            {item.stock > 0 ? `In Stock ${item.stock}` : 'Out of Stock'}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 28,
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
    color: '#ff7c40',
    paddingVertical: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b6c05',
    paddingVertical: 10,
  },
  stock: {
    fontSize: 46,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 20,
    textTransform: 'capitalize',
  },
});

export default ProductDetailScreen;
