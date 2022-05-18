import firebase from "firebase";
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._firebaseConfig = {

            apiKey: "AIzaSyD_dODp9tfgjnJUz8KgfrGb9MFNLi5zQ24",
          
            authDomain: "whatsapp-clone-4f549.firebaseapp.com",
          
            projectId: "whatsapp-clone-4f549",
          
            storageBucket: "whatsapp-clone-4f549.appspot.com",
          
            messagingSenderId: "95002601062",
          
            appId: "1:95002601062:web:dc18aa048c3a4b1c716fa7",
          
            measurementId: "G-898KP7462H"
        }

        this.init();

    }

    init(){

        if(!this._initialized){
            firebase.initializeApp(this._firebaseConfig);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            this._initialized = true;
        }


    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

}