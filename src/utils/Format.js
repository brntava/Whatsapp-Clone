class Format {

    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        // Retorna um array com os itens

        return Object.keys(div.firstChild.dataset)[0];

    }

    static toTime(duration){

        let ss = parseInt((duration / 1000) % 60);
        let mm = parseInt((duration / (1000 * 60)) % 60);
        let hh = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hh > 0){
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
        } else {
            return `${mm}:${ss.toString().padStart(2, '0')}`
        }

    }

}