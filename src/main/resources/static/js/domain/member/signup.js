import {
    onSignUpIdInput, onSignUpIdDuplicatedCheckBtnClick,
    onSignUpPwInput, onSignUpConfirmPwInput,
    onSignUpNameInput,
    onSignUpPhoneInput,
    onSignUpAddressInput, onSignUpDetailAddressInput,
    onSignUpEmailInput, onSignUpEmailDuplicatedCheckBtnClick, onSignUpEmailCodeSendBtnClick, onSignUpEmailCodeInput,
    onSignupSubmitBtnClick,
    setSignup
} from "./handlers/signupHandler.js";

import {
    openDaumPostcode
} from "./handlers/memberHandler.js";

document.addEventListener("DOMContentLoaded", function () {

    // 아이디 입력 이벤트
    signupIdInput.addEventListener("input", (event) => {
        const inputMsg = "#signupIdInputMsg";
        const checkMsg = "#signupIdCheckMsg";
        onSignUpIdInput(event, inputMsg, checkMsg);
    });

    // 아이디 중복 확인 버튼 클릭 이벤트
    signupIdDuplicatedCheckBtn.addEventListener("click", (event) => {
        const inputMsg = "#signupIdInputMsg";
        const checkMsg = "#signupIdCheckMsg";
        onSignUpIdDuplicatedCheckBtnClick(event, inputMsg, checkMsg);
    });

    // 비밀번호 입력 및 정규식 검증 이벤트
    signupPwInput.addEventListener("input", (event) => {
        const inputMsg = "#signupPwInputMsg";
        const checkMsg = "#signupPwCheckMsg";
        const confirmPwCheckMsg = "#signupConfirmPwCheckMsg";
        onSignUpPwInput(event, inputMsg, checkMsg, confirmPwCheckMsg);
    });

    // 비밀번호 확인 입력 및 검증 이벤트
    signupConfirmPwInput.addEventListener("input", (event) => {
        const inputMsg = "#signupConfirmPwInputMsg";
        const checkMsg = "#signupConfirmPwCheckMsg";
        onSignUpConfirmPwInput(event, inputMsg, checkMsg);
    });

    // 이름 입력 이벤트
    signupNameInput.addEventListener("input", (event) => {
        const inputMsg = "#signupNameInputMsg";
        onSignUpNameInput(event, inputMsg);
    });


    // 핸드폰 번호 입력 및 정규식 검증 이벤트
    signupPhoneInput.addEventListener("input", (event) => {
        const inputMsg = "#signupPhoneInputMsg";
        const checkMsg = "#signupPhoneCheckMsg";
        onSignUpPhoneInput(event, inputMsg, checkMsg);
    });

    // 주소 입력 이벤트
    signupAddressInput.addEventListener("input", (event) => {
        const inputMsg = "#signupAddressInputMsg";
        onSignUpAddressInput(event, inputMsg);
    });
    // 상세 주소 입력 이벤트
    signupDetailAddressInput.addEventListener("input", (event) => {
        const inputMsg = "#signupDetailAddressInputMsg";
        onSignUpDetailAddressInput(event, inputMsg);
    });
    // 주소 찾기 버튼 클릭 이벤트
    signupFindAddressBtn.addEventListener("click", (event) => {
        const addressInput       = "#signupAddress";
        const detailAddressInput = "#signupDetailAddress";
        openDaumPostcode(event, addressInput, detailAddressInput);
    });

    // 이메일 입력 및 정규식 검증 이벤트
    signupEmailInput.addEventListener("input", (event) => {
        const inputMsg = "#signupEmailInputMsg";
        const checkMsg = "#signupEmailCheckMsg";
        const duplicatedCheckMsg = "#signupEmailDuplicatedCheckMsg";
        onSignUpEmailInput(event, inputMsg, checkMsg, duplicatedCheckMsg);
    });

    // 이메일 중복 확인 버튼 클릭 이벤트
    signupEmailDuplicatedCheckBtn.addEventListener("click", (event) => {
        const inputMsg = "#signupEmailInputMsg";
        const checkMsg = "#signupEmailCheckMsg";
        const duplicatedCheckMsg = "#signupEmailDuplicatedCheckMsg";
        onSignUpEmailDuplicatedCheckBtnClick(event, inputMsg, checkMsg, duplicatedCheckMsg);
    });

    // 이메일 인증 코드 발송 버튼 클릭 이벤트
    signupEmailCodeSendBtn.addEventListener("click", (event) => {
        const time = 180; // 3분 = 180초
        onSignUpEmailCodeSendBtnClick(event, time);
    });
    // 이메일 인증 코드 입력 및 검증 이벤트
    signupEmailCodeInput.addEventListener("input", (event) => {
        const checkMsg = "#signupEmailCodeCheckMsg";
        onSignUpEmailCodeInput(event, checkMsg);
    });

    // 가입하기 버튼 클릭 이벤트
    signupSubmitBtn.addEventListener("click", onSignupSubmitBtnClick);
});
// ------------------------------------------------------------------------------------------
// 아이디 input
const signupIdInput = document.querySelector("#signupId");
// 아이디 중복 확인 버튼
const signupIdDuplicatedCheckBtn = document.querySelector("#signupIdDuplicatedCheckBtn");
// 아이디 중복 확인 여부
let signupIdChecked = false;
// ------------------------------------------------------------------------------------------
// 비밀번호 input
const signupPwInput = document.querySelector("#signupPw");
// 비밀번호 검증 여부
let signupPwChecked = false;
// 비밀번호 확인 input
const signupConfirmPwInput = document.querySelector("#signupConfirmPw");
// 비밀번호 확인 검증 여부
let signupConfirmPwChecked = false;
// ------------------------------------------------------------------------------------------
// 이름 input
const signupNameInput = document.querySelector("#signupName");
// ------------------------------------------------------------------------------------------
// 핸드폰 번호 input
const signupPhoneInput = document.querySelector("#signupPhone");
// 핸드폰 번호 검증 여부
let signupPhoneChecked = false;
// ------------------------------------------------------------------------------------------
// 주소 찾기 버튼
const signupFindAddressBtn = document.querySelector("#signupFindAddressBtn");
// 주소 input
const signupAddressInput = document.querySelector("#signupAddress");
// 상세 주소 input
const signupDetailAddressInput = document.querySelector("#signupDetailAddress");


// 이메일 input
const signupEmailInput = document.querySelector("#signupEmail");
// 이메일 검증 확인 여부
let signupEmailChecked = false;
// 이메일 중복 확인 버튼
const signupEmailDuplicatedCheckBtn = document.querySelector("#signupEmailDuplicatedCheckBtn");
// 이메일 중복 확인 여부
let signupEmailDuplicatedChecked = false;
// ------------------------------------------------------------------------------------------
// 이메일 인증 코드 input
const signupEmailCodeInput = document.querySelector("#signupEmailCode");
// 이메일 인증 코드 발송 버튼
const signupEmailCodeSendBtn = document.querySelector("#signupEmailCodeSendBtn");
// 이메일 인증 코드
let signupEmailCode;
// 이메일 인증 여부
let signupEmailCodeChecked = false;
// setInterval 저장할 변수
let signupCountdown;
// ------------------------------------------------------------------------------------------
// 가입하기 버튼
const signupSubmitBtn = document.querySelector("#signupSubmitBtn");
// ------------------------------------------------------------------------------------------
// getter
// idChecked 반환
export function isSignupIdChecked() {
    return signupIdChecked;
}
// pwChecked 반환
export function isSignupPwChecked() {
    return signupPwChecked;
}
// confirmPwChecked 반환
export function isSignupConfirmPwChecked() {
    return signupConfirmPwChecked;
}
// phoneChecked 반환
export function isSignupPhoneChecked() {
    return signupPhoneChecked;
}
// emailChecked 반환
export function isSignupEmailChecked() {
    return signupEmailChecked;
}
// emailDuplicatedChecked 반환
export function isSignupEmailDuplicatedChecked() {
    return signupEmailDuplicatedChecked;
}
// emailCodeChecked 반환
export function isSignupEmailCodeChecked() {
    return signupEmailCodeChecked;
}
// 이메일 인증 코드 반환
export function getSignupEmailCode() {
    return signupEmailCode;
}
// countdown 반환
export function getSignupCountdown() {
    return signupCountdown;
}
// ------------------------------------------------------------------------------------------
// setter
// idChecked 설정
export function setSignupIdChecked(value) {
    signupIdChecked = value;
}
// pwChecked 설정
export function setSignupPwChecked(value) {
    signupPwChecked = value;
}
// confirmPwChecked 설정
export function setSignupConfirmPwChecked(value) {
    signupConfirmPwChecked = value;
}
// phoneChecked 설정
export function setSignupPhoneChecked(value) {
    signupPhoneChecked = value;
}

// emailChecked 설정
export function setSignupEmailChecked(value) {
    signupEmailChecked = value;
}
// emailDuplicatedChecked 설정
export function setSignupEmailDuplicatedChecked(value) {
    signupEmailDuplicatedChecked = value;
}
// emailCodeChecked 설정
export function setSignupEmailCodeChecked(value) {
    signupEmailCodeChecked = value;
}
// 이메일 인증 코드 설정
export function setSignupEmailCode(value) {
    signupEmailCode = value;
}
// countdown 설정
export function setSignupCountdown(interval) {
    signupCountdown = interval;
}