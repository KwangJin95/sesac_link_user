import {
    loadToday
} from "../utils/reservationUtil.js";

import {
    showElement, hideElement,
    showAlertMessage
} from "../../../global/util/utils.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

import {
    getSpaceReservationList
} from "../api/spaceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 공간 예약 목록 초기화 버튼 click
export async function onSearchSpaceReservationFormResetBtnClick() {
    // 검색 조건 form
    const searchSpaceReservationForm = document.querySelector("#searchSpaceReservationForm");
    // form 초기화
    searchSpaceReservationForm.reset();

    // 오늘 날짜 select
    loadToday("#spaceReservationDate");

    // 예약 목록 생성
    await onSpaceReservationSearchSelectChange();
}
// 공간 예약 목록
export async function onSpaceReservationSearchSelectChange() {
    // 날짜 select
    const spaceReservationDate = document.querySelector("#spaceReservationDate");

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];

    // 날짜
    const resDate = spaceReservationDate.value;
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    const userNo = document.querySelector("#searchSpaceReservationForm").userNo.value;

    // 공간 예약 목록
    let spaceReservationList = await getSpaceReservationList(userNo, resDate, statusName);

    // 목록 생성
    // 공간 예약 목록 tbody
    const spaceReservationTbody = document.querySelector("#spaceReservationTbody");

    let str = "";
    let previousStartTime = null;

    if (!spaceReservationList || spaceReservationList.length === 0) {
        str += `
        <tr class="hover:bg-gray-50">
            <td colSpan="7" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td>
        </tr>
        `;
    } else {
        spaceReservationList.forEach(dto => {

            let isCancelable = dto.statusNameKor !== "취소" && dto.statusNameKor !== "거절";
            let cancelBtnDisabledAttr = isCancelable ? "" : "disabled";
            let cancelBtnClass = isCancelable
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300";

            // 이전 시간과 다르면 빈 줄 추가
            if (previousStartTime !== null && dto.startTime !== previousStartTime) {
                str += `
                <tr><td colspan="7" class="py-1 bg-white bg-gray-400"></td></tr>
            `;
            }

            let statusColorClass = "";

            switch (dto.statusNameKor) {
                case "승인":
                    statusColorClass = "text-blue-600";
                    break;
                case "취소":
                    statusColorClass = "text-gray-600";
                    break;
                case "거절":
                    statusColorClass = "text-red-600";
                    break;
                default:
                    statusColorClass = "text-black";
            }

            str += `
            <tr class="hover:bg-gray-50 border-b">
                <td class="py-1 px-1 text-center border border-gray-300">${dto.resDate}</td>
                <td class="py-1 px-1 text-center border border-gray-300">${dto.spaceName}</td>
                <td class="py-1 px-1 text-center border border-gray-300">${dto.startTime} - ${dto.endTime}</td>
                <td class="py-1 px-1 text-center border border-gray-300">${dto.peopleCount}</td>
                <td class="py-1 px-1 text-left border border-gray-300 truncate max-w-[180px]" title="${dto.purpose}">${dto.purpose}</td>
                <td class="py-1 px-1 text-center border border-gray-300 font-bold ${statusColorClass}">${dto.statusNameKor}</td>
                
                <td class="py-1 px-1 text-center border border-gray-300">
                    <div class="flex justify-center space-x-3">
                        <button class="spaceReservationCancelBtn px-1 py-1 text-xs text-white rounded ${cancelBtnClass}"
                                ${cancelBtnDisabledAttr}
                                data-space-reservation-no="${dto.spaceReservationNo}"
                                data-space-no="${dto.spaceNo}"
                                data-status-name-kor="${dto.statusNameKor}"
                                data-space-name="${dto.spaceName}"
                                data-res-date="${dto.resDate}"
                                data-start-time="${dto.startTime}" 
                                data-end-time="${dto.endTime}" 
                                data-user-name="${dto.userName}" 
                        >
                            예약 취소
                        </button>
                    </div>
                </td>
            </tr>
        `;
            previousStartTime = dto.startTime;
        });
    }
    spaceReservationTbody.innerHTML = str;
}

// ------------------------------------------------------------------------------------------------
// 예약 취소
// 예약 테이블 click 이벤트 핸들러
export async function onSpaceReservationTbodyClick(event) {
    event.preventDefault();

    // 예약 취소 버튼 클릭 이벤트
    if (event.target.classList.contains("spaceReservationCancelBtn")) {
        const spaceReservationCancelBtn = event.target;

        const resDate = spaceReservationCancelBtn.dataset.resDate;
        const startTime = spaceReservationCancelBtn.dataset.startTime;
        const endTime = spaceReservationCancelBtn.dataset.endTime;

        const userName = spaceReservationCancelBtn.dataset.userName;

        const spaceNo = spaceReservationCancelBtn.dataset.spaceNo;
        const spaceName = spaceReservationCancelBtn.dataset.spaceName;

        const statusNameKor = spaceReservationCancelBtn.dataset.statusNameKor;

        const spaceReservationNo = spaceReservationCancelBtn.dataset.spaceReservationNo;

        // 정보 표시 및 값 설정
        // 날짜
        document.querySelector("#spaceReservationCancelFormResDate").value
            = resDate;
        // 시간
        document.querySelector("#spaceReservationCancelFormTime").value
            = startTime + " - " + endTime;
        // 예약자
        document.querySelector("#spaceReservationCancelFormUserName").value
            = userName;
        // 예약 상태
        document.querySelector("#spaceReservationCancelFormReservationStatus").value
            = statusNameKor;
        // 공간 번호
        document.querySelector("#spaceReservationCancelFormSpaceNo").value
            = spaceNo;
        // 공간 이름
        document.querySelector("#spaceReservationCancelFormSpaceName").value
            = spaceName;

        // 공간 예약 번호
        document.querySelector("#spaceReservationCancelFormSpaceReservationNo").value
            = spaceReservationNo;

        showElement("#spaceReservationCancelModal");
    }
}
// 예약 취소 폼 - 취소하기 버튼 click 이벤트 핸들러
export async function onSpaceReservationCancelFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const spaceReservationCancelForm =
        document.querySelector("#spaceReservationCancelForm");

    // 예약 취소
    const result = await sendFormData("/api/reservation/space",
                                            "DELETE",
        spaceReservationCancelForm);
    const message = await result.text();

    // 예약 취소 모달 닫기
    hideElement("#spaceReservationCancelModal");

    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    await onSpaceReservationSearchSelectChange();

}
// 예약 취소 모달 닫기 버튼 click
export function onSpaceReservationCancelModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
}


















// ------------------------------------------------------------------------------------------------
/*
// 예약 등록
// 예약 등록 버튼 click
export async function onSpaceReservationRegisterBtnClick(event) {
    event.preventDefault();

    // 공간 예약 등록 공간 select
    const spaceReservationRegisterFormSpace = document.querySelector("#spaceReservationRegisterFormSpace");

    // 공간 목록 없음
    if (!spaceReservationRegisterFormSpace ||
         spaceReservationRegisterFormSpace.selectedOptions.length === 0 ||
         spaceReservationRegisterFormSpace.selectedOptions[0].disabled) {
        return;
    }

    // 기존 필터링된 공간으로 세팅
    spaceReservationRegisterFormSpace.value = document.querySelector("#selectSpace").value;

    // 오늘 날짜 load
    loadToday("#spaceReservationRegisterFormResDate");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 오늘 날짜 이후로 select 하도록 min 설정
    document.querySelector("#spaceReservationRegisterFormResDate")
        .setAttribute("min", todayStr);

    // 예약 등록 공간 정보 세팅
    await onSpaceReservationRegisterFormSpaceChange();

    showElement("#spaceReservationRegisterModal");
}
// 예약 등록 - 공간 change
export async function onSpaceReservationRegisterFormSpaceChange() {
    // 공간 예약 등록 공간 select
    const space =
        document.querySelector("#spaceReservationRegisterFormSpace").selectedOptions[0];

    // 공간 시작 시간
    const spaceAvailableStartTime = space.dataset.spaceAvailableStartTime;
    // 공간 종료 시간
    const spaceAvailableEndTime = space.dataset.spaceAvailableEndTime;

    // 공간 정보 보여주기
    // 공간 이미지
    document.querySelector("#spaceReservationRegisterFormSpaceImage").innerHTML =
        '<img src="/api/space/view/' + space.dataset.spaceImage + '" class="w-64 h-40" />';
    // 화이트보드
    document.querySelector("#spaceReservationRegisterFormSpaceWhiteBoard").innerHTML =
        (space.dataset.whiteBoard ? '있음' : '없음');
    // 빔프로젝터
    document.querySelector("#spaceReservationRegisterFormSpaceBeamProjector").innerHTML =
        (space.dataset.beamProjector ? '있음' : '없음');
    // 공간 인원수
    document.querySelector("#spaceReservationRegisterFormSpacePeopleCount").innerHTML =
        space.dataset.peopleCount + '명';

    let timeOptionValue = spaceAvailableStartTime;
    let str = "";

    str += `<option value=${timeOptionValue}>${timeOptionValue}</option>`;
    // 공간 시작 시간 ~ 종료 시간 option 추가
    while (timeOptionValue !== spaceAvailableEndTime){
        timeOptionValue = addOneHour(timeOptionValue);
        str += `<option value=${timeOptionValue}>${timeOptionValue}</option>`;
    }

    const spaceReservationRegisterFormStartTime = document.querySelector("#spaceReservationRegisterFormStartTime");
    const spaceReservationRegisterFormEndTime = document.querySelector("#spaceReservationRegisterFormEndTime");

    spaceReservationRegisterFormStartTime.innerHTML = str;
    spaceReservationRegisterFormEndTime.innerHTML = str;

    spaceReservationRegisterFormEndTime.value = spaceAvailableEndTime;
}
// 예약 등록 - 시작 및 종료 시간 change 이벤트 핸들러
export function onSpaceReservationAvailableTimeChange(startTime, endTime, checkMsg) {

    const availableStartTime = document.querySelector(startTime).value;
    const availableEndTime = document.querySelector(endTime).value;

    const today = new Date().toISOString().split("T")[0]

    const startDate = new Date(`${today}T${availableStartTime}`);
    const endDate = new Date(`${today}T${availableEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
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
    const space = document.querySelector("#spaceReservationRegisterFormSpace").selectedOptions[0];

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
// 예약 등록 모달 닫기 버튼 click
export function onSpaceReservationRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#spaceReservationRegisterFormPeopleCountInputMsg");
    hideElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
    hideElement("#spaceReservationRegisterFormPurposeInputMsg");
    hideElement("#spaceReservationRegisterFormAvailableTimeCheckMsg");
}
// 예약 등록 폼 - 등록하기 버튼 click 이벤트 핸들러
export async function onSpaceReservationRegisterFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const spaceReservationRegisterForm = document.querySelector("#spaceReservationRegisterForm");

    const spaceReservationRegisterFormPeopleCount =
        document.querySelector("#spaceReservationRegisterFormPeopleCount");
    const spaceReservationRegisterFormPurpose =
        document.querySelector("#spaceReservationRegisterFormPurpose");
    const spaceReservationRegisterFormStartTime =
        document.querySelector("#spaceReservationRegisterFormStartTime").value;
    const spaceReservationRegisterFormEndTime =
        document.querySelector("#spaceReservationRegisterFormEndTime").value;

    // 공간 예약 등록 공간 select
    const space = document.querySelector("#spaceReservationRegisterFormSpace").selectedOptions[0];

    const spacePeopleCount = space.dataset.peopleCount;

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

    const today     = new Date().toISOString().split("T")[0]
    const startDate = new Date(`${today}T${spaceReservationRegisterFormStartTime}`);
    const endDate   = new Date(`${today}T${spaceReservationRegisterFormEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement("#spaceRegisterFormAvailableTimeCheckMsg");
        return ;
    }

    // 예약 등록
    const result = await sendFormData("/api/reservation/space",
                                            "POST",
                                                    spaceReservationRegisterForm);
    const message = await result.text();

    // 예약 등록 모달 닫기
    hideElement("#spaceReservationRegisterModal");

    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    // 공간 예약 목록
    if (typeof callback === "function") {
        await callback();
    }

}
*/