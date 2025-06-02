// 아이디 중복 확인
export async function checkId(id) {
    const result = await axios.post(`/api/member/check-id`, null, {
        params: {id: id}
    });
    return result.data;
}

// 이메일 중복 확인
export async function checkEmail(email) {
    const result = await axios.post(`/api/member/check-email`, null, {
        params: {email: email}
    });
    return result.data;
}

// 이메일 인증 코드
export async function sendEmailVerifyCode(email) {
    const result = await axios.post(`/api/email/send-code`, null, {
        params: {email: email}
    });
    return result.data;
}

// 아이디, 이메일 매칭 여부 확인
export async function checkIdWithEmail(id, email) {
    const result = await axios.post(`/api/member/check-id-email`, null, {
        params: {
            id: id,
            email: email
        }
    });
    return result.data;
}

// 비밀번호 중복 확인
export async function checkPw(userNo, pw) {
    const result = await axios.post(`/api/member/check-pw`, null, {
        params: {
            userNo: userNo,
            pw: pw
        }
    });
    return result.data;
}