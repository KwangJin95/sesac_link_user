import {
    updateSlide,
    startAutoSlide,
    onBannerMouseenter,
    onBannerMouseleave,
    onPrevBtnClick,
    onNextBtnClick,
    onPauseBtnClick
} from "./handlers/bannerHandler.js";

document.addEventListener("DOMContentLoaded", function () {
    // 배너 슬라이드
    updateSlide(getCurrentIndex());
    startAutoSlide(4000); // 4초
    // -----------------------------------------------------------------------------------------------
    // window resize 이벤트
    window.addEventListener("resize", () => {
        updateSlide(getCurrentIndex())
    });
    // -----------------------------------------------------------------------------------------------
    // 배너 mouse 이벤트
    if (banner != null) {
        banner.addEventListener("mouseenter", onBannerMouseenter);
        banner.addEventListener("mouseleave", onBannerMouseleave);
    }
    // -----------------------------------------------------------------------------------------------
    // 이전, 다음, 정지 버튼 클릭 이벤트
    if (prevBtn != null) {
        prevBtn.addEventListener("click", onPrevBtnClick);
    }
    if (nextBtn != null) {
        nextBtn.addEventListener("click", onNextBtnClick);
    }
    if (pauseBtn != null) {
        pauseBtn.addEventListener("click", onPauseBtnClick);
    }
});
// -----------------------------------------------------------------------------------------------
// 배너 컨테이너
const banner = document.querySelector('#banner');
// 이전, 다음, 정지 버튼
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const pauseBtn = document.querySelector('#pauseBtn');
// -----------------------------------------------------------------------------------------------
// 인덱스
let currentIndex = 0;
// interval
let intervalId    = null;
// 정지, hover
let isPaused   = false;
let isHovering = false;
// -----------------------------------------------------------------------------------------------
// getter
export function getCurrentIndex() {
    return currentIndex;
}
export function getIntervalId() {
    return intervalId;
}
export function getIsPaused() {
    return isPaused;
}
export function getIsHovering() {
    return isHovering;
}
// -----------------------------------------------------------------------------------------------
// setter
export function setCurrentIndex(value) {
    currentIndex = value;
}
export function setIntervalId(value) {
    intervalId = value;
}
export function setIsPaused(value) {
    isPaused = value;
}
export function setIsHovering(value) {
    isHovering = value;
}