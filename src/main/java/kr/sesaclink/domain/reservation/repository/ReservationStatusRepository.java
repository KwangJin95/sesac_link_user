package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationStatusRepository extends JpaRepository<ReservationStatus, Integer> {

    // 상태 이름으로 예약 상태 반환
    @Query("select r " +
           "from ReservationStatus r " +
           "where r.statusName = :statusName")
    ReservationStatus findByStatusName(@Param("statusName") String statusName);
}
