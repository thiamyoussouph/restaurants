import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import  express  from 'express'
import dotenv from 'dotenv'

dotenv.config();


const app = express();
const port =  process.env.PORT;
const thisApiKey = process.env.THIS_API_KEY;



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,

  authDomain: "minifirebase8todolist.firebaseapp.com",

  projectId: "minifirebase8todolist",

  storageBucket: "minifirebase8todolist.appspot.com",

  messagingSenderId: "803181109308",

  appId: "1:803181109308:web:7f9818477ea1a5f6fee339"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const db = getFirestore(appFirebase);

let restaurantCollection = collection(db, 'Restaurant');
getDocs(restaurantCollection).then( data =>{
  let restaurantList = data.docs.map( doc => doc.data())
  app.get('/restaurants/:apikey', (req, res)=>{
    if(req.params.apikey == thisApiKey){
      res.json(restaurantList); 
    }else{
      res.json({error:"wrong api key"});
    }
  })
});

app.listen(port, ()=>{
  console.log(`listen at http://localhost:${port}`);
})
// Get a list of cities from your database
// async function getRestaurant(db) {
//   const restaurantCol = collection(db, 'Restaurant');
//   const restaurantSnapshot = await getDocs(restaurantCol);
//   const restaurantList = restaurantSnapshot.docs.map(doc => doc.data());
//   return restaurantList;
// }

// const data = await getRestaurant();
// console.log(data);