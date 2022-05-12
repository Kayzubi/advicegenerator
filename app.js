// Get page items
const die = document.getElementById('dice-box');
const advice = document.getElementById('advice');
const adviceID = document.querySelector('.advice-id');
const voices = document.getElementById('voice-options');

var synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();


// Fetch Advice
const getAdvice = () => {
    synth.cancel()

    // fetch advice from adviceslip API
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            advice.innerHTML = `"${data.slip.advice}"`;
            adviceID.innerHTML= data.slip.id;

            readAdvice();
        })
        .catch(err => {
            console.log(err);
        })
}

const readAdvice = () => {
    // get advice text
    utterance.text = advice.innerText;

    //read out advice
    synth.speak(utterance);
}

// Event listeners
die.addEventListener('click', getAdvice);
document.addEventListener('keydown', (e) => {
    if(e.key == 'a') {
        getAdvice();
    }
})