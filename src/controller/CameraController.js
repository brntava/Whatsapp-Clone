export class CameraController {

    constructor(videoel){

        this._videoEl = videoel

        // Permissao pra camera

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            this._videoEl.srcObject = stream;
            this._videoEl.play();

        }).catch(err =>{

            console.error(err);

        })

    }

}