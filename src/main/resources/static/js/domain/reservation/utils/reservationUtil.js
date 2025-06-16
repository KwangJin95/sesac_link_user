// 오늘 날짜 로드
export function loadToday(element) {
    const target = document.querySelector(element);

    const today  = new Date();
    const yyyy = today.getFullYear();
    const mm     = String(today.getMonth() + 1).padStart(2, '0'); // 01~12
    const dd     = String(today.getDate()).padStart(2, '0'); // 01~31

    target.value = `${yyyy}-${mm}-${dd}`;
}

// 이번 달 로드
export function loadThisMonth(element) {
    const target = document.querySelector(element);

    const today  = new Date();
    const yyyy = today.getFullYear();
    const mm     = String(today.getMonth() + 1).padStart(2, '0'); // 01~12

    target.value = `${yyyy}-${mm}`;
}

// 한 시간 더하기
export function addOneHour(timeStr) {
    let [hour, minute] = timeStr.split(":").map(Number);
    hour = (hour + 1) % 24; // 24시간 형식 유지

    // 두 자리 문자열로 변환
    const newHourStr = hour.toString().padStart(2, "0");
    return `${newHourStr}:${minute.toString().padStart(2, "0")}`;
}

// 예약 목록 - 타임 슬롯 생성
export function generateTimeButtons(startTime, endTime, containerSelector, reservedStartTimes = []) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = ""; // 기존 버튼 초기화

    let currentTime = startTime;
    while (currentTime < endTime) {
        const nextTime = addOneHour(currentTime);

        const button = document.createElement("button");
        button.type = "button";
        button.className =
            "timeSlotBtn px-4 py-2 m-1 border rounded-lg transition " +
            (reservedStartTimes.includes(currentTime)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-blue-600");
        button.textContent = currentTime;
        button.dataset.startTime = currentTime;
        button.dataset.endTime = nextTime;

        if (reservedStartTimes.includes(currentTime)) {
            button.disabled = true;
        }

        container.appendChild(button);
        currentTime = nextTime;
    }
}

// 20250301 -> 2025-03-01 반환
export function formatDate(dateStr) {
    const s = String(dateStr);
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

// 공휴일 정보 받아오기
export async function getHolidays(dateStr) {
    const serviceKey = "FTjMJaeX5Blv4YoErfrWRo7fHB95hB4eU4henN%2BNJvufAqnX54y6gWm%2BSOZX3kg0CS3FlvvlPClRqT9oV6fMig%3D%3D";
    const [year, month] = dateStr.split("-");
    const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${serviceKey}&solYear=${year}&solMonth=${month}&_type=json`;

    const response = await fetch(url);

    const result = await response.json();

    // 공휴일 데이터
    const items = result.response.body.items.item;

    if (!items) {
        return [];
    }

    // 배열로 변환
    const holidays = Array.isArray(items) ? items : [items];

    const formattedHolidays = holidays.map(({ dateName, locdate }) => ({
        dateName,
        locdate: formatDate(locdate)
    }));

    return formattedHolidays;
}

// 공휴일 여부 검증
export function isHoliday(year, month, day, holidays) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return holidays.find(h => h.locdate === dateStr);
}

// 달력 그리기
export function drawCalendar(resDate, getter) {
    const calendar = document.querySelector("#calendarContainer");
    calendar.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = new Date(resDate).getFullYear();
    const month = new Date(resDate).getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();

    let table = `<table class='w-full border text-center text-sm'>
                           <thead class='border'>
                               <tr>
                                   <th class="border border-gray-300 text-red-500">일</th>
                                   <th class="border border-gray-300">월</th>
                                   <th class="border border-gray-300">화</th>
                                   <th class="border border-gray-300">수</th>
                                   <th class="border border-gray-300">목</th>
                                   <th class="border border-gray-300">금</th>
                                   <th class="border border-gray-300 text-blue-500">토</th>
                               </tr>
                           </thead>
                           <tbody>
                           <tr>`;

    let dayOfWeek = firstDay.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
        table += "<td></td>";
    }

    for (let day = 1; day <= lastDate; day++) {
        const date = new Date(year, month, day);
        const dow = date.getDay(); // 0: 일 ~ 6: 토
        const holiday = isHoliday(year, month, day, getter());
        const isWeekend = dow === 0 || dow === 6;
        const isPast = date < today;
        const isDisabled = isPast || isWeekend || holiday;

        table += `<td class="p-2 border h-[60px] cursor-${isDisabled ? 'not-allowed text-gray-400 bg-gray-100' : 'pointer hover:bg-blue-100 reservationDate'}"
                      title="${holiday?.dateName || ''}"
                      data-res-date="${year}-${(month + 1) < 10 ? '0' + (month + 1) : (month + 1)}-${day < 10 ? '0' + day : day}"
                      >
                      ${day}
                  </td>`;

        if (dow === 6) table += "</tr><tr>"; // 주말이면 다음 줄
    }

    table += `</tr></tbody></table>`;
    calendar.innerHTML = table;
}
