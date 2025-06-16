import {
    getHolidays,
    loadThisMonth,
    generateTimeButtons,
    drawCalendar
} from "../utils/reservationUtil.js";

import {
    showElement, hideElement,
    showAlertMessage, getAllowedCompressedFileExtensions
} from "../../../global/util/utils.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

import {
    getAdviceReservationHolidays,
    setAdviceReservationHolidays
} from "../adviceReservation.js";

import {
    getUnavailableAdviceReservationStartTimeList
} from "../api/adviceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 상담 예약 검색 초기화 버튼 click
export async function onSearchAdviceReservationFormResetBtnClick() {
    // 검색 조건 form
    const searchAdviceReservationForm = document.querySelector("#searchAdviceReservationForm");
    // form 초기화
    searchAdviceReservationForm.reset();

    // 오늘 날짜 select
    loadThisMonth("#adviceReservationMonth");

    await onAdviceReservationSearchSelectChange();
}

// 상담 예약 검색 조건 change
export async function onAdviceReservationSearchSelectChange() {

    // 날짜 select
    const adviceReservationMonth = document.querySelector("#adviceReservationMonth");

    // 날짜
    const resDate = adviceReservationMonth.value;

    // 배열에 공휴일 정보 저장
    setAdviceReservationHolidays(await getHolidays(resDate));

    // 달력 그리기
    drawCalendar(resDate, getAdviceReservationHolidays);
}

// ------------------------------------------------------------------------------------------------
// 모달 닫기 이벤트 핸들러
export function onAdviceReservationWindowClick(event, modal, form) {
    if (event.target === document.querySelector(modal)) {
        hideElement(modal);

        // 폼 초기화
        document.querySelector(form).reset();
    }

    // 예약 등록 모달
    if (event.target === document.querySelector("#adviceReservationRegisterModal")) {
        document.querySelector(form)["startTime"].value = "";
        document.querySelector(form)["endTime"].value = "";

        hideElement("#adviceReservationRegisterFormTimeInputMsg");
        hideElement("#adviceReservationRegisterFormAdviceFileInputMsg");
    }
}
// 예약 등록 모달 닫기 버튼 click
export function onAdviceReservationRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
    document.querySelector(form)["startTime"].value = "";
    document.querySelector(form)["endTime"].value = "";

    hideElement("#adviceReservationRegisterFormTimeInputMsg");
    hideElement("#adviceReservationRegisterFormAdviceFileInputMsg");
}
// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 - 날짜 click 이벤트 핸들러
export async function onAdviceReservationCalendarContainerClick(event) {
    event.preventDefault();

    // 날짜 click 이벤트
    if (event.target.classList.contains("reservationDate")) {
        const reservationDate = event.target;
        const resDate = reservationDate.dataset.resDate;

        const userNo = document.querySelector("#adviceReservationRegisterForm")["userNo"].value;

        const jobAdminNo = document.querySelector("#adviceReservationRegisterForm")["jobAdminNo"].value;

        let unavailableStartTimeList = await getUnavailableAdviceReservationStartTimeList(userNo, jobAdminNo, resDate);

        generateTimeButtons("09:00", "18:00", "#timeSlotContainer", unavailableStartTimeList, resDate);

        // 정보 표시 및 값 설정
        // 날짜
        document.querySelector("#adviceReservationRegisterFormResDate").value
            = resDate;

        showElement("#adviceReservationRegisterModal");
    }
}
// 예약 등록 - 시간 click 이벤트
export async function onAdviceReservationTimeSlotBtnClick(event) {
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

        document.querySelector("#adviceReservationRegisterForm")["startTime"].value = timeSlotBtn.dataset.startTime;
        document.querySelector("#adviceReservationRegisterForm")["endTime"].value = timeSlotBtn.dataset.endTime;

        hideElement("#adviceReservationRegisterFormTimeInputMsg");
    }
}
// 예약 등록 폼 - 파일 업로드 취소 버튼 클릭 이벤트 핸들러
export function onAdviceReservationRegisterFormAdviceFileCancelBtnClick(event) {
    event.preventDefault();

    hideElement("#adviceReservationRegisterFormAdviceFileInputMsg");

    document.querySelector("#adviceReservationRegisterFormAdviceFile").value = null;
}

// 예약 등록 폼 - 등록하기 버튼 click 이벤트 핸들러
export async function onAdviceReservationRegisterFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const adviceReservationRegisterForm =
        document.querySelector("#adviceReservationRegisterForm");
    const adviceReservationRegisterFormStartTime =
        adviceReservationRegisterForm["startTime"];
    const fileInput = document.querySelector("#adviceReservationRegisterFormAdviceFile");
    const file = fileInput.files[0];
    const allowedExtensions = getAllowedCompressedFileExtensions();

    // 시간 선택 안 함
    if (adviceReservationRegisterFormStartTime.value.trim() == "") {
        showElement("#adviceReservationRegisterFormTimeInputMsg");
        return ;
    }

    // 첨부파일 확장자 체크
    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if(!allowedExtensions.includes(fileExtension)) {
            showElement("#dviceReservationRegisterFormAdviceFileInputMsg");
            fileInput.value = "";
            return;
        }
    }

    // 예약 등록
    const result = await sendFormData("/api/reservation/advice",
                                            "POST",
        adviceReservationRegisterForm);
    const message = await result.text();

    // 예약 등록 모달 닫기
    hideElement("#adviceReservationRegisterModal");
    // 폼 초기화
    adviceReservationRegisterForm.reset();
    adviceReservationRegisterForm["startTime"].value = "";
    adviceReservationRegisterForm["endTime"].value = "";

    hideElement("#adviceReservationRegisterFormTimeInputMsg");
    hideElement("#adviceReservationRegisterFormAdviceFileInputMsg");

    // 알림 메시지
    showAlertMessage(message);
}
