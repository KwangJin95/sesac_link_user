package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.member.dto.UserMemberSecurityDTO;
import kr.sesaclink.domain.member.service.AdminMemberService;
import kr.sesaclink.domain.reservation.service.ReservationStatusService;
import kr.sesaclink.domain.reservation.service.SpaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/my/reservation")
public class MyReservationController {

    private final SpaceService spaceService;

    private final AdminMemberService adminMemberService;

    private final ReservationStatusService reservationStatusService;

    // 공간 예약 목록 조회(일별)
    @GetMapping("/space")
    @PreAuthorize("hasRole('USER')")
    public String getSpaceReservationsDaily(Model model,
                                            @AuthenticationPrincipal UserMemberSecurityDTO userMemberSecurityDTO) {

        // 공간 목록
        model.addAttribute("spaceDTOList",
                spaceService.getSpaceList(userMemberSecurityDTO.getCampusNo()));

        // 예약 상태 목록
        model.addAttribute("reservationStatusList",
                reservationStatusService.getReservationStatusList());

        return "my/reservation/space";
    }

    // 상담 예약 목록 조회(일별)
    @GetMapping("/advice")
    @PreAuthorize("hasRole('USER')")
    public String getAdviceReservationsDaily(Model model,
                                            @AuthenticationPrincipal UserMemberSecurityDTO userMemberSecurityDTO) {

        // 잡코디 정보
        model.addAttribute("jobCoordinator",
                adminMemberService.getJobCoordinatorDTO(userMemberSecurityDTO.getAdminNo()));

        // 예약 상태 목록
        model.addAttribute("reservationStatusList",
                reservationStatusService.getReservationStatusList());

        return "my/reservation/advice";
    }
}

