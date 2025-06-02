package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.member.dto.MemberFindPwDTO;
import kr.sesaclink.domain.member.dto.UserMemberSignupDTO;
import kr.sesaclink.domain.sesac.dto.SesacUserMemberDTO;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    // 아이디 중복 확인
    boolean isIdAvailable(String id);

    // 이메일 중복 확인
    boolean checkEmail(String email);

    // 아이디, 이메일 매칭 확인
    boolean checkIdWithEmail(String id, String email);
    
    // 회원가입
    boolean signup(UserMemberSignupDTO userMemberSignupDTO);
    
    // 아이디 찾기
    String findId(String email);

    // Sesac 회원 정보 가져오기
    SesacUserMemberDTO findSesacUser(String email);

    // 비밀번호 재설정
    String findPw(MemberFindPwDTO memberFindPwDTO);
    
    // 이메일 재설정
    boolean updateEmail(Long userNo, String email);

    // 비밀번호 확인
    boolean checkPw(Long userNo, String pw);

    // 비밀번호 재설정 - 마이페이지
    boolean updatePw(Long userNo, String pw);
    
    // 프로필 수정
    boolean updateMyMember(Long userNo,
                           String name,
                           String phone,
                           String address,
                           String detailAddress,
                           MultipartFile file);
    
    // 탈퇴하기
    boolean deleteMyMember(Long userNo);
}
