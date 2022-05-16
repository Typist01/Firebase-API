import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, getDoc, query, where, getDocs  } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const config=process.env.FIREBASE_CONFIG.replace(/\s/g, "")
const firebaseConfig=JSON.parse(config)
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function addUser(){
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    return {success:true, docRef}
  } catch (e) {
    console.error("Error adding document: ", e);
    return {success:false, e}
  }
}


// async function setUser(userId, name, email, imageUrl) {
//     const db = getDatabase()
//     try{
//       await setDoc(doc(db, "users", userId), {
//         name: name,
//         email: email,
//         imageUrl: imageUrl
//       });
//     } catch(err){
//       console.log(err)
//     }
//   }

  async function addItem(id, name, price, description, img){
    try {
      await setDoc(doc(db, "items", id), {
      name: name,
      cost: price,
      description: description,
      imageUrl: img
    });
      console.log("Document written");
      return {success:true}
    } catch (e) {
      console.error("Error adding document: ", e);
      return {success:false, e}
    }
  }

  async function getItems(name, id) {
    const docRef = doc(db, name, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("no documents")
    }
  }

  async function getData(name) {
    const q = query(collection(db, name));
    const querySnapshot = await getDocs(q);
    const mydata = []
    querySnapshot.forEach((doc) => {
    mydata.push({id:doc.id, ...doc.data()})
  })
  console.log(mydata)
  return mydata
};




// getData("items")
// addUser()
// setUser("myuserid", "myname", "myemail@here.com", "none")
// addItem('3', 'item1', '£34.53', 'This is item3 description', 'none');
