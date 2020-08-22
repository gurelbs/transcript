const searchForm = document.querySelector('#search-form');
const input = searchForm.querySelector('input');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    console.log('active');
    searchForm.insertAdjacentHTML('beforeend', `<button class="btn btn-info btn-lg btn-block" type="button"><i class="fas fa-microphone"></i></button>`);
    const micBtn = searchForm.querySelector('button');
    const micIcon = micBtn.querySelector('i');

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'he-IL' || 'en-US';
    micBtn.addEventListener('click', micBtnClick);

    function micBtnClick(){
        if(micIcon.classList.contains('fa-microphone')){
            recognition.start();
        } else {
            recognition.stop();
        }
    }
    recognition.addEventListener('start', startSpeechRecognition);
    function startSpeechRecognition(){
        micIcon.classList.remove('fa-microphone');
        micIcon.classList.add('fa-microphone-slash');
        input.focus();
        console.log('active now...');
    }
    recognition.addEventListener('end', endSpeechRecognition);
    function endSpeechRecognition(){
        micIcon.classList.remove('fa-microphone-slash');
        micIcon.classList.add('fa-microphone');
        input.focus();
        console.log('recognition end');
    }
    recognition.addEventListener('result', resultSpeechRecognition);
    function resultSpeechRecognition(event){
        console.log(event);
        const currentResult = event.resultIndex;
        const transcript = event.results[currentResult][0].transcript;
        input.value = transcript;
        setTimeout(() => {
            searchForm.submit();
        }, 0);
    }
} 
else {
    console.log('not support');
}
