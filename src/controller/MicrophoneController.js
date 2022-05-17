import { ClassEvents } from "../utils/ClassEvents";

export class MicrophoneController extends ClassEvents {

    constructor(){

        // Puxa o constructor da outra classe

        super()

        // Permissao pra audio

        this._mimetype = 'audio/webm'

        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._available = true;

            this._stream = stream;

            this.trigger(`ready`, this._stream)

        }).catch(err =>{

            console.error(err);

        })
    }

    stop(){

        this._stream.getTracks().forEach(track =>{

            track.stop();

        })

    }

    isAvailable(){
        return this._available
    }

    startRecorder(){

        if(this.isAvailable()){

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimetype
            });

            this._recorderChunks = [];

            this._mediaRecorder.addEventListener(`dataavailable`, e => {

                if(e.data.size > 0) this._recorderChunks.push(e.data)

            })

            this._mediaRecorder.addEventListener(`stop`, e => {

                let blob = new Blob(this._recorderChunks, {
                    type: this._mimetype
                });

                let fileName = `rec${Date.now()}.webm`

                let file = new File([blob], fileName, {
                    type: this._mimetype,
                    lastModified: Date.now()
                });

                console.log(`file`, file)

                let reader = new FileReader();

                reader.onload = e=>{
                    let audio = new Audio(reader.result);

                    audio.play()
                }

                reader.readAsDataURL(file)

            });

            this._mediaRecorder.start();

        }

    }

    stopRecorder(){

        if(this.isAvailable()){

            this._mediaRecorder.stop();
            this.stop()

        }

    }

}