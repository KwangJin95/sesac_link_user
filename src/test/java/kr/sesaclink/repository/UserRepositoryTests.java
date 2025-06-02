package kr.sesaclink.repository;

import kr.sesaclink.domain.campus.repository.CampusRepository;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import kr.sesaclink.domain.member.repository.MemberStatusRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
@Log4j2
public class UserRepositoryTests {

  @Autowired
CampusRepository campusRepository;



  @Autowired
  MemberStatusRepository memberStatusRepository;

  @Autowired
  AdminMemberRepository adminMemberRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

}
