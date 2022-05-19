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

    get chatId(){ return this._data.chatId };
    set chatId(value) { this._data.chatId = value };

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

    static getContactsRef(id){

        return User.getRef()
            .doc(id)
            .collection('contacts')

    }

    addContact(contact){

        return User.getContactsRef(this.email)
            .doc(btoa(this.email))
            .set(this.toJSON());

    }

    getContacts(filter = ''){

        return new Promise((s, f) => {

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs => {

                let contacts = [];

                docs.forEach(doc =>{

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data)

                });

                this.trigger('contactschange', docs)

                s(contacts);

            })

        })

    }

}