import { Firebase } from "./Firebase";

export class Upload{

    static send(file, from){

        return new Promise((s, f) => {

            // Firebase storage
    
            let uploadTask = Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file);
    
            uploadTask.on('state_changed', e => {
    
                console.log('upload', e)
    
            }, err => {
    
                f(console.error(err))
    
            }, () => {
    
                s(uploadTask.snapshot);
    
            });
            
        })

    }

}