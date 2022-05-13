// Get page items
const die = document.getElementById('dice-box');
const advice = document.getElementById('advice');
const adviceID = document.querySelector('.advice-id');
const voiceOptions = document.getElementById('voice-options');

// var synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();




// Fetch Advice
const getAdvice = () => {
    speechSynthesis.cancel()

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
    speechSynthesis.speak(utterance);
}


// change voice
const loadVoice = () => {
    const voices = speechSynthesis.getVoices()
	voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceOptions.appendChild(option)
    })

    voiceOptions.addEventListener('change', (e) => {
		speechSynthesis.cancel()
		const chosenVoice = e.target.value
		speech.voice = voices[chosenVoice]

        readAdvice();
    })
}



// Event listeners
die.addEventListener('click', getAdvice);
speechSynthesis.addEventListener('voiceschanged', loadVoice)
document.addEventListener('keydown', (e) => {
    if(e.key == 'a') {
        getAdvice();
    }
})