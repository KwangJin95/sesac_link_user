package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.dto.JobCoordinatorDTO;
import kr.sesaclink.domain.member.entity.AdminMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminMemberRepository extends JpaRepository<AdminMember, Long> {

    // 잡코디 이름, 이메일, 핸드폰 번호 반환
    @Query("select new kr.sesaclink.domain.member.dto.JobCoordinatorDTO(" +
            "a.name, a.phone, a.email) " +
            "from AdminMember a " +
            "where a.adminNo = :adminNo")
    JobCoordinatorDTO findNameAndEmailAndPhoneByAdminNo(@Param("adminNo") Long adminNo);
}
