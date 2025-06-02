package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceReservationDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationDeleteDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.entity.SpaceReservation;
import kr.sesaclink.domain.reservation.repository.ReservationStatusRepository;
import kr.sesaclink.domain.reservation.repository.SpaceReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Log4j2
public class SpaceReservationServiceImpl implements SpaceReservationService {

    private final SpaceReservationRepository spaceReservationRepository;

    private final ReservationStatusRepository reservationStatusRepository;

    // 공간 예약 등록
    @Override
    @Transactional
    public boolean registerSpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO) {

        List<LocalTime> approvedStartTimeList =
                spaceReservationRepository.getStartTimeBySpaceNoAndResDateAndStatusName(
                                                spaceReservationRegisterDTO.getSpaceNo(),
                                                spaceReservationRegisterDTO.getResDate(),
                                                "APPROVED");

        boolean isConflict = approvedStartTimeList.stream()
                .anyMatch(startTime -> startTime.equals(spaceReservationRegisterDTO.getStartTime()));

        // 승인된 예약이 존재
        if (isConflict) {
            return false;
        }

        // 상태 -> 요청
        spaceReservationRegisterDTO.setReservationStatusNo(
                reservationStatusRepository.findByStatusName("APPLYING").getReservationStatusNo());

        // 예약 등록
        SpaceReservation registeredSpaceReservation = spaceReservationRepository.save(new SpaceReservation(spaceReservationRegisterDTO));

        return registeredSpaceReservation.getSpaceReservationNo() != null;
    }

    // 내 공간 예약 목록 조회
    @Override
    public List<SpaceReservationDTO> getSpaceReservationList(Long userNo,
                                                             LocalDate resDate,
                                                             String statusName) {

        List<SpaceReservation> result =
                spaceReservationRepository.getSpaceReservationByUserNoAndResDateAndStatusName(userNo, resDate, statusName);

        return result.stream()
                .map(spaceReservation -> new SpaceReservationDTO(spaceReservation))
                .collect(Collectors.toList());
    }

    // 예약 불가능한 공간 예약 목록 시작시간 목록 조회
    @Override
    public List<String> getUnavailbaleSpaceReservationStartTimeList(Long userNo,
                                                                    Integer spaceNo,
                                                                    LocalDate resDate) {

        List<LocalTime> approvedStartTimeList =
                spaceReservationRepository.getStartTimeBySpaceNoAndResDateAndStatusName(spaceNo,
                                                                                        resDate,
                                                                                        "APPROVED");

        List<LocalTime> myApplyingStartTimeList =
                spaceReservationRepository.getStartTimeByUserNoAndSpaceNoAndResDateAndStatusName(userNo,
                                                                                                 spaceNo,
                                                                                                 resDate,
                                                                                                 "APPLYING");

        return Stream.concat(approvedStartTimeList.stream(), myApplyingStartTimeList.stream())
                .map(startTime -> startTime.format(DateTimeFormatter.ofPattern("HH:mm")))
                .collect(Collectors.toList());
    }

    // 공간 예약 취소
    @Override
    @Transactional
    public boolean deleteSpaceReservation(SpaceReservationDeleteDTO spaceReservationDeleteDTO) {

        // 기존 예약
        SpaceReservation originSpaceReservation =
                spaceReservationRepository.findWithReservationStatusBySpaceReservationNo(
                        spaceReservationDeleteDTO.getSpaceReservationNo()).orElseThrow();

        // 기존 예약이 승인 상태일 때
        if (Objects.equals(originSpaceReservation.getReservationStatus().getReservationStatusNo(),
                reservationStatusRepository.findByStatusName("APPROVED").getReservationStatusNo())) {

            // CANCELED 제외한 기존 공간 예약 목록(시작시간 ~ 종료시간)
            List<SpaceReservation> spaceReservationList =
                    spaceReservationRepository.getSpaceReservationBySpaceNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                            spaceReservationDeleteDTO.getSpaceNo(),
                            spaceReservationDeleteDTO.getResDate(),
                            spaceReservationDeleteDTO.getStartTime(),
                            spaceReservationDeleteDTO.getEndTime());

            spaceReservationList.forEach(spaceReservation -> {
                // 기존 거절된 공간 예약 상태 -> 요청(APPLYING)으로 변경
                spaceReservation.changeReservationStatus(
                        reservationStatusRepository.findByStatusName("APPLYING")
                );

                // 저장
                spaceReservationRepository.save(spaceReservation);
            });
        }

        // 예약 상태 변경 -> 취소
        originSpaceReservation.changeReservationStatus(reservationStatusRepository.findByStatusName("CANCELED"));

        // 저장
        spaceReservationRepository.save(originSpaceReservation);

        // 수정된 공간 예약 엔티티
        SpaceReservation updatedSpaceReservation =
                spaceReservationRepository.findWithReservationStatusById(spaceReservationDeleteDTO.getSpaceReservationNo()).orElseThrow();

        return "CANCELED".equals(updatedSpaceReservation.getReservationStatus().getStatusName());
    }
}
