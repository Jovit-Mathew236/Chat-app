import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIl_Hlvh4yCt_Rp_AyYD_WRtU_fZfAWu0",
  authDomain: "chatapp-7602c.firebaseapp.com",
  projectId: "chatapp-7602c",
  storageBucket: "chatapp-7602c.appspot.com",
  messagingSenderId: "236200311074",
  appId: "1:236200311074:web:b7d88892907910454a0d7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

document.getElementById("send-btn").onclick = async function (e) {
    e.preventDefault();
  const docRef = await addDoc(collection(db, "message"), {
    message: document.getElementById("message-input").value,
  });
  alert("message send");
  messageGet();
};

const messageGet = async function () {
  const querySnapshot = await getDocs(collection(db, "message"));
  let messages = "";
  querySnapshot.forEach((doc) => {
    const message = doc.data().message;
    const messageDiv = `<div class="message">
    <div class="tooltip"></div>
    <p>${message}</p>
</div>`;
    messages = messages + messageDiv;
  });
  document.getElementById("msgs").innerHTML = messages;
};


window.onload = messageGet()