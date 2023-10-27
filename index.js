import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import {
  onSnapshot,
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
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
const auth = getAuth(app); // Initialize Firebase Authentication

const db = getFirestore(app);

document.getElementById("send-btn").onclick = async function (e) {
  e.preventDefault();
  if (document.getElementById("message-input").value === "") {
    alert("Type anything");
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
  const user = localStorage.getItem("name");

  if (!user) {
    window.location.href = "./"; // Redirect to the home page if no user is authenticated
    return;
  }

  const currentHour = new Date().getHours();

  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon,";
  } else {
    greeting = "Good evening,";
  }

  document.getElementById("greeting").textContent = `${greeting}`;
  document.getElementById("userNameSpan").textContent =
    localStorage.getItem("name");

  let currentDate = null; // Track the current date
  const messagesElement = document.getElementById("msgs");
  let messagesHTML = "";

  // Subscribe to real-time updates
  onSnapshot(
    query(collection(db, "message"), orderBy("time", "desc")),
    (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const messageDate = new Date(data.time.toMillis());

        // Check if the date has changed, and add a date separator
        if (
          !currentDate ||
          currentDate.toDateString() !== messageDate.toDateString()
        ) {
          currentDate = messageDate;
          const messageDateString = messageDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          messagesHTML += `<p class="date">${messageDateString}</p>`;
        }

        const hours = messageDate.getHours();
        const minutes = String(messageDate.getMinutes()).padStart(2, "0");
        const amPm = hours >= 12 ? "PM" : "AM";

        const formattedHours = hours % 12 || 12; // Convert to 12-hour format

        const time = `${formattedHours}:${minutes} ${amPm}`;
        const message = data.message;
        const name = data.name;
        const messageDiv = `<div class="message">
          <p class="name">${name}</p>
          <p class="message-content">${message}</p>
          <p class="time">${time}</p>
        </div>`;
        messagesHTML += messageDiv;
      });

      messagesElement.innerHTML = messagesHTML;
    }
  );
};

window.onload = messageGet;
