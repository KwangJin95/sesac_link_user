// 모달 닫기 이벤트 핸들러
import {hideElement} from "../../../global/util/utils.js";

export function onMyReservationWindowClick(event, modal, form) {
    if (event.target === document.querySelector(modal)) {
        hideElement(modal);

        // 폼 초기화
        document.querySelector(form).reset();
    }
}