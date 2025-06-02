import {
    enableButton, disableButton,
    showElement, hideElement
} from '../../../global/util/utils.js';

import {
    getEmailPattern,
    getPasswordPattern,
    getPhonePattern,
    updateTimerDisplay
} from '../utils/memberUtil.js'

import {
    isSignupIdChecked,
    getSignupCountdown,
    setSignupCountdown,
    setSignupIdChecked,
    setSignupPwChecked,
    setSignupConfirmPwChecked,
    setSignupPhoneChecked,
    setSignupEmailChecked,
    setSignupEmailDuplicatedChecked,
    setSignupEmailCodeChecked,
    isSignupEmailCodeChecked,
    isSignupConfirmPwChecked,
    isSignupPwChecked,
    isSignupPhoneChecked,
    isSignupEmailChecked,
    isSignupEmailDuplicatedChecked, setSignupEmailCode, getSignupEmailCode,
} from '../signup.js';

import {
    checkId,
    checkEmail,
    sendEmailVerifyCode
} from "../api/memberApi.js";

// 아이디 입력 이벤트 핸들러
export function onSignUpIdInput (event, inputMsg, checkMsg) {

    // id input
    const idInput = event.target;
    // id 중복 확인 버튼
    const idDuplicatedCheckBtn = document.querySelector("#signupIdDuplicatedCheckBtn");

    // 아이디 중복 확인 메시지 숨김
    hideElement(checkMsg);

    // 아이디 중복 확인 여부
    setSignupIdChecked(false);

    // 아이디 중복 확인 버튼 활성화
    enableButton(idDuplicatedCheckBtn, "중복 확인");

    // 아이디 입력값 확인 후 입력 메시지 출력
    if (idInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}

// 아이디 중복 확인 버튼 클릭 이벤트 핸들러
export function onSignUpIdDuplicatedCheckBtnClick (event, inputMsg, checkMsg) {
    event.preventDefault()

    const idInput = document.querySelector("#signupId");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        showElement(inputMsg);
        idInput.focus();
        return;
    }

    // 아이디 중복 확인
    checkId(idInput.value).then(data => {
        // 사용 가능(중복 x)
        if (data === true) {
            setSignupIdChecked(true);

            hideElement(checkMsg);
            disableButton(event.target, "사용 가능");
        }
        // 사용 불가능(중복)
        else {
            showElement(checkMsg);
            idInput.focus();
        }
    }).catch(e => {
        console.log(e);
    });
}

// 비밀번호 입력 및 정규식 검증 이벤트 핸들러
export function onSignUpPwInput(event, inputMsg, checkMsg, confirmPwCheckMsg) {
    // 비밀번호 input
    const pwInput = event.target;
    // 비밀번호 확인 input
    const confirmPwInput = document.querySelector("#signupConfirmPw");

    // 비밀번호 입력값 확인 후 입력 메시지 출력
    if (pwInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 비밀번호 정규식 검증
    if (!getPasswordPattern().test(pwInput.value.trim())) {
        setSignupPwChecked(false);
        showElement(checkMsg);
    } else {
        setSignupPwChecked(true);
        hideElement(checkMsg);
    }

    // 비밀번호 확인 입력값 검증
    if (pwInput.value.trim() !== confirmPwInput.value.trim()) {
        setSignupConfirmPwChecked(false);
        showElement(confirmPwCheckMsg);
    } else {
        setSignupConfirmPwChecked(true);
        hideElement(confirmPwCheckMsg);
    }
}

// 비밀번호 확인 입력 및 검증 이벤트 핸들러
export function onSignUpConfirmPwInput(event, inputMsg, checkMsg) {
    const pwInput = document.querySelector("#signupPw");
    const confirmPwInput = event.target;

    // 비밀번호 확인 입력값 확인 후 입력 메시지 출력
    if (confirmPwInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 비밀번호 확인 입력값 검증
    if (pwInput.value !== confirmPwInput.value) {
        setSignupConfirmPwChecked(false);
        showElement(checkMsg);
    } else {
        setSignupConfirmPwChecked(true);
        hideElement(checkMsg);
    }
}

// 이름 입력 이벤트 핸들러 핸들러
export function onSignUpNameInput(event, inputMsg) {
    // 이름 input
    const nameInput = event.target;

    // 이름 입력값 확인 후 입력 메시지 출력
    if (nameInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}

// 핸드폰 번호 입력 및 정규식 검증 이벤트 핸들러
export function onSignUpPhoneInput(event, inputMsg, checkMsg) {
    const phoneInput = event.target;
    // 핸드폰 번호 입력값 확인 후 입력 메시지 출력
    if (phoneInput.value.trim() == "") {
        showElement(inputMsg)
    } else {
        hideElement(inputMsg)
    }
    // 핸드폰 번호 정규식 검증
    if (!getPhonePattern().test(phoneInput.value.trim())) {
        setSignupPhoneChecked(false);
        showElement(checkMsg)
    } else {
        setSignupPhoneChecked(true);
        hideElement(checkMsg)
    }
}

// 주소 입력 이벤트 핸들러
export function onSignUpAddressInput(event, inputMsg) {
    // 주소 input
    const addressInput = event.target;

    // 주소 입력값 확인 후 입력 메시지 출력
    if (addressInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 상세 주소 입력 이벤트 핸들러
export function onSignUpDetailAddressInput(event, inputMsg) {
    // 상세 주소 input
    const detailAddressInput = event.target;

    // 이름 입력값 확인 후 입력 메시지 출력
    if (detailAddressInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}

// 이메일 입력 및 정규식 검증 이벤트 핸들러
export function onSignUpEmailInput(event, inputMsg, checkMsg, duplicatedCheckMsg) {
    // 이메일 input
    const emailInput = event.target;

    // 이메일 입력값 확인 후 입력 메시지 출력
    if (emailInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 이메일 중복 체크 메시지 숨김
    hideElement(duplicatedCheckMsg);

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value.trim())) {
        setSignupEmailChecked(false);
        showElement(checkMsg);
    } else {
        setSignupEmailChecked(true);
        hideElement(checkMsg);
    }
}
// 이메일 중복 확인 버튼 클릭 이벤트 핸들러
export function onSignUpEmailDuplicatedCheckBtnClick(event, inputMsg, checkMsg, duplicatedCheckMsg) {
    event.preventDefault()
    // 이메일 input
    const emailInput = document.querySelector("#signupEmail");
    // 이메일 인증 코드 발송 버튼
    const emailCodeSendBtn = document.querySelector("#signupEmailCodeSendBtn");

    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        showElement(inputMsg);
        emailInput.focus();
        return;
    }

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value.trim())) {
        showElement(checkMsg);
        return;
    } else {
        hideElement(checkMsg);
    }

    // 이메일 중복 확인
    checkEmail(emailInput.value).then(data => {
        // 사용 가능(중복 x)
        if (data === true) {
            setSignupEmailDuplicatedChecked(true); // 확인됨

            hideElement(duplicatedCheckMsg);

            // 중복 확인 버튼 비활성화
            disableButton(event.target, "사용 가능");

            // 이메일 인증 코드 발송 버튼 활성화
            enableButton(emailCodeSendBtn);

            // 이메일 입력 비활성화
            emailInput.readOnly = true;
        }
        // 사용 불가능(중복)
        else {
            showElement(duplicatedCheckMsg);
            emailInput.focus();
        }
    }).catch(e => {
        console.log(e);
    });
}
// 이메일 인증 코드 발송 버튼 클릭 이벤트 핸들러
export function onSignUpEmailCodeSendBtnClick(event, time) {
    event.preventDefault();
    const emailCodeSendBtn = event.target;
    const emailInput     = document.querySelector("#signupEmail");
    const emailCodeInput = document.querySelector("#signupEmailCode");
    const emailCodeTimer = document.querySelector("#signupEmailCodeTimer");

    // 이메일 인증 코드 입력 활성화
    emailCodeInput.disabled = false;

    // 인증 코드 전송 및 받아옴
    sendEmailVerifyCode(emailInput.value.trim())
        .then(data => {
            // 수정 필요
            alert(data);
            setSignupEmailCode(data);
        })
        .catch(e => console.log(e));

    // 타이머 시작
    let timeLeft = time;
    updateTimerDisplay(timeLeft, emailCodeTimer); // 즉시 업데이트

    // 기존 타이머가 있으면 초기화
    if (getSignupCountdown()) {
        clearInterval(getSignupCountdown());
    }

    // 타이머 표시
    emailCodeTimer.classList.remove("hidden");

    // 인증 코드 발송 버튼 비활성화
    disableButton(emailCodeSendBtn, "인증 코드 발송 완료");

    // 1초마다 타이머 감소
    setSignupCountdown(setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft, emailCodeTimer);

        // 타이머 종료 시
        if (timeLeft <= 0) {
            clearInterval(getSignupCountdown());
            emailCodeTimer.innerHTML = "시간 초과됐습니다. 이메일 코드 발송 버튼을 다시 클릭해주세요.";

            // 이메일 인증 코드 발송 버튼 활성화
            enableButton(emailCodeSendBtn, "이메일 인증 코드 발송");
        }
    }, 1000));
}
// 이메일 인증 코드 입력 및 검증 이벤트 핸들러
export function onSignUpEmailCodeInput(event, checkMsg) {
    // 이메일 인증 코드 input
    const emailCodeInput = event.target;

    // 코드 입력값 검증
    if (emailCodeInput.value != getSignupEmailCode()) {
        setSignupEmailCodeChecked(false);
        showElement(checkMsg);
    } else {
        clearInterval(getSignupCountdown());
        setSignupEmailCodeChecked(true);

        document.querySelector("#signupEmailCodeSendBtn").innerHTML = "이메일 인증 완료";

        hideElement(checkMsg);
        hideElement("#signupEmailCodeTimer");
    }
    if (isSignupEmailCodeChecked() === true) {
        emailCodeInput.disabled = true;
    }
}

// 가입하기 버튼 클릭 이벤트 핸들러
export function onSignupSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const signupForm = document.querySelector("#signupForm");
    const idInput = document.querySelector("#signupId");
    const pwInput = document.querySelector("#signupPw");
    const confirmPwInput = document.querySelector("#signupConfirmPw");
    const nameInput = document.querySelector("#signupName");
    const phoneInput = document.querySelector("#signupPhone");
    const addressInput = document.querySelector("#signupAddress");
    const detailAddressInput = document.querySelector("#signupDetailAddress");
    const emailInput = document.querySelector("#signupEmail");
    const emailCodeInput = document.querySelector("#signupEmailCode");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        idInput.focus();
        showElement("#signupIdInputMsg");
        return;
    }
    // 아이디 중복 확인 여부
    if (isSignupIdChecked() == false) {
        idInput.focus();
        showElement("#signupIdCheckMsg");
        return;
    }
    // 비밀번호 입력값 없음
    if (pwInput.value.trim() == "") {
        pwInput.focus();
        showElement("#signupPwInputMsg");
        return;
    }
    // 비밀번호 입력값 검증 확인 여부
    if (isSignupPwChecked() == false) {
        pwInput.focus();
        showElement("#signupPwCheckMsg");
        return;
    }
    // 비밀번호 확인 입력값 없음
    if (confirmPwInput.value.trim() == "") {
        confirmPwInput.focus();
        showElement("#signupConfirmPwInputMsg");
        return;
    }
    // 비밀번호 확인 검증 확인 여부
    if (isSignupConfirmPwChecked() == false) {
        confirmPwInput.focus();
        showElement("#signupConfirmPwCheckMsg");
        return;
    }
    // 이름 입력값 없음
    if (nameInput.value.trim() == "") {
        nameInput.focus();
        showElement("#signupNameInputMsg");
        return;
    }
    // 핸드폰 번호 입력값 없음
    if (phoneInput.value.trim() == "") {
        phoneInput.focus();
        showElement("#signupPhoneInputMsg");
        return;
    }
    // 핸드폰 번호 입력값 검증 확인 여부
    if (!getPhonePattern().test(phoneInput.value.trim())) {
        phoneInput.focus();
        showElement("#signupPhoneCheckMsg");
        return;
    }
    // 주소 입력값 없음
    if (addressInput.value.trim() == "") {
        addressInput.focus();
        showElement("#signupAddressInputMsg");
        return;
    }
    // 상세 주소 입력값 없음
    if (detailAddressInput.value.trim() == "") {
        detailAddressInput.focus();
        showElement("#signupDetailAddressInputMsg");
        return;
    }
    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        emailInput.focus();
        showElement("#signupEmailInputMsg");
        return;
    }
    // 이메일 입력값 검증 확인 여부
    if (!getEmailPattern().test(emailInput.value.trim())) {
        emailInput.focus();
        showElement("#signupEmailCheckMsg");
        return;
    }
    // 이메일 중복 확인 여부
    if (isSignupEmailDuplicatedChecked() == false) {
        emailInput.focus();
        showElement("#signupEmailDuplicatedCheckMsg");
        return;
    }
    // 이메일 인증 여부
    if (isSignupEmailCodeChecked() == false) {
        emailCodeInput.focus();
        showElement("#signupEmailCodeCheckMsg");
        return;
    }
    signupForm.submit();
}
// 회원가입 실패 후 다시 돌아왔을 경우 처리
export function setSignup() {
    // 아이디 중복 확인 여부
    setSignupIdChecked(true);
    // 아이디 중복 확인 버튼 비활성화
    disableButton(document.querySelector("#signupIdDuplicatedCheckBtn"), "사용 가능");

    // 비밀번호, 비밀번호 확인
    setSignupPwChecked(false);
    setSignupConfirmPwChecked(false);
    document.querySelector("#signupPw").value = "";
    document.querySelector("#signupConfirmPw").value = "";

    // 핸드폰 번호 확인 여부
    setSignupPhoneChecked(true);

    // 이메일
    setSignupEmailChecked(true);
    setSignupEmailDuplicatedChecked(true);
    // 이메일 중복 확인 버튼 비활성화
    disableButton(document.querySelector("#signupEmailDuplicatedCheckBtn"), "사용 가능");
    // 이메일 인증 코드 발송 버튼 활성화
    enableButton(document.querySelector("#signupEmailCodeSendBtn"));
    // 이메일 입력 비활성화
    document.querySelector("#signupEmail").readOnly = true;

    // 비밀번호 입력
    document.querySelector("#signupPw").focus();
    showElement("#signupPwInputMsg");
}