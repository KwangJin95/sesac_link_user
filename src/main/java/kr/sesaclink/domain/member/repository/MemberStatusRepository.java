package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberStatusRepository extends JpaRepository<MemberStatus, Integer> {
}
