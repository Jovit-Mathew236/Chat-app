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
  if (document.getElementById("message-input").value === "") {
    alert("Please enter a message");
    return;
  }
  const docRef = await addDoc(collection(db, "message"), {
    message: document.getElementById("message-input").value,
    time: new Date(),
    name: localStorage.getItem("name"),
  });
  document.getElementById("message-input").value = "";
  messageGet();
};

const messageGet = async function () {
  if (localStorage.getItem("name") === null) {
    window.location.href = "/";
    return;
  }
  document.getElementById("userNameSpan").textContent =
    localStorage.getItem("name");
  const querySnapshot = await getDocs(collection(db, "message"));
  const messagesArray = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    messagesArray.push({
      message: data.message,
      time: data.time.toMillis(),
      name: data.name,
    });
  });

  messagesArray.sort((a, b) => b.time - a.time);

  let messagesHTML = "";
  messagesArray.forEach((messageObj) => {
    console.log(messageObj);
    const timestamp = messageObj.time;
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    const time = `${formattedHours}:${minutes} ${amPm}`;
    const message = messageObj.message;
    const name = messageObj.name;
    const messageDiv = `<div class="message">
      <div class="tooltip"></div>
      <p class="name">${name}</p>
      <p class="message-content">${message}</p>
      <p class="time">${time}</p>
    </div>`;
    messagesHTML += messageDiv;
  });

  const messagesElement = document.getElementById("msgs");
  messagesElement.innerHTML = messagesHTML;
};

window.onload = messageGet;
