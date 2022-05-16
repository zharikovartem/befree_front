import React from 'react'

const synth = window.speechSynthesis;
// const voices = synth.getVoices()

export const speak = (text: string, lang: number) => {

    const voices = synth.getVoices()
    // console.log('voices', voices)

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        synth.cancel();
        // setTimeout( speak(text, lang), 300);
        setTimeout(() => {
            speak(text, lang)
        }, 300);
    } else if (text !== '') {
        const utterThis = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ''));
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        };
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        };

        console.log('set ', lang)
        console.log('set ', voices[lang])
        utterThis.voice = voices[lang];

        // const selectedOption = voicesList.selectedOptions[0].getAttribute(
        //     'data-name'
        // );
        // for (i = 0; i < voices.length; i++) {
        //     if (voices[i].name === selectedOption) {
        //         utterThis.voice = voices[i];
        //     }
        // }

        // utterThis.onpause = function (event) {
        //     const char = event.utterance.text.charAt(event.charIndex);
        //     console.log(
        //         'Speech paused at character ' +
        //         event.charIndex +
        //         ' of "' +
        //         event.utterance.text +
        //         '", which is "' +
        //         char +
        //         '".'
        //     );
        // };

        // utterThis.pitch = pitch.value;
        // utterThis.rate = rate.value;
        synth.speak(utterThis);
    }
}

const isKyr = (str: string) => {
    return /[а-я]/i.test(str);
}


export const speakByLangs = (text: string) => {
    
    if (synth.speaking) {
        // console.error('speechSynthesis.speaking');
        // synth.cancel();
        // // setTimeout( speak(text, lang), 300);
        // setTimeout(() => {
        //     speakByLangs(text)
        // }, 300);
    } else if (text !== '') {


        const str = text.replace(/<[^>]+>/g, '')
        const words = str.split(' ')
        console.log([...words])

        let isCont = true
        let strToVoise = ''
        // let lang: 'ru'|'en' = isKyr(words[0]) ? 'ru' : 'en'
        let lang: 15|1 = isKyr(words[0]) ? 15 : 1

        for (let index = 0; index < words.length; ) {
            const word = words[index];

            const wordLang: 15|1 = isKyr(word) ? 15 : 1

            // if (isCont) {
                if (wordLang === lang) {
                    strToVoise = strToVoise === '' ? word : strToVoise+' '+word
                    console.log('+++', word)
                    console.log('???', strToVoise)
                } else {
                    speak(strToVoise, lang)
                    if (synth.speaking) {
                        console.log('!!!!!!!!!!!!!!!',words.join(' '))
                            wait(words.join(' '))
                        break;
                    } else {

                    }
                }
                
            // }
            lang = wordLang
            words.splice(index, 1)
        }

        // speak(strToVoise, lang)
        words.length === 0 && speak(strToVoise, lang)
    }
}

const wait = (text: string) => {
    setTimeout(() => {
        // speakByLangs(text)
        if (synth.speaking) {
            // console.log('wait')
            wait(text)
        } else {
            // console.log('go')
            speakByLangs(text)
        }
    }, 10);
}

const Voise: React.FC<VoisePropsType> = (props) => {



    return (
        <>
            Voise
        </>
    );
}

export default Voise

type VoisePropsType = {

}