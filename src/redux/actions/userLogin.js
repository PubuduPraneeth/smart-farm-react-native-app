import { USER_LOGIN, USER_LOGIN_ERROR, LOADING } from "../constants";
import firebase from "firebase";

export const userLogin = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    //user login
    const db = firebase.firestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        if (results) {
          dispatch({
            type: USER_LOGIN_ERROR,
            payload: null,
          });
          //stre current user
          db.collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((documentSnapshot) => {
              //console.log("User exists: ", documentSnapshot.exists);

              if (documentSnapshot.exists) {
                //console.log("User data: ", documentSnapshot.data());
                dispatch({
                  type: LOADING,
                  payload: false,
                });
                dispatch({
                  type: USER_LOGIN_ERROR,
                  payload: null,
                });
                dispatch({
                  type: USER_LOGIN,
                  payload: documentSnapshot.data(),
                });
              }
            })
            .catch((error) => {
              console.error(error);
              dispatch({
                type: LOADING,
                payload: false,
              });
              dispatch({
                type: USER_LOGIN_ERROR,
                payload: error,
              });
            });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: error,
        });

        // if (error.code === "auth/email-already-in-use") {
        //   dispatch({
        //     type: USER_LOGIN_ERROR,
        //     payload: "That email address is already in use!",
        //   });
        //   console.log("That email address is already in use!");
        // }

        // if (error.code === "auth/invalid-email") {
        //   dispatch({
        //     type: USER_LOGIN_ERROR,
        //     payload: "That email address is invalid!",
        //   });
        //   console.log("That email address is invalid!");
        // }
        // if (error.code === "The email address is badly formatted") {
        //   dispatch({
        //     type: USER_LOGIN_ERROR,
        //     payload: "The email address is badly formatted",
        //   });
        //   console.log("The email address is badly formatted");
        // }
        console.error(error);
      });
  };
};

export const checkLoginState = () => {
  const db = firebase.firestore();
  return (dispatch) => {
    // dispatch({
    //   type: LOADING,
    //   payload: true,
    // });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // dispatch({
        //   type: LOADING,
        //   payload: false,
        // });
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: null,
        });
        //stre current user
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((documentSnapshot) => {
            //console.log("User exists: ", documentSnapshot.exists);

            if (documentSnapshot.exists) {
              //console.log("User data: ", documentSnapshot.data());
              // dispatch({
              //   type: LOADING,
              //   payload: false,
              // });
              dispatch({
                type: USER_LOGIN_ERROR,
                payload: null,
              });
              dispatch({
                type: USER_LOGIN,
                payload: documentSnapshot.data(),
              });
            }
          })
          .catch((error) => {
            console.error(error);
            // dispatch({
            //   type: LOADING,
            //   payload: false,
            // });
          });
      } else {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: false,
        });
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .auth()
      .signOut()
      .then((data) => {
        dispatch({
          type: USER_LOGIN,
          payload: null,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("sign out new user successfull");
      })
      .catch((err) => {
        console.log("sign out error", err);
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };
};