
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
      import {
        getFirestore,
        collection,
        getDoc,
        getDocs,
        doc,
        deleteDoc,
        updateDoc,
        setDoc,
      } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyCStgNL0zhOcQDudbYGUiysfTZZX1EfHGo",
        authDomain: "winnerauthenticationgfg.firebaseapp.com",
        projectId: "winnerauthenticationgfg",
        storageBucket: "winnerauthenticationgfg.appspot.com",
        messagingSenderId: "1099077842043",
        appId: "1:1099077842043:web:07e97daa9abe1961395ede",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore();

      async function checkCode() {
        const id = document.getElementById("id").value;
        const code = document.getElementById("code").value;

        var colRef = doc(db, "coupons", id);
        const docSnap = await getDoc(colRef);
        console.log(id);

        if (!docSnap.exists()) {

        rejected();
        } else {
          if (docSnap.data().code == code && docSnap.data().status == true) {

            //Adding time stamp and changing status
            let timeStamp = Date.now();
            await updateDoc(colRef, {
              status: false,
              time: new Date(timeStamp),
            });

            // window.open("success.html", "_self");
            accepted();
          } else {
            // alert("It does not exist");
            // window.open("reject.html", "_self");
            rejected();
          }
        }
      }

      document.getElementById("submit").addEventListener("click", checkCode);


      function rejected(){
        document.getElementById('main').innerHTML="";
        var img = document.createElement("img");
        img.setAttribute(
            'src',
            'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?w=740&t=st=1659899221~exp=1659899821~hmac=7d28d70ab6d39c360a3c913858f89630f3c8b619bb649c8d960fead8a961d2c6',
          );
        img.setAttribute('alt', 'rejected');

        var element = document.getElementById("main");
        element.appendChild(img);
        var div = document.createElement("div");
        div.setAttribute(
            'class',
            'message'
          );
        div.innerHTML = "Wrong Coupon Code Entered!"
        element.appendChild(div);
        var btn = document.createElement('button');
        btn.setAttribute(
            'id',
            'btnRejected'
        );
        btn.setAttribute(
            'class',
            'btns'
        );
        btn.innerHTML = "Try Again";
        btn.setAttribute(
            'onclick',
            'location.reload()'
        );
        element.appendChild(btn);  
      }

      function accepted(){
        document.getElementById('main').innerHTML="";
        var img = document.createElement("img");
        img.setAttribute(
            'src',
            'https://media.istockphoto.com/vectors/green-checkmark-vector-illustration-vector-id1133442802?k=20&m=1133442802&s=612x612&w=0&h=N3UvaUREpqMYVpOV7kUrQzgpVaCgddEi-LESGeAl_FI=',
          );
        img.setAttribute('alt', 'accepted');

        var element = document.getElementById("main");
        element.appendChild(img);
        var div1 = document.createElement("div");
        div1.setAttribute(
            'class',
            'message'
          );
        div1.setAttribute(
            'id',
            'accepted'
        )
        div1.innerHTML = "Coupon Code Accepted";
        element.appendChild(div1);
        var btn = document.createElement('button');
        btn.setAttribute(
            'id',
            'btnAccepted'
        );
        btn.setAttribute(
            'class',
            'btns'
        );
        btn.innerHTML = "Enter another code";
        btn.setAttribute(
            'onclick',
            'location.reload()'
        );
        element.appendChild(btn); 
      }
