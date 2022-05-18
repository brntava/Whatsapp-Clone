import { ClassEvents } from "../utils/ClassEvents";

export class Model extends ClassEvents{

    constructor(){

        super()

        this._data = {};
    }

    fromJSON(json){
        // Mescla a informacao dos dois
        this._data = Object.assign(this._data, json)

        this.trigger('datachange', this.toJSON());
    }

    toJSON(){
        return this._data
    }

}