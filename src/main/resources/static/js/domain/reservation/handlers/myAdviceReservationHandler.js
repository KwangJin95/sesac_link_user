import {
    loadToday
} from "../utils/reservationUtil.js";

import {
    showElement, hideElement,
    showAlertMessage, getAllowedCompressedFileExtensions
} from "../../../global/util/utils.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

import {
    getAdviceReservationList
} from "../api/adviceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 상담 예약 목록 초기화 버튼 click
export async function onSearchAdviceReservationFormResetBtnClick() {
    // 검색 조건 form
    const searchAdviceReservationForm = document.querySelector("#searchAdviceReservationForm");
    // form 초기화
    searchAdviceReservationForm.reset();

    // 오늘 날짜 select
    loadToday("#adviceReservationDate");

    // 예약 목록 생성
    await onAdviceReservationSearchSelectChange();
}
// 상담 예약 목록
export async function onAdviceReservationSearchSelectChange() {
    // 날짜 select
    const adviceReservationDate = document.querySelector("#adviceReservationDate");

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];

    // 날짜
    const resDate = adviceReservationDate.value;
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    const userNo = document.querySelector("#searchAdviceReservationForm").userNo.value;
    const jobAdminNo = document.querySelector("#searchAdviceReservationForm").jobAdminNo.value;

    // 상담 예약 목록
    let adviceReservationList = await getAdviceReservationList(userNo,
                                                               jobAdminNo,
                                                               resDate,
                                                               statusName);

    // 목록 생성
    // 상담 예약 목록 tbody
    const adviceReservationTbody = document.querySelector("#adviceReservationTbody");

    let str = "";
    let previousStartTime = null;

    if (!adviceReservationList || adviceReservationList.length === 0) {
        str += `
        <tr class="hover:bg-gray-50">
            <td colSpan="7" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td>
        </tr>
        `;
    } else {
        adviceReservationList.forEach(dto => {

            let isModifyable = dto.statusNameKor !== "취소" && dto.statusNameKor !== "거절";
            let modifyBtnDisabledAttr = isModifyable ? "" : "disabled";
            let modifyBtnClass = isModifyable
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300";

            let isCancelable = dto.statusNameKor !== "취소" && dto.statusNameKor !== "거절";
            let cancelBtnDisabledAttr = isCancelable ? "" : "disabled";
            let cancelBtnClass = isCancelable
                ? "bg-red-500 hover:bg-red-600 cursor-pointer"
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
                <td class="py-1 px-1 text-center border border-gray-300">${dto.startTime} - ${dto.endTime}</td>
                <td class="py-1 px-1 text-center border border-gray-300 font-bold ${statusColorClass}">${dto.statusNameKor}</td>
                <td class="py-1 px-1 text-center border border-gray-300">
                    ${dto.adviceFile != null && dto.adviceFile !== '' ?
                `<div class="flex justify-center space-x-3">
                                    <button class="adviceFileDownloadBtn px-1 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                                            data-advice-file="${dto.adviceFile}"
                                    >
                                        다운로드
                                    </button>
                                </div>` :
                ``
            }
                </td>
                <td class="py-1 px-1 text-center border border-gray-300">
                    <div class="flex justify-center space-x-2">
                        <button class="adviceReservationModifyBtn px-1 py-1 text-xs text-white rounded ${modifyBtnClass}"
                                ${modifyBtnDisabledAttr}
                                data-advice-reservation-no="${dto.adviceReservationNo}"
                                data-advice-file="${dto.adviceFile}" 
                        >
                            첨부파일 수정
                        </button>
                        <button class="adviceReservationCancelBtn px-1 py-1 text-xs text-white rounded ${cancelBtnClass}"
                                ${cancelBtnDisabledAttr}
                                data-advice-reservation-no="${dto.adviceReservationNo}"
                                data-status-name-kor="${dto.statusNameKor}"
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
    adviceReservationTbody.innerHTML = str;
}

// 첨부파일 수정 - 파일 업로드 취소 버튼 클릭 이벤트 핸들러
export function onAdviceFileCancelBtnClick(event) {
    event.preventDefault();

    hideElement("#adviceFileInputMsg");

    document.querySelector("#adviceFile").value = null;
}

// ------------------------------------------------------------------------------------------------
// 예약 테이블 click 이벤트 핸들러
export async function onAdviceReservationTbodyClick(event) {
    event.preventDefault();

    // 첨부파일 수정 버튼 클릭 이벤트
    if (event.target.classList.contains("adviceReservationModifyBtn")) {
        const adviceReservationModifyBtn = event.target;

        // 상담 예약 번호
        document.querySelector("#adviceReservationModifyFormAdviceReservationNo").value
            = adviceReservationModifyBtn.dataset.adviceReservationNo;

        showElement("#adviceReservationModifyModal");
    }
    // 첨부파일 다운로드 버튼 click 이벤트
    if (event.target.classList.contains("adviceFileDownloadBtn")) {
        const adviceFileDownloadBtn = event.target;

        // 첨부파일 이름
        const adviceFile = adviceFileDownloadBtn.dataset.adviceFile;

        await fetch(`/api/reservation/advice/advice-file/${adviceFile}`, {
            method: 'GET'
        })
            .then(async response => {
                const blob = await response.blob();

                // disposition 헤더 추출
                const disposition = response.headers.get('Content-Disposition');

                const filenameMatch = disposition && disposition.match(/filename="?([^"]+)"?/);

                const filename = filenameMatch ? filenameMatch[1] : 'downloaded-file';

                // 파일 다운로드 링크 생성
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = decodeURIComponent(filename); // 한글 깨짐 방지
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('다운로드 실패:', error);
            });
    }
    // 예약 취소 버튼 클릭 이벤트
    if (event.target.classList.contains("adviceReservationCancelBtn")) {
        const adviceReservationCancelBtn = event.target;

        const resDate = adviceReservationCancelBtn.dataset.resDate;
        const startTime = adviceReservationCancelBtn.dataset.startTime;
        const endTime = adviceReservationCancelBtn.dataset.endTime;

        const userName = adviceReservationCancelBtn.dataset.userName;
        const statusNameKor = adviceReservationCancelBtn.dataset.statusNameKor;

        const adviceReservationNo = adviceReservationCancelBtn.dataset.adviceReservationNo;

        // 정보 표시 및 값 설정
        // 날짜
        document.querySelector("#adviceReservationCancelFormResDate").value
            = resDate;
        // 시간
        document.querySelector("#adviceReservationCancelFormTime").value
            = startTime + " - " + endTime;
        document.querySelector("#adviceReservationCancelFormStartTime").value
            = startTime;
        document.querySelector("#adviceReservationCancelFormEndTime").value
            = endTime;
        // 예약자
        document.querySelector("#adviceReservationCancelFormUserName").value
            = userName;
        // 예약 상태
        document.querySelector("#adviceReservationCancelFormReservationStatus").value
            = statusNameKor;
        // 상담 예약 번호
        document.querySelector("#adviceReservationCancelFormAdviceReservationNo").value
            = adviceReservationNo;

        showElement("#adviceReservationCancelModal");
    }
}
// 첨부파일 수정 폼 - 수정하기 버튼 click 이벤트 핸들러
export async function onAdviceReservationModifyFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const adviceReservationModifyForm =
        document.querySelector("#adviceReservationModifyForm");
    const fileInput = document.querySelector("#adviceFile");
    const file = fileInput.files[0];
    const allowedExtensions = getAllowedCompressedFileExtensions();

    // 첨부파일 확장자 체크
    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if(!allowedExtensions.includes(fileExtension)) {
            showElement("#adviceFileInputMsg");
            fileInput.value = "";
            return;
        }
    }

    // 예약 수정
    const result = await sendFormData("/api/reservation/advice",
                                            "PUT",
        adviceReservationModifyForm);
    const message = await result.text();

    // 예약 수정 모달 닫기
    hideElement("#adviceReservationModifyModal");
    // 메시지
    hideElement("#adviceFileInputMsg");
    
    // 알림 메시지
    showAlertMessage(message);

    // 상담 예약 목록
    await onAdviceReservationSearchSelectChange();

}
// 첨부파일 수정 모달 닫기 버튼 click
export function onAdviceReservationModifyModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 메시지 숨김
    hideElement("#adviceFileInputMsg");

    // 폼 초기화
    document.querySelector(form).reset();
}
// 예약 취소 모달 닫기 버튼 click
export function onAdviceReservationCancelModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
}
// 예약 취소 폼 - 취소하기 버튼 click 이벤트 핸들러
export async function onAdviceReservationCancelFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const adviceReservationCancelForm =
        document.querySelector("#adviceReservationCancelForm");

    // 예약 취소
    const result = await sendFormData("/api/reservation/advice",
        "DELETE",
        adviceReservationCancelForm);
    const message = await result.text();

    // 예약 취소 모달 닫기
    hideElement("#adviceReservationCancelModal");

    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    await onAdviceReservationSearchSelectChange();
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
