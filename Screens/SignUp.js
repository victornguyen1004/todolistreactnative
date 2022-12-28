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
  createUserWithEmailAndPassword,
} from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Đã tạo tài khoản!");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formLogin}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <Text style={styles.title}>Tạo tài khoản mới</Text>
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

        <Pressable style={styles.buttonLogin} onPress={() => handleCreateAccount()}>
          <Text style={styles.textButton}>Đăng ký</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

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
  title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "600",
    marginBottom: 24,
  },
  text: {
    fontSize: 20,
    marginLeft: 16,
    marginBottom: 12,
    fontWeight: "500",
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
  buttonSignup: {
    backgroundColor: "#589BB1",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
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
});
