import firebase from "firebase/compat/app";
import "firebase/compat/auth";


//add firebase configuration here below ---->>>>
//------>>>
const app = firebase.initializeApp({
 
 
});

export const auth = app.auth();
export default app;
