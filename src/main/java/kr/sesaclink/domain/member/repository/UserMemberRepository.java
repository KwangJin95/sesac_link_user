package kr.sesaclink.domain.member.repository;

import kr.sesaclink.domain.member.entity.UserMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMemberRepository extends JpaRepository<UserMember, Long> {

    // UserMember join fetch all by userNo
    @Query("select u " +
            "from UserMember u " +
            "left join fetch u.userAuth " +
            "left join fetch u.adminMember " +
            "left join fetch u.campus " +
            "left join fetch u.memberStatus " +
            "where u.userNo = :userNo")
    UserMember findUserMemberByUserNo(@Param("userNo") Long userNo);

    // UserMember join fetch all by id
    @Query("select u " +
            "from UserMember u " +
            "left join fetch u.userAuth " +
            "left join fetch u.adminMember " +
            "left join fetch u.campus " +
            "left join fetch u.memberStatus " +
            "where u.id = :id")
    UserMember findUserMemberById(@Param("id") String id);

    // 로그인 인증 시 회원, 캠퍼스, 권한 정보 조회
    @Query("select a " +
            "from UserMember a " +
            "left join fetch a.userAuth " +
            "left join fetch a.adminMember " +
            "left join fetch a.memberStatus " +
            "left join fetch a.campus " +
            "where a.id = :username")
    Optional<UserMember> getWithAll(String username);

    // 아이디 중복 확인
    boolean existsById(String id);

    // 이메일 중복 확인
    boolean existsByEmail(String email);

    // 아이디, 이메일 매칭 확인
    boolean existsByIdAndEmail(String id,
                               String email);

    // 아이디 찾기
    @Query("select u.id " +
            "from UserMember u " +
            "where u.email = :email")
    String getIdByEmail(@Param("email") String email);

    // 비밀번호 재설정 시 회원 찾기
    @Query("select u " +
            "from UserMember u " +
            "where u.id = :id " +
            "and u.email = :email")
    UserMember findMemberByIdAndEmail(@Param("id") String id,
                                      @Param("email") String email);

    // 비밀번호 확인
    @Query("select u.pw " +
            "from UserMember u " +
            "where u.userNo = :userNo")
    String getPwByUserNo(@Param("userNo") Long userNo);

}
