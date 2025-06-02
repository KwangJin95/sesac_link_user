package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Integer> {

    // 공간 목록 조회
    @Query("select s " +
            "from Space s " +
            "where s.campus.campusNo = :campusNo")
    List<Space> getSpaceByCampusNo(@Param("campusNo") Integer campusNo);
}
