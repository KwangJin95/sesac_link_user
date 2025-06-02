// 내 공간 예약 목록
export async function getSpaceReservationList(userNo, resDate, statusName) {
    const result = await axios.get(`/api/reservation/space`, {
        params: {
            userNo: userNo,
            resDate: resDate,
            statusName: statusName
        }
    });
    return result.data;
}

// 공간 예약 불가능 시작시간 목록
export async function getUnavailableSpaceReservationStartTimeList(userNo, spaceNo, resDate) {
    const result = await axios.get(`/api/reservation/space/unavailable`, {
        params: {
            userNo: userNo,
            spaceNo: spaceNo,
            resDate: resDate
        }
    });
    return result.data;
}