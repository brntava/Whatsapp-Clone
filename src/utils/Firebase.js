import firebase from "firebase";
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._firebaseConfig = {

            apiKey: "AIzaSyD_dODp9tfgjnJUz8KgfrGb9MFNLi5zQ24",
          
            authDomain: "whatsapp-clone-4f549.firebaseapp.com",
          
            projectId: "whatsapp-clone-4f549",
          
            storageBucket: "gs://whatsapp-clone-4f549.appspot.com",
          
            messagingSenderId: "95002601062",
          
            appId: "1:95002601062:web:dc18aa048c3a4b1c716fa7",
          
            measurementId: "G-898KP7462H"
        }

        this.init();

    }

    init(){

        if(!window._initializedFirebase){
            firebase.initializeApp(this._firebaseConfig);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }


    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });

            }).catch(err => {
                f(err)
            })

        })


    }

}