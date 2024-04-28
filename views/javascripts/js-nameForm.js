//사용자 이름을 저장 (새로고침해도 유지)
function saveName(text) {
    localStorage.setItem(SAVE_NAME, text);
}

//이름을 묻기
function demanderLeNom() {
    nameForm.classList.add(SHOWING_CLASS);
    nameForm.addEventListener("submit", writeSubmit);
}

//입력하면 나오는 인사말
function bonjourUser(text) {
    nameForm.classList.remove(SHOWING_CLASS);
    sayHello.classList.add(SHOWING_CLASS);
    sayHello.innerText = `Hello ${text}`;
}