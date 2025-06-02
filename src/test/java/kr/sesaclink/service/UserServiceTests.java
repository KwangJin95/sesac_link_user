package kr.sesaclink.service;

import kr.sesaclink.domain.member.service.MemberService;
import kr.sesaclink.domain.reservation.service.SpaceReservationService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class UserServiceTests {

    @Autowired
    private MemberService memberService;
    @Autowired
    private SpaceReservationService spaceReservationService;

    // 아이디 중복 확인
    @Test
    public void testIdCheck() {
        boolean isIdAvailable = memberService.isIdAvailable("test1");
        log.info("isIdAvailable: " + isIdAvailable);
    }

    // 이메일 중복 확인
    @Test
    public void testEmailCheck() {
        boolean isIdAvailable = memberService.checkEmail("test1@gmail.com");
        log.info("isIdAvailable: " + isIdAvailable);
    }

    /*
    @Autowired
    UserService userService;

    // 회원가입
    @Test
    public void testSignUp() {

        UserSignupDTO userSignupDTO = UserSignupDTO.builder()
            .id("test12")
            .pw("4568913a!")
            .confirmPw("4568913a!")
            .email("test12@gmail.com")
            .name("테스터12")
            .phoneNumber("010-1234-5678")
            .address("서울시 동대문구 용두동")
            .isIdChecked(true)
            .campusId(1)
            .build();

        userService.signup(userSignupDTO);
    }

    // 나의 정보 조회
    @Test
    public void testGetUserWithCourseList() {
        MyUserDTO myUserDTO = userService.getUserWithCourseList(11L);

        log.info(myUserDTO.getName());
        log.info(myUserDTO.getAddress());
        log.info(myUserDTO.getEmail());
        log.info(myUserDTO.getImgUrl());
        log.info(myUserDTO.getPhoneNumber());
        log.info(myUserDTO.getCampusName());
        log.info(myUserDTO.getCourseList());
    }

     */
}
