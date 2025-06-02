package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.member.dto.JobCoordinatorDTO;

public interface AdminMemberService {
    // 잡코디 정보 반환
    JobCoordinatorDTO getJobCoordinatorDTO(Long adminNo);
}
