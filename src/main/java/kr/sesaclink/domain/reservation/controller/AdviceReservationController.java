package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.member.dto.JobCoordinatorDTO;
import kr.sesaclink.domain.member.dto.UserMemberSecurityDTO;
import kr.sesaclink.domain.member.service.AdminMemberService;
import kr.sesaclink.domain.reservation.service.ReservationStatusService;
import kr.sesaclink.global.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/reservation/advice")
public class AdviceReservationController {

    private final ReservationStatusService reservationStatusService;

    private final AdminMemberService adminMemberService;

    private final MessageService messageService;

    // 상담 예약 페이지
    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public String getReservationAdvicePage(Model model,
                                           RedirectAttributes redirectAttributes,
                                           @AuthenticationPrincipal UserMemberSecurityDTO userMemberSecurityDTO) {

        // 잡코디 정보
        JobCoordinatorDTO jobCoordinator = adminMemberService.getJobCoordinatorDTO(userMemberSecurityDTO.getAdminNo());

        // 잡코디 없음
        if (jobCoordinator == null) {

            // 메시지
            redirectAttributes.addFlashAttribute("message",
                                                 messageService.getMessage("job_coordinator.not_found"));

            return "redirect:/";
        }

        model.addAttribute("jobCoordinator", jobCoordinator);

        // 예약 상태 목록
        model.addAttribute("reservationStatusList", reservationStatusService.getReservationStatusList());

        return "reservation/advice";
    }
}

