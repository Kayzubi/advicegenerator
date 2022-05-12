// Get page items
const die = document.getElementById('dice-box');
const advice = document.getElementById('advice');
const adviceID = document.querySelector('.advice-id');


// Fetch Advice
const getAdvice = () => {
    
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            advice.innerHTML = `"${data.slip.advice}"`;
            adviceID.innerHTML= data.slip.id;

        })
        .catch(err => {
            console.log(err);
        })
}

// Event listeners
die.addEventListener('click', getAdvice);