package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceReservationDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationDeleteDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;

import java.time.LocalDate;
import java.util.List;

public interface SpaceReservationService {
    // 내 공간 예약 목록 조회
    List<SpaceReservationDTO> getSpaceReservationList(Long userNo,
                                                      LocalDate resDate,
                                                      String statusName);

    // 공간 예약 취소
    boolean deleteSpaceReservation(SpaceReservationDeleteDTO spaceReservationDeleteDTO);

    // 공간 예약 등록
    boolean registerSpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO);

    // 예약 불가능한 공간 예약 목록 시작시간 목록 조회
    List<String> getUnavailbaleSpaceReservationStartTimeList(Long userNo,
                                                             Integer spaceNo,
                                                             LocalDate resDate);
}
