package kr.sesaclink.domain.member.service;

import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.course.entity.Course;
import kr.sesaclink.domain.course.entity.UserCourse;
import kr.sesaclink.domain.course.repository.CourseRepository;
import kr.sesaclink.domain.course.repository.UserCourseRepository;
import kr.sesaclink.domain.member.dto.MemberFindPwDTO;
import kr.sesaclink.domain.member.dto.UserMemberSignupDTO;
import kr.sesaclink.domain.member.entity.MemberStatus;
import kr.sesaclink.domain.member.entity.UserAuth;
import kr.sesaclink.domain.member.entity.UserMember;
import kr.sesaclink.domain.member.repository.SesacUserMemberRepository;
import kr.sesaclink.domain.member.repository.UserMemberRepository;
import kr.sesaclink.domain.sesac.dto.SesacUserMemberDTO;
import kr.sesaclink.domain.sesac.entity.SesacUserMember;
import kr.sesaclink.global.security.CustomUserDetailService;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final UserMemberRepository userMemberRepository;

    private final SesacUserMemberRepository sesacUserMemberRepository;

    private final CourseRepository courseRepository;

    private final UserCourseRepository userCourseRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomUserDetailService customUserDetailService;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 아이디 중복 확인
    @Override
    public boolean isIdAvailable(String id) {
        return !userMemberRepository.existsById(id);  // 사용 가능하면 true, 중복이면 false
    }

    // 이메일 중복 확인
    @Override
    public boolean checkEmail(String email) {
        return !userMemberRepository.existsByEmail(email);  // 사용 가능하면 true, 중복이면 false
    }

    // 아이디, 이메일 매칭 확인
    @Override
    public boolean checkIdWithEmail(String id, String email) {
        return userMemberRepository.existsByIdAndEmail(id, email);
    }

    // Sesac 회원 정보 가져오기
    @Override
    @Transactional
    public SesacUserMemberDTO findSesacUser(String email) {

        SesacUserMember sesacUserMember = sesacUserMemberRepository.findByEmail(email);

        // 회원 정보 없음
        if (sesacUserMember == null) {
            return null;
        }
        
        // 강좌 정보 조회
        List<CourseDTO> courseList = courseRepository.getCourseListByEmail(email);

        return new SesacUserMemberDTO(sesacUserMember, courseList);
    }

    // 회원가입
    @Override
    public boolean signup(UserMemberSignupDTO userMemberSignupDTO) {

        UserMember userMember = UserMember.builder()
                .id(userMemberSignupDTO.getId())
                .pw(passwordEncoder.encode(userMemberSignupDTO.getPw()))
                .name(userMemberSignupDTO.getName())
                .phone(userMemberSignupDTO.getPhone())
                .email(userMemberSignupDTO.getEmail())
                .address(userMemberSignupDTO.getAddress())
                .detailAddress(userMemberSignupDTO.getDetailAddress())
                .profileThumbnail(userMemberSignupDTO.getProfileThumbnail())
                .campus(Campus.builder().campusNo(userMemberSignupDTO.getCampusNo()).build())
                .userAuth(
                        userMemberSignupDTO.getCampusNo() != null ?
                            UserAuth.builder().userAuthNo(1).build() :
                            UserAuth.builder().userAuthNo(2).build())
                .memberStatus(MemberStatus.builder().memberStatusNo(userMemberSignupDTO.getMemberStatusNo()).build())
                .build();

        // 회원가입
        userMemberRepository.save(userMember);

        UserMember afterRegisterUser = userMemberRepository.findUserMemberById(userMember.getId());

        // 강좌 목록이 있는 경우
        if (userMemberSignupDTO.getCourseNo() != null && !userMemberSignupDTO.getCourseNo().isEmpty()) {
            List<UserCourse> userCourseList = new ArrayList<>();
            for (Integer courseNo : userMemberSignupDTO.getCourseNo()) {
                userCourseList.add(
                        UserCourse.builder()
                                .userMember(UserMember.builder().userNo(afterRegisterUser.getUserNo()).build())
                                .course(Course.builder().courseNo(courseNo).build())
                                .build());
            }
            userCourseRepository.saveAll(userCourseList);
        }

        return afterRegisterUser.getUserNo() != null;
    }

    // 아이디 찾기
    @Override
    public String findId(String email) {
        return userMemberRepository.getIdByEmail(email);
    }

    // 비밀번호 재설정
    @Override
    public String findPw(MemberFindPwDTO memberFindPwDTO) {

        UserMember userMember = userMemberRepository.findMemberByIdAndEmail(memberFindPwDTO.getId(), memberFindPwDTO.getEmail());

        // 아이디, 이메일에 해당하는 회원 없음
        if (userMember == null)
            return null;

        // 비밀번호 재설정
        userMember.changePw(passwordEncoder.encode(memberFindPwDTO.getPw()));

        userMemberRepository.save(userMember);

        return userMember.getId();
    }

    // 이메일 재설정
    @Override
    public boolean updateEmail(Long userNo, String email) {

        // 이메일 재설정
        UserMember userMember = userMemberRepository.findById(userNo).orElseThrow();

        userMember.changeEmail(email);

        // 저장
        userMemberRepository.save(userMember);

        UserMember afterUpdateUser = userMemberRepository.findById(userNo).orElseThrow();

        // Authentication 객체 갱신
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails updatedUser = customUserDetailService.loadUserByUsername(userMember.getId());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedUser, authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        return email.equals(afterUpdateUser.getEmail());
    }

    // 비밀번호 확인
    @Override
    public boolean checkPw(Long userNo, String pw) {

        String originPw = userMemberRepository.getPwByUserNo(userNo);

        return passwordEncoder.matches(pw, originPw);
    }

    // 비밀번호 재설정 - 마이페이지
    @Override
    public boolean updatePw(Long userNo, String pw) {

        // 비밀번호 재설정
        UserMember userMember = userMemberRepository.findById(userNo).orElseThrow();

        userMember.changePw(passwordEncoder.encode(pw));

        // 저장
        userMemberRepository.save(userMember);

        UserMember afterUpdateUser = userMemberRepository.findById(userNo).orElseThrow();

        // Authentication 객체 갱신
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails updatedUser = customUserDetailService.loadUserByUsername(userMember.getId());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedUser, authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        // 전달받은 비밀번호와 DB에 저장된 인코딩된 비밀번호 비교 반환
        return passwordEncoder.matches(pw, afterUpdateUser.getPw());
    }

    // 프로필 수정
    @Override
    public boolean updateMyMember(Long userNo,
                                  String name,
                                  String phone,
                                  String address,
                                  String detailAddress,
                                  MultipartFile file) {

        UserMember userMember = userMemberRepository.findById(userNo).orElseThrow();

        // 이름, 핸드폰 번호, 주소, 상세 주소 필드 수정
        userMember.changeName(name);
        userMember.changePhone(phone);
        userMember.changeAddress(address);
        userMember.changeDetailAddress(detailAddress);

        // 새로 저장한 파일 이름
        String fileName;

        try {
            // file 존재
            if (file != null && !file.isEmpty()) {

                // 기존 파일 삭제(프로필 사진이 null)
                if (userMember.getProfileThumbnail() != null) {
                    if ("dev".equals(activeProfile)) {
                        customFileUtil.deleteFile(userMember.getProfileThumbnail(), "profile_images");
                    } else {
                        s3Util.removeS3File("profile_images/" + userMember.getProfileThumbnail());
                    }
                }

                // 파일 저장
                if ("dev".equals(activeProfile)) {
                    fileName = customFileUtil.saveFile(file, "profile_images");
                } else {
                    fileName = s3Util.upload(customFileUtil.saveFileReturnPath(file), "profile_images");
                }

                // 프로필 이미지 필드 수정
                userMember.changeProfileThumbnail(fileName);
            }

            // 저장
            userMemberRepository.save(userMember);

        } catch (Exception e) {
            return false;
        }

        UserMember afterUpdateUser = userMemberRepository.findById(userNo).orElseThrow();

        // Authentication 객체 갱신
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails updatedUser = customUserDetailService.loadUserByUsername(userMember.getId());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedUser, authentication.getCredentials(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(newAuth);

        return afterUpdateUser.getName().equals(name) &&
               afterUpdateUser.getPhone().equals(phone) &&
               afterUpdateUser.getAddress().equals(address) &&
               afterUpdateUser.getDetailAddress().equals(detailAddress);
    }

    // 탈퇴하기
    @Override
    public boolean deleteMyMember(Long userNo) {

        UserMember userMember = userMemberRepository.findById(userNo).orElseThrow();

        // 회원 상태 WITHDRAWN 변경
        userMember.changeMemberStatus(MemberStatus.builder().memberStatusNo(3).build());

        // 회원 캠퍼스 NULL 변경
        userMember.changeCampus(null);
        
        // 회원 권한 PRE_USER 변경
        userMember.changeUserAuth(UserAuth.builder().userAuthNo(2).build());

        userMemberRepository.save(userMember);

        UserMember afterDeleteUser = userMemberRepository.findById(userNo).orElseThrow();

        return ((afterDeleteUser.getMemberStatus().getMemberStatusNo() == 3) &&
                (afterDeleteUser.getCampus() == null) &&
                (afterDeleteUser.getUserAuth().getUserAuthNo() == 2));
    }
}
