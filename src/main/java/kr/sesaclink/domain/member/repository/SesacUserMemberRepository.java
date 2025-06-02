package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.sesac.entity.SesacUserMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SesacUserMemberRepository extends JpaRepository<SesacUserMember, Long> {

    // Sesac 회원 정보 가져오기
    SesacUserMember findByEmail(String email);
}
