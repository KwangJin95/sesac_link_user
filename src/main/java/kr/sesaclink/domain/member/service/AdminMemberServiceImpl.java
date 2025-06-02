package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.member.dto.JobCoordinatorDTO;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class AdminMemberServiceImpl implements AdminMemberService {

    private final AdminMemberRepository adminMemberRepository;

    // 잡코디 정보 반환
    @Override
    public JobCoordinatorDTO getJobCoordinatorDTO(Long adminNo) {
        return adminMemberRepository.findNameAndEmailAndPhoneByAdminNo(adminNo);
    }
}
