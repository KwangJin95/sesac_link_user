// 내 상담 예약 목록
export async function getAdviceReservationList(userNo, jobAdminNo, resDate, statusName) {
    const result = await axios.get(`/api/reservation/advice`, {
        params: {
            userNo: userNo,
            jobAdminNo: jobAdminNo,
            resDate: resDate,
            statusName: statusName
        }
    });
    return result.data;
}

// 상담 예약 불가능 시작시간 목록
export async function getUnavailableAdviceReservationStartTimeList(userNo, jobAdminNo, resDate) {
    const result = await axios.get(`/api/reservation/advice/unavailable`, {
        params: {
            userNo: userNo,
            jobAdminNo: jobAdminNo,
            resDate: resDate
        }
    });
    return result.data;
}
