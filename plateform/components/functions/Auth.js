import * as firebase from "firebase/app";
import 'firebase/auth'

const onLogin = (user) => {
    localStorage.setItem('user', user);
}

const saveUserFirebase = (user) => {

    const rootReference = firebase.database().ref();
    const usersReference = rootReference.child("users");

    firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
            let newUserInstance = usersReference.child(user.uid);
            newUserInstance.set(user);
        }
    });

};

const onSignOut = () => localStorage.removeItem('user');

export const _logout = () => {
    try {
        firebase.auth()
            .signOut()
            .then(_ => {
                onSignOut()
            }).catch(error => {
                alert(error.message);
            });
    } catch (error) {
        console.log(error.toString());
    }
};

export const sign_up = (firstName, lastName, email, password) => {

    try {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {

                let newUser = {
                    uid: res.user.uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                };

                saveUserFirebase(newUser)
            })
            .catch(error => {
                alert(error.message);
            });
    } catch (error) {
        console.error(error.toString());
    }

};

export const logged_in = (email, password) => {

    try {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                onLogin(res.user.email)
            })
            .catch(error => {
                localStorage.setItem('errorMessage', error.message);
            });

    } catch (error) {
        console.error(error.toString());
    }

};