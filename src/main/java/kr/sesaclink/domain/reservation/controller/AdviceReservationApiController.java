package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.reservation.dto.AdviceReservationDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationDeleteDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.service.AdviceReservationService;
import kr.sesaclink.global.service.MessageService;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation/advice")
public class AdviceReservationApiController {

    private final AdviceReservationService adviceReservationService;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    private final MessageService messageService;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 내 상담 예약 목록
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<AdviceReservationDTO> getMySpaceReservationList(Long userNo,
                                                                Long jobAdminNo,
                                                                LocalDate resDate,
                                                                String statusName) {
        return adviceReservationService.getAdviceReservationList(userNo,
                                                                 jobAdminNo,
                                                                 resDate,
                                                                 statusName);
    }

    // 첨부파일 다운로드
    @GetMapping("/advice-file/{adviceFile}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Resource> getAdviceFile(@PathVariable String adviceFile) {
        if ("dev".equals(activeProfile)) {
            return customFileUtil.getFile(adviceFile, "advice_files");
        } else {
            return s3Util.getFileFromS3(adviceFile, "advice_files");
        }
    }

    // 첨부파일 수정
    @PutMapping
    @PreAuthorize("hasRole('USER')")
    public String modifyAdviceReservation(Long adviceReservationNo,
                                         MultipartFile adviceFile) {

        // 첨부파일 수정
        boolean isUpdated = adviceReservationService.modifyAdviceReservation(adviceReservationNo,
                                                                             adviceFile);

        return isUpdated ?
                messageService.getMessage("reservation.advice.modify.success") :
                messageService.getMessage("reservation.advice.modify.failure");
    }

    // 상담 예약 취소
    @DeleteMapping
    @PreAuthorize("hasRole('USER')")
    public String deleteAdviceReservation(AdviceReservationDeleteDTO adviceReservationDeleteDTO) {

        // 상담 예약 취소
        boolean isDeleted = adviceReservationService.deleteAdviceReservation(adviceReservationDeleteDTO);

        return isDeleted ?
                messageService.getMessage("reservation.advice.delete.success") :
                messageService.getMessage("reservation.advice.delete.failure");
    }

    // 예약 불가능한 상담 예약 시작시간 목록
    @GetMapping("/unavailable")
    @PreAuthorize("hasRole('USER')")
    public List<String> getUnavailableAdviceReservationStartTimeList(Long userNo,
                                                                     Long jobAdminNo,
                                                                     LocalDate resDate) {
        return adviceReservationService.getUnavailbaleAdviceReservationStartTimeList(userNo, jobAdminNo, resDate);
    }


    // 상담 예약 등록
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public String registerAdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO) {

        // 상담 예약 등록
        boolean isRegistered = adviceReservationService.registerAdviceReservation(adviceReservationRegisterDTO);

        return isRegistered ?
                messageService.getMessage("reservation.advice.register.success") :
                messageService.getMessage("reservation.advice.register.failure");
    }
}
