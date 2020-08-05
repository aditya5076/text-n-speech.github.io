// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// init voice array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // loop through voices and create an potions for each one
  voices.forEach((voice) => {
    // creating an option element
    const option = document.createElement('option');
    // fill option with voice and lang
    option.textContent = voice.name + '(' + voice.lang + ')';

    // set neede option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// speak
const speak = () => {
  // check if speaking
  if (synth.speaking) {
    console.error('kindly wait already speaking..');
    return;
  }
  if (textInput.value !== '') {
    // addidng the backgorund gif
    body.style.background = 'black url(wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
    // get speech text
    const speechTxt = new SpeechSynthesisUtterance(textInput.value);
    // speak end
    speechTxt.onend = (e) => {
      console.log('done speaking...');
      body.style.background = 'black';
      textInput.value = '';
    };
    // speak error
    speechTxt.onerror = (e) => {
      console.error('something went wrong..');
    };
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // loop through the voices array
    voices.forEach((voice) => {
      if (voice.name == selectedVoice) {
        speechTxt.voice = voice;
      }
    });
    // set pitch and rate
    speechTxt.rate = rate.value;
    speechTxt.pitch = pitch.value;
    // speak
    synth.speak(speechTxt);
  }
};

// event listeners

// text for submit
textForm.addEventListener('submit', (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// here we are trying to link the div(rate) with input(rate-value)
// rate value change
rate.addEventListener('change', (e) => (rateValue.textContent = rate.value));

// pitch value change
pitch.addEventListener('change', (e) => (pitchValue.textContent = pitch.value));

// voice select change
voiceSelect.addEventListener('change', (e) => speak());
