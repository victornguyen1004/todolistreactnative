import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        todos.unshift({
          id: doc.id,
          heading,
        });
      });
      setTodos(todos);
    });
  }, []);

  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          navigation.navigate("Login");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm ghi chú..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        style={{ marginBottom: 76 }}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.container}
              onPress={() => navigation.navigate("Detail", { item })}
            >
              <View style={styles.todoContainer}>
                <Text
                  style={styles.todoText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
              <FontAwesome
                name="trash-o"
                color="#E61d1e"
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
            </Pressable>
          </View>
        )}
      />
      <Pressable onPress={() => handleSignOut()} style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  todoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 2,
  },
  todoText: {
    fontWeight: "500",
    fontSize: 20,
  },

  input: {
    height: 48,
    fontSize: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  button: {
    height: 47,
    borderRadius: 16,
    backgroundColor: "#63b155",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  todoIcon: {
    fontSize: 28,
    padding: 8,
  },
  logoutContainer: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#E61d1e",
    marginBottom: 12,
    borderRadius: 16,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    bottom: 0,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
