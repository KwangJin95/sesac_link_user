import {
    getCurrentIndex, getIsHovering, getIsPaused,
    setCurrentIndex, setIsHovering, setIsPaused, setIntervalId
} from "../banner.js";
// -----------------------------------------------------------------------------------------------
// 배너 슬라이드
export function startAutoSlide(time) {
    setIntervalId(setInterval(() => {
        if (!getIsPaused() && !getIsHovering()) {
            onNextBtnClick();
        }
    }, time));
}
export function updateSlide(index) {
    const banner = document.querySelector("#banner");
    const offset = -index * banner.clientWidth;
    banner.style.transform = `translateX(${offset}px)`;
}
// -----------------------------------------------------------------------------------------------
// 이전, 다음, 정지 버튼 클릭 이벤트 핸들러
export function onPrevBtnClick() {
    const banner = document.querySelector("#banner");
    setCurrentIndex((getCurrentIndex() - 1) % banner.children.length);
    updateSlide(getCurrentIndex());
}
export function onNextBtnClick() {
    const banner = document.querySelector("#banner");
    setCurrentIndex((getCurrentIndex() + 1) % banner.children.length);
    updateSlide(getCurrentIndex());
}
export function onPauseBtnClick(event) {
    const pauseBtn = event.target;
    setIsPaused(!getIsPaused());
    pauseBtn.textContent = getIsPaused() ? '▶️ 재생' : '⏸️ 정지';
}
// -----------------------------------------------------------------------------------------------
// 배너 mouse hover 이벤트 핸들러
export function onBannerMouseenter() {
    setIsHovering(true);
}
export function onBannerMouseleave() {
    setIsHovering(false);
}