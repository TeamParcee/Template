import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ResourceLoader } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
  ) {


  }


  public user = firebase.auth().currentUser;



  addDocument(col, obj) {

    return new Promise((resolve) => {
      let id = firebase.firestore().collection(col).doc().id;
      let o = { ...obj }
      o.id = id;
      return firebase.firestore().doc(col + "/" + id).set(o).then(() => {
        resolve()
      }).catch((e) => {
        console.log(e)
      })
    })
  }

  setDocument(doc, obj) {

    return new Promise((resolve) => {
      firebase.firestore().doc(doc).set(obj).then(() => {
        resolve()
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  updateDocument(doc, obj) {

    return new Promise((resolve) => {
      firebase.firestore().doc(doc).update(obj).then(() => {
        resolve()
      }).catch((e) => {
        console.log(e)
      })
    })
  }


  deleteDocument(doc) {
    return new Promise((resolve) => {
      firebase.firestore().doc(doc).delete().then(() => {
        resolve()
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  getDocument(doc) {
    return new Promise((resolve) => {
      return firebase.firestore().doc(doc).get().then((snapshot) => {
        return resolve(snapshot.data())
      })
    }).catch((e) => {
      console.log(e)
    })
  }


  loginEmail(email, password) {
    return new Promise((resolve) => {
      return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
        return resolve(result.user)
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  createAccountEmail(email, password, displayName, photoURL) {
    return new Promise((resolve) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        result.user.updateProfile({
          displayName: displayName,
          photoURL: photoURL,
        })
      }).then(() => {
        return resolve()
      }).catch((e) => {
        console.log(e)
      })
    })
  }
  getUserData(uid) {
    return new Promise((resolve) => {
      return firebase.firestore().doc("users/" + uid).get().then((snap) => {
        return snap.data()
      }).catch((e) => {
        console.log(e)
      })
    })
  }

  logout() {
    return new Promise((resolve) => {
      return firebase.auth().signOut().then(() => {
        return resolve()
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  deleteAccount(uid) {
    return new Promise((resolve) => {
      return this.deleteDocument("users/" + uid).then(() => {
        return firebase.auth().currentUser.delete().then(() => {
          return resolve()
        })
      })
    }).catch((e) => {
      console.log(e)
    })
  }
}
