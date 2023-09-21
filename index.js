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
    time: new Date(),
  });
  document.getElementById("message-input").value = "";
  messageGet();
};

const messageGet = async function () {
  const querySnapshot = await getDocs(collection(db, "message"));
  const messagesArray = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    messagesArray.push({
      message: data.message,
      time: data.time.toMillis(),
    });
  });

  messagesArray.sort((a, b) => b.time - a.time);

  let messagesHTML = "";
  messagesArray.forEach((messageObj) => {
    const message = messageObj.message;
    const messageDiv = `<div class="message">
      <div class="tooltip"></div>
      <p>${message}</p>
    </div>`;
    messagesHTML += messageDiv;
  });

  const messagesElement = document.getElementById("msgs");
  messagesElement.innerHTML = messagesHTML;
};

window.onload = messageGet;
