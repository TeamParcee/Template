import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  getUserDataFromUid(uid: string) {
    return new Promise((resolve, reject) => {
      return firebase.firestore().doc("/users/" + uid).get().then((snap) => {
        return resolve(snap.data())
      }).catch((error) => {
        return reject((error))
      })
    })
  }

  createNewUserData(uid: string, userData: userData) {
    return new Promise((resolve, reject) => {
      return firebase.firestore().doc("/users/" + uid).set(userData).then(() => {
        return resolve()
      }).catch((error) => {
        return reject(error)
      })
    })
  }
  deleteUserDataFromUid(uid: string) {
    return new Promise((resolve, reject) => {
      return firebase.firestore().doc("/users/" + uid).delete().then(() => {
        return resolve()
      }).catch((error) => {
        return reject(error);
      })
    })
  }
}

export class userData {
  constructor(
    public fname?: string,
    public lname?: string,
    public uid?: string,
    public photoURL?: string,
    public displayName?: string,
  ) { }
}
