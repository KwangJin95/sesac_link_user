import {
    loadToday
} from "./utils/reservationUtil.js";

import {
    onMyReservationWindowClick
} from "./handlers/myReservationHandler.js";

import {
    onAdviceFileCancelBtnClick,
    onAdviceReservationCancelFormSubmitBtnClick,
    onAdviceReservationCancelModalCloseBtnClick,
    onAdviceReservationModifyFormSubmitBtnClick,
    onAdviceReservationModifyModalCloseBtnClick,
    onAdviceReservationSearchSelectChange,
    onAdviceReservationTbodyClick,
    onSearchAdviceReservationFormResetBtnClick
} from "./handlers/myAdviceReservationHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    // 오늘 날짜 load 이벤트
    loadToday("#adviceReservationDate");
    // 예약 목록 테이블 load
    await onAdviceReservationSearchSelectChange();

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchAdviceReservationFormResetBtn != null) {
        searchAdviceReservationFormResetBtn.addEventListener("click", onSearchAdviceReservationFormResetBtnClick);
    }
    // 날짜 select change 이벤트
    if (adviceReservationDate != null) {
        adviceReservationDate.addEventListener("change", onAdviceReservationSearchSelectChange);
    }
    // 예약 상태 select change 이벤트
    if (selectReservationStatus != null) {
        selectReservationStatus.addEventListener("change", onAdviceReservationSearchSelectChange);
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 목록 click 이벤트
    if (adviceReservationTbody != null) {
        adviceReservationTbody.addEventListener("click", onAdviceReservationTbodyClick);
    }
    // 예약 수정 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adviceReservationModifyModal";
        const form  = "#adviceReservationModifyForm";
        onMyReservationWindowClick(event, modal, form);
    });
    // 예약 수정 모달 닫기 버튼 click 이벤트
    if (adviceReservationModifyModalCloseBtn != null) {
        adviceReservationModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adviceReservationModifyModal";
            const form  = "#adviceReservationModifyForm";
            onAdviceReservationModifyModalCloseBtnClick(event, modal, form);
        });
    }
    // 첨부파일 취소 버튼
    if (adviceFileCancelBtn != null) {
        adviceFileCancelBtn.addEventListener("click" , onAdviceFileCancelBtnClick);
    }
    // 예약 수정 폼 - 수정하기 버튼 click 이벤트
    if (adviceReservationModifyFormSubmitBtn != null) {
        adviceReservationModifyFormSubmitBtn.addEventListener("click", (event) => {
            onAdviceReservationModifyFormSubmitBtnClick(event, onAdviceReservationSearchSelectChange);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 취소
    // 예약 취소 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adviceReservationCancelModal";
        const form  = "#adviceReservationCancelForm";
        onMyReservationWindowClick(event, modal, form);
    });
    // 예약 취소 모달 닫기 버튼 click 이벤트
    if (adviceReservationCancelModalCloseBtn != null) {
        adviceReservationCancelModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adviceReservationCancelModal";
            const form  = "#adviceReservationCancelForm";
            onAdviceReservationCancelModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 취소 - 취소하기 버튼 클릭
    if (adviceReservationCancelFormSubmitBtn != null) {
        adviceReservationCancelFormSubmitBtn.addEventListener("click", (event) => {
            onAdviceReservationCancelFormSubmitBtnClick(event, onAdviceReservationSearchSelectChange);
        });
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 날짜 select
const adviceReservationDate = document.querySelector("#adviceReservationDate");
// 예약 상태 select
const selectReservationStatus = document.querySelector("#selectReservationStatus");
// 검색 조건 초기화 버튼
const searchAdviceReservationFormResetBtn = document.querySelector("#searchAdviceReservationFormResetBtn");

// ------------------------------------------------------------------------------------------------
// 예약 목록 테이블
const adviceReservationTbody = document.querySelector("#adviceReservationTbody");
// 첨부 파일 취소 버튼
const adviceFileCancelBtn = document.querySelector("#adviceFileCancelBtn");

// 예약 수정 모달 닫기 버튼
const adviceReservationModifyModalCloseBtn = document.querySelector("#adviceReservationModifyModalCloseBtn");

// 예약 취소 모달 닫기 버튼
const adviceReservationCancelModalCloseBtn = document.querySelector("#adviceReservationCancelModalCloseBtn");
// 예약 수정 폼 - 수정하기 버튼
const adviceReservationModifyFormSubmitBtn = document.querySelector("#adviceReservationModifyFormSubmitBtn");
// 예약 취소 폼 - 취소하기 버튼
const adviceReservationCancelFormSubmitBtn = document.querySelector("#adviceReservationCancelFormSubmitBtn");