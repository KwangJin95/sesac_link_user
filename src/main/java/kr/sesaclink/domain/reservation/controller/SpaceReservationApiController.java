package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.reservation.dto.SpaceReservationDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationDeleteDTO;
import kr.sesaclink.domain.reservation.dto.SpaceReservationRegisterDTO;
import kr.sesaclink.domain.reservation.service.SpaceReservationService;
import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation/space")
public class SpaceReservationApiController {

    private final SpaceReservationService spaceReservationService;

    private final MessageService messageService;

    // 내 공간 예약 목록
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<SpaceReservationDTO> getMySpaceReservationList(Long userNo,
                                                               LocalDate resDate,
                                                               String statusName) {
        return spaceReservationService.getSpaceReservationList(userNo, resDate, statusName);
    }

    // 공간 예약 취소
    @DeleteMapping
    @PreAuthorize("hasRole('USER')")
    public String updateSpaceReservation(SpaceReservationDeleteDTO spaceReservationDeleteDTO) {

        // 공간 예약 취소
        boolean isDeleted = spaceReservationService.deleteSpaceReservation(spaceReservationDeleteDTO);

        return isDeleted ?
                messageService.getMessage("reservation.space.delete.success") :
                messageService.getMessage("reservation.space.delete.failure");
    }

    // 예약 불가능한 공간 예약 시작시간 목록
    @GetMapping("/unavailable")
    @PreAuthorize("hasRole('USER')")
    public List<String> getUnavailableSpaceReservationStartTimeList(Long userNo,
                                                                    Integer spaceNo,
                                                                    LocalDate resDate) {
        return spaceReservationService.getUnavailbaleSpaceReservationStartTimeList(userNo, spaceNo, resDate);
    }

    // 공간 예약 등록
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public String registerSpaceReservation(SpaceReservationRegisterDTO spaceReservationRegisterDTO) {

        // 공간 예약 등록
        boolean isRegistered = spaceReservationService.registerSpaceReservation(spaceReservationRegisterDTO);

        return isRegistered ?
                messageService.getMessage("reservation.space.register.success") :
                messageService.getMessage("reservation.space.register.failure");
    }
}
