import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";

export class User extends Model{

    constructor(id){

        super();

        if(id) this.getById(id)

    }

    get name(){ return this._data.name };
    set name(value) { this._data.name = value };

    get email(){ return this._data.email };
    set email(value) { this._data.email = value };

    get photo(){ return this._data.photo };
    set photo(value) { this._data.photo = value };

    getById(id){

        return new Promise((s, f) => {

            // Alteracao em tempo real com o snapshot
            User.findByEmail(id).onSnapshot(doc =>{

                this.fromJSON(doc.data())

                s(doc)

            })

        })

    }

    save(){
        // set add as info no banco
        return User.findByEmail(this.email).set(this.toJSON());

    }

    static getRef(){

        return Firebase.db().collection('/users')

    }

    static findByEmail(email){

        // Procura um doc dentro de users
        
        return User.getRef().doc(email)

    }

}