import { ClassEvents } from "../utils/ClassEvents";
import { Firebase } from "../utils/Firebase";


export class User extends ClassEvents{

    static getRef(){

        return Firebase.db().collection('/users')

    }

    static findByEmail(email){

        // Procura um doc dentro de users
        
        return User.getRef().doc(email)

    }

}