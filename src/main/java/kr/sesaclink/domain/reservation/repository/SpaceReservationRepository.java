package kr.sesaclink.domain.reservation.repository;

import kr.sesaclink.domain.reservation.entity.SpaceReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpaceReservationRepository extends JpaRepository<SpaceReservation, Long> {

    // 공간 예약 목록 조회
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "left join fetch sr.space s " +
            "left join fetch sr.userMember u " +
            "where u.userNo = :userNo " +
            "and sr.resDate = :resDate " +
            "and sr.reservationStatus.statusName like :statusName " +
            "order by sr.startTime, " +
            "sr.reservationStatus.reservationStatusNo "
    )
    List<SpaceReservation> getSpaceReservationByUserNoAndResDateAndStatusName(@Param("userNo") Long userNo,
                                                                              @Param("resDate") LocalDate resDate,
                                                                              @Param("statusName") String statusName);

    // 공간 예약 반환
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "where sr.spaceReservationNo = :spaceReservationNo")
    Optional<SpaceReservation> findWithReservationStatusById(@Param("spaceReservationNo") Long spaceReservationNo);

    // 취소를 제외한 공간 예약 목록
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "where sr.space.spaceNo = :spaceNo " +
            "and sr.resDate = :resDate " +
            "and sr.startTime < :endTime " +
            "and sr.endTime > :startTime " +
            "and sr.reservationStatus.statusName != 'CANCELED'")
    List<SpaceReservation> getSpaceReservationBySpaceNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(@Param("spaceNo") Integer spaceNo,
                                                                                                        @Param("resDate")   LocalDate resDate,
                                                                                                      @Param("startTime") LocalTime startTime,
                                                                                                      @Param("endTime")   LocalTime endTime);

    // 예약 상태와 함께 가져오기
    @Query("select sr " +
            "from SpaceReservation sr " +
            "left join fetch sr.reservationStatus " +
            "where sr.spaceReservationNo = :spaceReservationNo ")
    Optional<SpaceReservation> findWithReservationStatusBySpaceReservationNo(@Param("spaceReservationNo") Long spaceReservationNo);

    // 공간 및 상태별 시작시간 반환
    @Query("select sr.startTime " +
            "from SpaceReservation sr " +
            "where sr.space.spaceNo = :spaceNo " +
            "and sr.resDate = :resDate " +
            "and sr.reservationStatus.statusName = :statusName")
    List<LocalTime> getStartTimeBySpaceNoAndResDateAndStatusName(@Param("spaceNo") Integer spaceNo,
                                                                 @Param("resDate") LocalDate resDate,
                                                                 @Param("statusName") String statusName);

    // 회원번호, 공간, 상태별 시작시간 반환
    @Query("select sr.startTime " +
            "from SpaceReservation sr " +
            "where sr.userMember.userNo = :userNo " +
            "and sr.space.spaceNo = :spaceNo " +
            "and sr.resDate = :resDate " +
            "and sr.reservationStatus.statusName = :statusName")
    List<LocalTime> getStartTimeByUserNoAndSpaceNoAndResDateAndStatusName(@Param("userNo") Long userNo,
                                                                          @Param("spaceNo") Integer spaceNo,
                                                                          @Param("resDate") LocalDate resDate,
                                                                          @Param("statusName") String statusName);
}
