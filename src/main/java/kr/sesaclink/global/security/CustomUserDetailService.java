package kr.sesaclink.global.security;

import kr.sesaclink.domain.member.dto.UserMemberSecurityDTO;
import kr.sesaclink.domain.member.entity.UserMember;
import kr.sesaclink.domain.member.repository.UserMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserMemberRepository userMemberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {

        UserMember userMember = userMemberRepository.getWithAll(username).orElseThrow();

        // 회원 상태 ACTIVE 아님
        if (!userMember.getMemberStatus().getMemberStatusName().equals("ACTIVE")) {
            throw new UsernameNotFoundException(username);
        }

        return new UserMemberSecurityDTO(userMember);
    }
}
