import * as firebase from "firebase/app";
import 'firebase/auth'

const onLogin = (user) => {
    localStorage.setItem('user', user);
}

export const logged_in = (email, password) => {

    try {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                onLogin(res.user.email)

                try {
                    window.location.pathname = '/'
                } catch(err) {
                    alert("fail to redirect", err.message)
                }
            })
            .catch(error => {
                localStorage.setItem('errorMessage', error.message);
            });

    } catch (error) {
        console.log(error.toString());
    }

};