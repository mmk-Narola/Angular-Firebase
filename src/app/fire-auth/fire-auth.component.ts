import { Component, OnInit } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithRedirect,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  getRedirectResult,
} from '@angular/fire/auth';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fire-auth',
  templateUrl: './fire-auth.component.html',
  styleUrls: ['./fire-auth.component.scss'],
})
export class FireAuthComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(public auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        console.log(user.email);

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  createUserWithEmailAndPassword() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        alert(errorMessage);
        // ..
      });

    this.email = '';
    this.password = '';
  }

  signInWithEmailAndPassword() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

    this.password = '';
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  passwordResetEmail() {
    sendPasswordResetEmail(this.auth, 'mmk@narola.email')
      .then((res) => {
        console.log(res);
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signInWithRedirect() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider)
      .then(
        (c) => this.getRedirect()
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // if (credential != null) {
        //   const token = credential.accessToken;
        // }
      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  getRedirect() {
    return getRedirectResult(this.auth, new GoogleAuthProvider()).then((a) =>
      console.log(a)
    );
    // return getRedirectResult().
  }

  confirmPasswordReset() {}

  signOut() {
    signOut(this.auth)
      .then(() => {
        console.log('signOut');
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  }
}

/*    

   onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        console.log(user.email);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
*/
