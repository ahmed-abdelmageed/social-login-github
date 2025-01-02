import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKfIxBfzLWrAvbPjsvjVjEUtIPRU-i-2E",
  authDomain: "leads-task.firebaseapp.com",
  projectId: "leads-task",
  storageBucket: "https://social-login-github.vercel.app/",
  messagingSenderId: "715384762081",
  appId: "1:715384762081:web:2117cb7a5cc8a4daf411a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize GitHub provider with scopes
const provider = new GithubAuthProvider();
provider.addScope("repo");
provider.addScope("read:user");
provider.addScope("user:email");

export { auth, provider, signInWithPopup };
