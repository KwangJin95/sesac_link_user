import {
    getHolidays,
    loadThisMonth,
    generateTimeButtons,
    drawCalendar
} from "../utils/reservationUtil.js";

import {
    showElement, hideElement,
    showAlertMessage
} from "../../../global/util/utils.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

import {
    getSpaceReservationHolidays,
    setSpaceReservationHolidays
} from "../spaceReservation.js";

import {
    getUnavailableSpaceReservationStartTimeList
} from "../api/spaceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 공간 예약 검색 초기화 버튼 click
export async function onSearchSpaceReservationFormResetBtnClick() {
    // 검색 조건 form
    const searchSpaceReservationForm = document.querySelector("#searchSpaceReservationForm");
    // form 초기화
    searchSpaceReservationForm.reset();

    // 오늘 날짜 select
    loadThisMonth("#spaceReservationMonth");

    await onSpaceReservationSearchSelectChange();
}
// 공간 예약 검색 - 공간 change
export function onSpaceReservationSpaceChange() {
    // 공간 예약 공간 select
    const selectSpace =
        document.querySelector("#selectSpace").selectedOptions[0];

    // 공간 정보 보여주기
    // 공간 이미지
    document.querySelector("#spaceReservationSpaceImage").innerHTML =
        `<a href="/api/space/view/${selectSpace.dataset.spaceImage}">
            <img src="/api/space/view/${selectSpace.dataset.spaceImage}" class="object-cover w-full h-full" />
        </a>`;
    // 화이트보드

    document.querySelector("#spaceReservationWhiteBoard").innerHTML =
        (selectSpace.dataset.whiteBoard === 'true' ? '있음' : '없음');
    // 빔프로젝터
    document.querySelector("#spaceReservationBeamProjector").innerHTML =
        (selectSpace.dataset.beamProjector === 'true' ? '있음' : '없음');
    // 공간 인원수
    document.querySelector("#spaceReservationPeopleCount").innerHTML =
        selectSpace.dataset.peopleCount + '명';

}
// 공간 예약 검색 조건 change
export async function onSpaceReservationSearchSelectChange() {

    // 공간 정보 보여주기
    onSpaceReservationSpaceChange();

    // 날짜 select
    const spaceReservationMonth = document.querySelector("#spaceReservationMonth");

    // 날짜
    const resDate = spaceReservationMonth.value;

    // 배열에 공휴일 정보 저장
    setSpaceReservationHolidays(await getHolidays(resDate));

    // 달력 그리기
    drawCalendar(resDate, getSpaceReservationHolidays);
}

// ------------------------------------------------------------------------------------------------
// 모달 닫기 이벤트 핸들러
export function onSpaceReservationWindowClick(event, modal, form) {
    if (event.target === document.querySelector(modal)) {
        hideElement(modal);

        // 폼 초기화
        document.querySelector(form).reset();
    }

    // 예약 등록 모달
    if (event.target === document.querySelector("#spaceReservationRegisterModal")) {
        document.querySelector(form)["startTime"].value = "";
        document.querySelector(form)["endTime"].value = "";

        hideElement("#spaceReservationRegisterFormTimeInputMsg");
        hideElement("#spaceReservationRegisterFormPeopleCountInputMsg");
        hideElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
        hideElement("#spaceReservationRegisterFormPurposeInputMsg");
    }
}
// 예약 등록 모달 닫기 버튼 click
export function onSpaceReservationRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
    document.querySelector(form)["startTime"].value = "";
    document.querySelector(form)["endTime"].value = "";

    hideElement("#spaceReservationRegisterFormTimeInputMsg");
    hideElement("#spaceReservationRegisterFormPeopleCountInputMsg");
    hideElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
    hideElement("#spaceReservationRegisterFormPurposeInputMsg");
}
// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 - 날짜 click 이벤트 핸들러
export async function onSpaceReservationCalendarContainerClick(event) {
    event.preventDefault();

    // 날짜 click 이벤트
    if (event.target.classList.contains("reservationDate")) {
        const reservationDate = event.target;
        const resDate = reservationDate.dataset.resDate;

        const userNo = document.querySelector("#spaceReservationRegisterForm")["userNo"].value;

        const space = document.querySelector("#selectSpace").selectedOptions[0];
        const spaceNo = space.dataset.spaceNo;
        const spaceAvailableStartTime = space.dataset.spaceAvailableStartTime;
        const spaceAvailableEndTime = space.dataset.spaceAvailableEndTime;

        const peopleCount = space.dataset.peopleCount;

        let unavailableStartTimeList = await getUnavailableSpaceReservationStartTimeList(userNo, spaceNo, resDate);

        generateTimeButtons(spaceAvailableStartTime, spaceAvailableEndTime, "#timeSlotContainer", unavailableStartTimeList, resDate);

        // 정보 표시 및 값 설정
        // 날짜
        document.querySelector("#spaceReservationRegisterFormResDate").value
            = resDate;
        // 인원수
        document.querySelector("#spaceReservationRegisterFormPeopleCount").value
            = peopleCount;
        // 공간 번호
        document.querySelector("#spaceReservationRegisterForm")["spaceNo"].value
            = spaceNo;

        showElement("#spaceReservationRegisterModal");
    }
}
// 예약 등록 - 시간 click 이벤트
export async function onSpaceReservationTimeSlotBtnClick(event) {
    if (event.target.classList.contains("timeSlotBtn")) {
        const timeSlotBtn =  event.target;

        // 모든 버튼에서 active 스타일 제거
        document.querySelectorAll(".timeSlotBtn").forEach(btn => {
            btn.classList.remove("bg-blue-500", "hover:bg-blue-600", "text-white");
            btn.classList.add("bg-white", "hover:bg-gray-300", "text-black");
        });

        // 클릭된 버튼에 active 스타일 적용
        timeSlotBtn.classList.remove("bg-white", "hover:bg-gray-300", "text-black");
        timeSlotBtn.classList.add("bg-blue-500", "hover:bg-blue-600", "text-white");

        document.querySelector("#spaceReservationRegisterForm")["startTime"].value = timeSlotBtn.dataset.startTime;
        document.querySelector("#spaceReservationRegisterForm")["endTime"].value = timeSlotBtn.dataset.endTime;

        hideElement("#spaceReservationRegisterFormTimeInputMsg");
    }
}
// 예약 등록 - 사용 목적 input 이벤트 핸들러
export function onSpaceReservationPurposeInput(event, inputMsg) {
    const purpose = event.target;

    // 사용 목적 입력값 확인 후 입력 메시지 출력
    if (purpose.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 예약 등록 - 인원수 input 이벤트 핸들러
export function onSpaceReservationPeopleCountInput(event, inputMsg, checkMsg) {
    const peopleCount = event.target;

    // 공간 예약 등록 공간 select
    const space = document.querySelector("#selectSpace").selectedOptions[0];

    const spacePeopleCount = space.dataset.peopleCount;

    // 인원수 입력 확인 후 입력 메시지 출력
    if (peopleCount.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 인원수 입력값 검증 후 검증 메시지 출력
    if (isNaN(peopleCount.value.trim()) ||
        parseInt(peopleCount.value.trim()) < 1 ||
        parseInt(peopleCount.value.trim()) > parseInt(spacePeopleCount)) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
    }
}
// 예약 등록 폼 - 등록하기 버튼 click 이벤트 핸들러
export async function onSpaceReservationRegisterFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const spaceReservationRegisterForm =
        document.querySelector("#spaceReservationRegisterForm");

    const spaceReservationRegisterFormStartTime =
        spaceReservationRegisterForm["startTime"];

    const spaceReservationRegisterFormPeopleCount =
        document.querySelector("#spaceReservationRegisterFormPeopleCount");
    const spaceReservationRegisterFormPurpose =
        document.querySelector("#spaceReservationRegisterFormPurpose");

    // 공간 select
    const space = document.querySelector("#selectSpace")
        .selectedOptions[0];

    const spacePeopleCount = space.dataset.peopleCount;
    
    // 입력값 검증
    // 시간 선택 안 함
    if (spaceReservationRegisterFormStartTime.value.trim() == "") {
        showElement("#spaceReservationRegisterFormTimeInputMsg");
        return ;
    }

    // 인원수 입력값 없음
    if (spaceReservationRegisterFormPeopleCount.value.trim() == "") {
        spaceReservationRegisterFormPeopleCount.focus();
        showElement("#spaceReservationRegisterFormPeopleCountInputMsg");
        return ;
    }
    // 인원수 입력값 검증
    if (isNaN(spaceReservationRegisterFormPeopleCount.value.trim()) ||
        parseInt(spaceReservationRegisterFormPeopleCount.value.trim()) < 1 ||
        parseInt(spaceReservationRegisterFormPeopleCount.value.trim()) > parseInt(spacePeopleCount)) {
        spaceReservationRegisterFormPeopleCount.focus();
        showElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
        return ;
    }
    // 사용 목적 입력값 없음
    if (spaceReservationRegisterFormPurpose.value.trim() == "") {
        spaceReservationRegisterFormPurpose.focus();
        showElement("#spaceReservationRegisterFormPurposeInputMsg");
        return ;
    }

    // 예약 등록
    const result = await sendFormData("/api/reservation/space",
                                            "POST",
        spaceReservationRegisterForm);
    const message = await result.text();

    // 예약 등록 모달 닫기
    hideElement("#spaceReservationRegisterModal");
    // 폼 초기화
    spaceReservationRegisterForm.reset();
    spaceReservationRegisterForm["startTime"].value = "";
    spaceReservationRegisterForm["endTime"].value = "";

    // 알림 메시지
    showAlertMessage(message);
}
