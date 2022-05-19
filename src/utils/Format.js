import { FormatError } from "pdfjs-dist";

export class Format {

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

    static dateToTime(date, locale = 'pt-br'){

        return date.toLocaleTimeString(locale, {
            hours: '2-digits',
            minutes: '2-digits'
        });

    }

    static timeStampToTime(timeStamp){

        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()): '';

    }

}