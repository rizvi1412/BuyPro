import React, { useEffect } from "react";
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authActionCreators } from "../redux-saga";
import { Loader } from "../components/Loader";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const authenticated = useSelector(state => state.auth.authenticated);
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      navigation.replace("NavigationDrawer");
    }
  }, [authenticated]);

  const login = async () => {
    try {
      dispatch(
        authActionCreators.performLogin({
          username,
          password,
          onFailure: error => {
            alert(error);
          },
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: "30%" }}>
      <SafeAreaView>
        <Text style={styles.titleText}>BuyPro</Text>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          textContentType={"password"}
        />
        <Button
          title={"Login"}
          onPress={() => {
            login();
          }}
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 66,
    fontWeight: "500",
    textAlign: "center",
    margin: 10,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default LoginScreen;
