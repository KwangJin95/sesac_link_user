import {
    loadToday
} from "./utils/reservationUtil.js";

import {
    onSpaceReservationSearchSelectChange,
    onSearchSpaceReservationFormResetBtnClick,
    onSpaceReservationTbodyClick,
    onSpaceReservationCancelModalCloseBtnClick,
    onSpaceReservationCancelFormSubmitBtnClick
} from "./handlers/mySpaceReservationHandler.js";

import {
    onMyReservationWindowClick
} from "./handlers/myReservationHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    // 오늘 날짜 load 이벤트
    loadToday("#spaceReservationDate");
    // 예약 목록 테이블 load
    await onSpaceReservationSearchSelectChange();

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchSpaceReservationFormResetBtn != null) {
        searchSpaceReservationFormResetBtn.addEventListener("click", onSearchSpaceReservationFormResetBtnClick);
    }
    // 날짜 select change 이벤트
    if (spaceReservationDate != null) {
        spaceReservationDate.addEventListener("change", onSpaceReservationSearchSelectChange);
    }
    // 예약 상태 select change 이벤트
    if (selectReservationStatus != null) {
        selectReservationStatus.addEventListener("change", onSpaceReservationSearchSelectChange);
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 취소
    // 예약 취소 버튼 클릭 이벤트
    if (spaceReservationTbody != null) {
        spaceReservationTbody.addEventListener("click", onSpaceReservationTbodyClick);
    }
    // 예약 취소 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceReservationCancelModal";
        const form  = "#spaceReservationCancelForm";
        onMyReservationWindowClick(event, modal, form);
    });
    // 예약 취소 모달 닫기 버튼 click 이벤트
    if (spaceReservationCancelModalCloseBtn != null) {
        spaceReservationCancelModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceReservationCancelModal";
            const form  = "#spaceReservationCancelForm";
            onSpaceReservationCancelModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 취소 - 취소하기 버튼 클릭
    if (spaceReservationCancelFormSubmitBtn != null) {
        spaceReservationCancelFormSubmitBtn.addEventListener("click", (event) => {
            onSpaceReservationCancelFormSubmitBtnClick(event, onSpaceReservationSearchSelectChange);
        });
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 날짜 select
const spaceReservationDate = document.querySelector("#spaceReservationDate");
// 예약 상태 select
const selectReservationStatus = document.querySelector("#selectReservationStatus");
// 검색 조건 초기화 버튼
const searchSpaceReservationFormResetBtn = document.querySelector("#searchSpaceReservationFormResetBtn");

// ------------------------------------------------------------------------------------------------
// 예약 목록 테이블
const spaceReservationTbody = document.querySelector("#spaceReservationTbody");
// 예약 상태 변경 모달 닫기 버튼
const spaceReservationCancelModalCloseBtn = document.querySelector("#spaceReservationCancelModalCloseBtn");
// 예약 상태 변경 - 변경하기 버튼
const spaceReservationCancelFormSubmitBtn = document.querySelector("#spaceReservationCancelFormSubmitBtn");