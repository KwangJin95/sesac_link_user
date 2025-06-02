package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.AdviceReservationDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationDeleteDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.entity.AdviceReservation;
import kr.sesaclink.domain.reservation.repository.AdviceReservationRepository;
import kr.sesaclink.domain.reservation.repository.ReservationStatusRepository;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
public class AdviceReservationServiceImpl implements AdviceReservationService {

    private final AdviceReservationRepository adviceReservationRepository;

    private final ReservationStatusRepository reservationStatusRepository;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 내 상담 예약 목록 조회
    @Override
    public List<AdviceReservationDTO> getAdviceReservationList(Long userNo,
                                                               Long jobAdminNo,
                                                               LocalDate resDate,
                                                               String statusName) {

        List<AdviceReservation> result =
                adviceReservationRepository.getAdviceReservationByUserNoAndJobAdminNoAndResDateAndStatusName(userNo,
                                                                                                             jobAdminNo,
                                                                                                             resDate,
                                                                                                             statusName);

        return result.stream()
                .map(adviceReservation -> new AdviceReservationDTO(adviceReservation))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    // 첨부파일 수정
    public boolean modifyAdviceReservation(Long adviceReservationNo,
                                           MultipartFile adviceFile) {

        AdviceReservation adviceReservation = adviceReservationRepository.findById(adviceReservationNo).orElseThrow();

        // 새로 저장한 파일 이름
        String fileName = null;

        try {
            // file 존재
            if (adviceFile != null && !adviceFile.isEmpty()) {

                // 기존 파일 삭제
                if (adviceReservation.getAdviceFile() != null) {
                    if ("dev".equals(activeProfile)) {
                        customFileUtil.deleteFile(adviceReservation.getAdviceFile(), "advice_files");
                    } else {
                        s3Util.removeS3File("advice_files/" + adviceReservation.getAdviceFile());
                    }
                }

                // 파일 저장
                if ("dev".equals(activeProfile)) {
                    fileName = customFileUtil.saveFile(adviceFile, "advice_files");
                } else {
                    fileName = s3Util.upload(customFileUtil.saveFileReturnPath(adviceFile), "advice_files");
                }

                // 첨부파일 필드 수정
                adviceReservation.changeAdviceFile(fileName);
            }
            adviceReservationRepository.save(adviceReservation);

        } catch (Exception e) {
            return false;
        }

        AdviceReservation afterUpdated = adviceReservationRepository.findById(adviceReservationNo).orElseThrow();

        return fileName.equals(afterUpdated.getAdviceFile());
    }

    // 상담 예약 취소
    @Override
    @Transactional
    public boolean deleteAdviceReservation(AdviceReservationDeleteDTO adviceReservationDeleteDTO) {

        // 기존 예약
        AdviceReservation originAdviceReservation =
                adviceReservationRepository.findWithReservationStatusByAdviceReservationNo(
                        adviceReservationDeleteDTO.getAdviceReservationNo()).orElseThrow();

        // 기존 예약이 승인 상태일 때
        if (Objects.equals(originAdviceReservation.getReservationStatus().getReservationStatusNo(),
                reservationStatusRepository.findByStatusName("APPROVED").getReservationStatusNo())) {

            // CANCELED 제외한 기존 상담 예약 목록(시작시간 ~ 종료시간)
            List<AdviceReservation> adviceReservationList =
                    adviceReservationRepository.getAdviceReservationByJobAdminNoAndResDateAndBetweenStartTimeAndEndTimeExceptForCANCELED(
                            adviceReservationDeleteDTO.getJobAdminNo(),
                            adviceReservationDeleteDTO.getResDate(),
                            adviceReservationDeleteDTO.getStartTime(),
                            adviceReservationDeleteDTO.getEndTime());

            adviceReservationList.forEach(adviceReservation -> {

                // 기존 거절된 공간 예약 상태 -> 요청(APPLYING)으로 변경
                adviceReservation.changeReservationStatus(
                        reservationStatusRepository.findByStatusName("APPLYING")
                );

                // 저장
                adviceReservationRepository.save(adviceReservation);
            });
        }

        // 예약 상태 변경 -> 취소
        originAdviceReservation.changeReservationStatus(reservationStatusRepository.findByStatusName("CANCELED"));

        // 저장
        adviceReservationRepository.save(originAdviceReservation);

        // 수정된 상담 예약 엔티티
        AdviceReservation updatedAdviceReservation =
                adviceReservationRepository.findWithReservationStatusByAdviceReservationNo(adviceReservationDeleteDTO.getAdviceReservationNo()).orElseThrow();

        return "CANCELED".equals(updatedAdviceReservation.getReservationStatus().getStatusName());
    }

    // 상담 예약 등록
    @Override
    @Transactional
    public boolean registerAdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO) {

        // 등록된 상담 예약 엔티티
        AdviceReservation registeredAdviceReservation;

        List<LocalTime> approvedStartTimeList =
                adviceReservationRepository.getStartTimeByJobAdminNoAndResDateAndStatusName(
                        adviceReservationRegisterDTO.getJobAdminNo(),
                        adviceReservationRegisterDTO.getResDate(),
                                                "APPROVED");

        boolean isConflict = approvedStartTimeList.stream()
                .anyMatch(startTime -> startTime.equals(adviceReservationRegisterDTO.getStartTime()));

        // 승인된 예약이 존재
        if (isConflict) {
            return false;
        }

        // 상태 -> 요청
        adviceReservationRegisterDTO.setReservationStatusNo(
                reservationStatusRepository.findByStatusName("APPLYING").getReservationStatusNo());

        // 새로 저장한 파일 이름
        String fileName = null;

        AdviceReservation adviceReservation = new AdviceReservation(adviceReservationRegisterDTO);

        try {
            // file 존재
            if (adviceReservationRegisterDTO.getAdviceFile() != null &&
                !adviceReservationRegisterDTO.getAdviceFile().isEmpty()) {

                // 파일 저장
                if ("dev".equals(activeProfile)) {
                    fileName = customFileUtil.saveFile(adviceReservationRegisterDTO.getAdviceFile(), "advice_files");
                } else {
                    fileName = s3Util.upload(customFileUtil.saveFileReturnPath(adviceReservationRegisterDTO.getAdviceFile()), "advice_files");
                }

                // 첨부파일 필드 수정
                adviceReservation.changeAdviceFile(fileName);
            }
            // 예약 등록
            registeredAdviceReservation = adviceReservationRepository.save(adviceReservation);

        } catch (Exception e) {
            return false;
        }

        return registeredAdviceReservation.getAdviceReservationNo() != null;
    }

    // 예약 불가능한 공간 예약 목록 시작시간 목록 조회
    @Override
    public List<String> getUnavailbaleAdviceReservationStartTimeList(Long userNo,
                                                                    Long jobAdminNo,
                                                                    LocalDate resDate) {

        List<LocalTime> approvedStartTimeList =
                adviceReservationRepository.getStartTimeByJobAdminNoAndResDateAndStatusName(jobAdminNo,
                                                                                            resDate,
                                                                                        "APPROVED");

        List<LocalTime> myApplyingStartTimeList =
                adviceReservationRepository.getStartTimeByUserNoAndJobAdminNoAndResDateAndStatusName(userNo,
                                                                                                     jobAdminNo,
                                                                                                     resDate,
                                                                                                     "APPLYING");

        return Stream.concat(approvedStartTimeList.stream(), myApplyingStartTimeList.stream())
                .map(startTime -> startTime.format(DateTimeFormatter.ofPattern("HH:mm")))
                .collect(Collectors.toList());
    }
}
