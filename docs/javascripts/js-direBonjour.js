function writeSubmit(event) {
    event.preventDefault();
    const userValue = nameInput.value;
    helloUser(userValue);
    saveName(userValue);
}

function submitName() {
    const nowUser = localStorage.getItem(SAVE_NAME);
    //저장된 이름을 상수로 할당
    if(nowUser === null){//입력된 이름이 없다!?
        askForName();
    } else {
        bonjourUser(nowUser);
    }
}

function init() {
    submitName();
}

init();