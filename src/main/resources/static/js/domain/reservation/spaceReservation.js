import {
    loadThisMonth
} from "./utils/reservationUtil.js";

import {
    onSpaceReservationSearchSelectChange,
    onSearchSpaceReservationFormResetBtnClick,
    onSpaceReservationCalendarContainerClick,
    onSpaceReservationRegisterModalCloseBtnClick,
    onSpaceReservationWindowClick,
    onSpaceReservationTimeSlotBtnClick,
    onSpaceReservationPurposeInput,
    onSpaceReservationPeopleCountInput,
    onSpaceReservationRegisterFormSubmitBtnClick
} from "./handlers/spaceReservationHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    // 오늘 날짜 load 이벤트
    loadThisMonth("#spaceReservationMonth");
    // 검색 조건 change 및 달력 load
    await onSpaceReservationSearchSelectChange();

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 공간 select change 이벤트
    if (selectSpace != null) {
        selectSpace.addEventListener("change", onSpaceReservationSearchSelectChange);
    }
    // 날짜 select change 이벤트
    if (spaceReservationMonth != null) {
       spaceReservationMonth.addEventListener("change", onSpaceReservationSearchSelectChange);
    }
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchSpaceReservationFormResetBtn != null) {
        searchSpaceReservationFormResetBtn.addEventListener("click", onSearchSpaceReservationFormResetBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 날짜 click 이벤트 - 예약 등록 모달 open
    if (calendarContainer != null) {
        calendarContainer.addEventListener("click", onSpaceReservationCalendarContainerClick);
    }
    // 예약 등록 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceReservationRegisterModal";
        const form = "#spaceReservationRegisterForm";
        onSpaceReservationWindowClick(event, modal, form);
    });
    // 예약 등록 모달 닫기 버튼 click 이벤트
    if (spaceReservationRegisterModalCloseBtn != null) {
        spaceReservationRegisterModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceReservationRegisterModal";
            const form = "#spaceReservationRegisterForm";
            onSpaceReservationRegisterModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 등록 - 시간 click 이벤트
    if (timeSlotContainer != null) {
        timeSlotContainer.addEventListener("click", onSpaceReservationTimeSlotBtnClick);
    }
    // 예약 등록 폼 - 인원수 input 이벤트
    if (spaceReservationRegisterFormPeopleCount != null) {
        spaceReservationRegisterFormPeopleCount.addEventListener("input", (event) => {
            const inputMsg = "#spaceReservationRegisterFormPeopleCountInputMsg";
            const checkMsg = "#spaceReservationRegisterFormPeopleCountCheckMsg";
            onSpaceReservationPeopleCountInput(event, inputMsg, checkMsg);
        });
    }
    // 예약 등록 폼 - 사용 목적 input 이벤트
    if (spaceReservationRegisterFormPurpose != null) {
        spaceReservationRegisterFormPurpose.addEventListener("input", (event) => {
            const inputMsg = "#spaceReservationRegisterFormPurposeInputMsg";
            onSpaceReservationPurposeInput(event, inputMsg);
        });
    }
    // 예약 등록 폼 - 등록하기 버튼 click 이벤트
    if (spaceReservationRegisterFormSubmitBtn != null) {
        spaceReservationRegisterFormSubmitBtn.addEventListener("click", onSpaceReservationRegisterFormSubmitBtnClick);
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 날짜 select
const spaceReservationMonth = document.querySelector("#spaceReservationMonth");
// 공간 select
const selectSpace = document.querySelector("#selectSpace");
// 검색 조건 초기화 버튼
const searchSpaceReservationFormResetBtn = document.querySelector("#searchSpaceReservationFormResetBtn");

// ------------------------------------------------------------------------------------------------
// 달력
const calendarContainer = document.querySelector("#calendarContainer");

// 월별 공휴일 배열
let spaceReservationHolidays = [];
// getter
// 월별 공휴일 배열 반환
export function getSpaceReservationHolidays() {
    return spaceReservationHolidays;
}
// setter
// 월별 공휴일 배열 설정
export function setSpaceReservationHolidays(holidays) {
    spaceReservationHolidays = holidays;
}

// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 모달 닫기 버튼
const spaceReservationRegisterModalCloseBtn = document.querySelector("#spaceReservationRegisterModalCloseBtn");
// 예약 등록 폼 - 타임 슬롯
const timeSlotContainer = document.querySelector("#timeSlotContainer");
// 예약 등록 폼 - 인원수
const spaceReservationRegisterFormPeopleCount = document.querySelector("#spaceReservationRegisterFormPeopleCount");
// 예약 등록 폼 - 사용 목적
const spaceReservationRegisterFormPurpose = document.querySelector("#spaceReservationRegisterFormPurpose");
// 예약 등록 폼 - 등록하기 버튼
const spaceReservationRegisterFormSubmitBtn = document.querySelector("#spaceReservationRegisterFormSubmitBtn");
