import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { app } from "../config";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const navigation = useNavigation();

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formLogin}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.text}>Email đăng nhập</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder={"Email đăng nhập..."}
        />
        <Text style={styles.text}>Mật khẩu</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          placeholder={"Mật khẩu..."}
        />

        <Pressable style={styles.buttonLogin} onPress={() => handleSignin()}>
          <Text style={styles.textButton}>Đăng nhập</Text>
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Text>Chưa có tài khoản?</Text>
          <Pressable
            style={styles.signupContainer}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.signupText}>Tạo tài khoản mới</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  formLogin: {
    flex: 1,
    margin: 12,
  },
  logo: {
    flex: 0.5,
    width: null,
    height: null,
    resizeMode: "contain",
    marginBottom: 24,
  },
  text: {
    fontSize: 20,
    marginLeft: 16,
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    fontSize: 20,
    marginBottom: 24,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  signupContainer: {
    padding: 8,
  },
  signupText: {
    fontSize: 20,
    color: "#227C70",
    fontWeight: "bold",
  },
  buttonLogin: {
    backgroundColor: "#63b155",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "600",
    marginBottom: 24,
  },
});
