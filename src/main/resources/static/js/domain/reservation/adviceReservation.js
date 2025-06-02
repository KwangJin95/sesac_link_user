import {
    loadThisMonth
} from "./utils/reservationUtil.js";
import {
    onAdviceReservationCalendarContainerClick, onAdviceReservationRegisterFormAdviceFileCancelBtnClick,
    onAdviceReservationRegisterFormSubmitBtnClick,
    onAdviceReservationRegisterModalCloseBtnClick,
    onAdviceReservationSearchSelectChange,
    onAdviceReservationTimeSlotBtnClick,
    onAdviceReservationWindowClick,
    onSearchAdviceReservationFormResetBtnClick
} from "./handlers/adviceReservationHandler.js";


// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    // 오늘 날짜 load 이벤트
    loadThisMonth("#adviceReservationMonth");
    // 검색 조건 change 및 달력 load
    await onAdviceReservationSearchSelectChange();

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 날짜 select change 이벤트
    if (adviceReservationMonth != null) {
        adviceReservationMonth.addEventListener("change", onAdviceReservationSearchSelectChange);
    }
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchAdviceReservationFormResetBtn != null) {
        searchAdviceReservationFormResetBtn.addEventListener("click", onSearchAdviceReservationFormResetBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 날짜 click 이벤트 - 예약 등록 모달 open
    if (calendarContainer != null) {
        calendarContainer.addEventListener("click", onAdviceReservationCalendarContainerClick);
    }
    // 예약 등록 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adviceReservationRegisterModal";
        const form = "#adviceReservationRegisterForm";
        onAdviceReservationWindowClick(event, modal, form);
    });
    // 예약 등록 모달 닫기 버튼 click 이벤트
    if (adviceReservationRegisterModalCloseBtn != null) {
        adviceReservationRegisterModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adviceReservationRegisterModal";
            const form = "#adviceReservationRegisterForm";
            onAdviceReservationRegisterModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 등록 - 시간 click 이벤트
    if (timeSlotContainer != null) {
        timeSlotContainer.addEventListener("click", onAdviceReservationTimeSlotBtnClick);
    }
    // 첨부파일 취소 버튼
    if (adviceReservationRegisterFormAdviceFileCancelBtn != null) {
        adviceReservationRegisterFormAdviceFileCancelBtn.addEventListener("click" , onAdviceReservationRegisterFormAdviceFileCancelBtnClick);
    }
    // 예약 등록 폼 - 등록하기 버튼 click 이벤트
    if (adviceReservationRegisterFormSubmitBtn != null) {
        adviceReservationRegisterFormSubmitBtn.addEventListener("click", onAdviceReservationRegisterFormSubmitBtnClick);
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 날짜 select
const adviceReservationMonth = document.querySelector("#adviceReservationMonth");
// 검색 조건 초기화 버튼
const searchAdviceReservationFormResetBtn = document.querySelector("#searchAdviceReservationFormResetBtn");

// ------------------------------------------------------------------------------------------------
// 달력
const calendarContainer = document.querySelector("#calendarContainer");

// 월별 공휴일 배열
let adviceReservationHolidays = [];
// getter
// 월별 공휴일 배열 반환
export function getAdviceReservationHolidays() {
    return adviceReservationHolidays;
}
// setter
// 월별 공휴일 배열 설정
export function setAdviceReservationHolidays(holidays) {
    adviceReservationHolidays = holidays;
}

// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 모달 닫기 버튼
const adviceReservationRegisterModalCloseBtn = document.querySelector("#adviceReservationRegisterModalCloseBtn");
// 예약 등록 폼 - 타임 슬롯
const timeSlotContainer = document.querySelector("#timeSlotContainer");
// 첨부 파일 취소 버튼
const adviceReservationRegisterFormAdviceFileCancelBtn = document.querySelector("#adviceReservationRegisterFormAdviceFileCancelBtn");
// 예약 등록 폼 - 등록하기 버튼
const adviceReservationRegisterFormSubmitBtn = document.querySelector("#adviceReservationRegisterFormSubmitBtn");
