package kr.sesaclink.repository;

import kr.sesaclink.domain.campus.repository.CampusRepository;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import kr.sesaclink.domain.member.repository.MemberStatusRepository;
import kr.sesaclink.domain.member.repository.UserMemberRepository;
import kr.sesaclink.domain.reservation.entity.ReservationStatus;
import kr.sesaclink.domain.reservation.repository.AdviceReservationRepository;
import kr.sesaclink.domain.reservation.repository.ReservationStatusRepository;
import kr.sesaclink.domain.reservation.service.AdviceReservationService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@Log4j2
public class AdminMemberRepositoryTests {

  @Autowired
  CampusRepository campusRepository;

  @Autowired
  MemberStatusRepository memberStatusRepository;

  @Autowired
  AdminMemberRepository adminMemberRepository;

  @Autowired
  UserMemberRepository userMemberRepository;
  @Autowired
  AdviceReservationRepository adviceReservationRepository;
  @Autowired
  ReservationStatusRepository reservationStatusRepository;

  @Autowired
  AdviceReservationService adviceReservationService;

  @Autowired
  PasswordEncoder passwordEncoder;

  //
  @Test
  public void testCheck() {

    ReservationStatus applyingStatus = reservationStatusRepository.findByStatusName("APPLYING");
    log.info("!! 적용할 예약 상태: " + (applyingStatus != null ? applyingStatus.getStatusName() : "NULL"));
  }

  // 아이디 중복 확인
  @Test
  public void testIdCheck() {
    boolean isAvailable = !userMemberRepository.existsById("test1");
    log.info("isAvailable: " + isAvailable);
  }
  
  // 이메일 중복 확인
  @Test
  public void testEmailCheck() {
    boolean isAvailable = !userMemberRepository.existsByEmail("test@gmail.com");
    log.info("isAvailable: " + isAvailable);
  }

  // 비밀번호 확인
  @Test
  public void testPwCheck() {
    String pw = userMemberRepository.getPwByUserNo(14L);
    log.info("pw: " + pw);
  }

  // 아이디, 이메일 매칭 확인
  @Test
  public void testIdWithEmailCheck() {
    boolean idEmailchecked = userMemberRepository.existsByIdAndEmail("eeeee", "rhkdwls95@naver.com");
    log.info("idEmailchecked: " + idEmailchecked);
  }
}
