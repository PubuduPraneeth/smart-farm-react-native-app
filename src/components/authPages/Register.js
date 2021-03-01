import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { Feather } from "@expo/vector-icons";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userRegister } from "../../redux/actions/userRegister";

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  text: {
    paddingTop: 10,
    marginLeft: 28,
  },

  text1: {
    paddingTop: 100,
    fontSize: 18,
  },

  image1: {
    paddingLeft: 160,
    paddingTop: 70,
  },

  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingRight: 50,
    marginBottom: 30,
  },

  row2: {
    marginTop: -50,
    flexDirection: "column",
    alignItems: "flex-end",
    height: 20,
    marginRight: 230,
    paddingBottom: 300,
  },

  centerView: {
    paddingTop: 70,
    paddingLeft: 40,
  },

  inputWrap: {
    flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingTop: 30,
  },

  txtinput: {
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    fontSize: 18,
  },

  link1: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  link2: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 22,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 100,
    marginLeft: 172,
    marginBottom: 100,
    marginTop: 30,
  },
});

const Register = ({
  registerError,
  registerSuccess,
  userRegister,
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setloading] = useState(false);

  const onSignUp = () => {
    userRegister({ firstName, lastName, email, password });
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    // if (registerError) {
    //   alert(registerError);
    //   setloading(false);
    // }

    // if (registerSuccess) {
    //   alert(registerSuccess);
    //   setloading(false);
    // }

    // if (!registerSuccess && !registerError) {
    //   setloading(true);
    // }
  };

  if (loading) {
    return (
      <View style={[styles.spinnerContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <TopHeaderWithGoBack
        title={"Register"}
        navigationFunc={navigation.goBack}
      />
      <View>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity>
          <View style={styles.image1}>
            <Feather name="user" size={50} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.centerView}>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput style={styles.txtinput} placeholder="First name" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput style={styles.txtinput} placeholder="Last name" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput style={styles.txtinput} placeholder="Email" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput style={styles.txtinput} placeholder="Password" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput style={styles.txtinput} placeholder="Confirm password" />
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <TouchableOpacity style={styles.submitContainer}>
              <Text style={styles.link1}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row2}>
          <TouchableOpacity style={styles.submitContainer}>
            <Text style={styles.link2}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </KeyboardAvoidingView>
    // <View style={{ backgroundColor: "white" }}>
    //   <TopHeaderWithGoBack
    //     title={"Register"}
    //     navigationFunc={navigation.goBack}
    //   />
    //   <TextInput
    //     value={firstName}
    //     placeholder="First name"
    //     onChangeText={(firstName) => setFirstName(firstName)}
    //   />
    //   <TextInput
    //     value={lastName}
    //     placeholder="Last name"
    //     onChangeText={(lastName) => setLastName(lastName)}
    //   />
    //   <TextInput
    //     value={email}
    //     placeholder="Email"
    //     onChangeText={(email) => setEmail(email)}
    //   />
    //   <TextInput
    //     value={password}
    //     placeholder="Password"
    //     secureTextEntry={true}
    //     onChangeText={(password) => setPassword(password)}
    //   />
    //   <TextInput
    //     value={confirmPassword}
    //     placeholder="Confirm password"
    //     secureTextEntry={true}
    //     onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
    //   />
    //   <Button
    //     onPress={() => {
    //       onSignUp();
    //     }}
    //     title="SIgn Up"
    //   />
    // </View>
  );
};

const mapStateToProps = (store) => ({
  registerError: store.userReducer.registerError,
  registerSuccess: store.userReducer.registerSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userRegister }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Register);

// class Register extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       eamil: "",
//       password: "",
//       confirmPassword: "",
//     };

//     this.onSignUp = this.onSignUp.bind(this);
//   }

//   async onSignUp() {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//     } = this.state;

//     console.log(`${firstName}${lastName}${email}${password}${confirmPassword}`);

//     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//     const data = {
//       firstName,
//       lastName,
//       email,
//       password,
//       createdAt: timestamp,
//     };

//     firebase;
//     //   .firestore()
//     //   .collection("tempUser")
//     //   .set(data)
//     //   .then((data) => {
//     //     //setEntityText("");
//     //     //Keyboard.dismiss();
//     //     console.log(data);
//     //     alert(data);
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });

//     firebase
//       .firestore()
//       .collection("tempUser")
//       .get()
//       .then((data) => {
//         console.log("data", data.data());
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });

//     // await firebase
//     //   .database()
//     //   .ref("Users/")
//     //   .push({
//     //     firstName,
//     //     lastName,
//     //     email,
//     //     password,
//     //   })
//     //   .then((data) => {
//     //     //success callback
//     //     console.log("data ", data);
//     //   })
//     //   .catch((error) => {
//     //     //error callback
//     //     console.log("error ", error);
//     //   });

//     // firebase
//     //   .database()
//     //   .ref("Users/")
//     //   .once("value", function (snapshot) {
//     //     console.log(snapshot.val());
//     //   });

//     // firebase.database().ref("Users/").remove();
//   }

//   render() {
//     const { navigation } = this.props;

//     return (
//       <View>
//         <TextInput
//           placeholder="First name"
//           onChangeText={(firstName) => this.setState({ firstName })}
//         />
//         <TextInput
//           placeholder="Last name"
//           onChangeText={(lastName) => this.setState({ lastName })}
//         />
//         <TextInput
//           placeholder="Email"
//           onChangeText={(email) => this.setState({ email })}
//         />
//         <TextInput
//           placeholder="Password"
//           secureTextEntry={true}
//           onChangeText={(password) => this.setState({ password })}
//         />
//         <TextInput
//           placeholder="Confirm password"
//           secureTextEntry={true}
//           onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
//         />
//         <Button onPress={() => this.onSignUp()} title="SIgn Up" />
//       </View>
//     );
//   }
// }

// export default function (props) {
//   const navigation = useNavigation();

//   return <Register {...props} navigation={navigation} />;
// }