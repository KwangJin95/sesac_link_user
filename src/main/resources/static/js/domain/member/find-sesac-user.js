import {
    onEmailInput,
    onEmailCodeSendBtnClick,
    onEmailCodeInput,
    onFindSesacUserFormSubmitBtnClick, onSesacUserConfirmModalCloseBtnClick, onSesacUserNotExistModalCloseBtnClick
} from "./handlers/findSesacUserHandler.js";

document.addEventListener("DOMContentLoaded", function () {

    // 이메일 입력, 정규식 검증, 인증 코드 발송 버튼 활성화 이벤트
    emailInput.addEventListener("input", onEmailInput);
    // 이메일 인증 코드 발송 버튼 클릭 이벤트
    emailCodeSendBtn.addEventListener("click", (event) => {
        const time = 180; // 3분 = 180초
        onEmailCodeSendBtnClick(event, time);
    });
    // 이메일 인증 코드 입력 및 검증 이벤트
    emailCodeInput.addEventListener("input", onEmailCodeInput);

    // Sesac 회원 가져오기 버튼 클릭 이벤트
    findSesacUserFormSubmitBtn.addEventListener("click", onFindSesacUserFormSubmitBtnClick);

    // Sesac 회원 가져오기 모달 닫기 버튼 클릭 이벤트
    if (sesacUserConfirmModalCloseBtn != null) {
        sesacUserConfirmModalCloseBtn.addEventListener("click", onSesacUserConfirmModalCloseBtnClick);
    }

    // Sesac 회원 없음 모달 닫기 버튼 클릭 이벤트
    if (sesacUserNotExistModalCloseBtn != null) {
        sesacUserNotExistModalCloseBtn.addEventListener("click", onSesacUserNotExistModalCloseBtnClick);
    }

});

// ------------------------------------------------------------------------------------------
// 이메일 input
const emailInput = document.querySelector("#email");
// 이메일 검증 확인 여부
let emailChecked = false;
// 이메일 인증 코드 발송 버튼
const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");
// 이메일 인증 코드 input
const emailCodeInput = document.querySelector("#email-code");
// 이메일 인증 코드
let emailCode;
// 이메일 인증 여부
let emailCodeChecked = false;
// setInterval 저장할 변수
let countdown;
// ------------------------------------------------------------------------------------------
// Sesac 회원 가져오기 버튼
const findSesacUserFormSubmitBtn = document.querySelector("#findSesacUserFormSubmitBtn");
// Sesac 회원 가져오기 모달 닫기 버튼
const sesacUserConfirmModalCloseBtn = document.querySelector("#sesacUserConfirmModalCloseBtn");
// Sesac 회원 없음 모달 닫기 버튼
const sesacUserNotExistModalCloseBtn = document.querySelector("#sesacUserNotExistModalCloseBtn");
// 이 정보로 회원가입 버튼
const sesacUserConfirmFormSubmitBtn = document.querySelector("#sesacUserConfirmFormSubmitBtn");
// ------------------------------------------------------------------------------------------
// getter
// emailChecked 반환
export function isEmailChecked() {
    return emailChecked;
}
// emailCodeChecked 반환
export function isEmailCodeChecked() {
    return emailCodeChecked;
}
// 이메일 인증 코드 반환
export function getEmailCode() {
    return emailCode;
}
// countdown 반환
export function getCountdown() {
    return countdown;
}
// ------------------------------------------------------------------------------------------
// setter
// emailChecked 설정
export function setEmailChecked(value) {
    emailChecked = value;
}
// emailCodeChecked 설정
export function setEmailCodeChecked(value) {
    emailCodeChecked = value;
}
// 이메일 인증 코드 설정
export function setEmailCode(value) {
    emailCode = value;
}
// countdown 설정
export function setCountdown(interval) {
    countdown = interval;
}