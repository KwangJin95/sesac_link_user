package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.domain.member.dto.UserMemberSecurityDTO;
import kr.sesaclink.domain.reservation.dto.SpaceDTO;
import kr.sesaclink.domain.reservation.entity.ReservationStatus;
import kr.sesaclink.domain.reservation.service.ReservationStatusService;
import kr.sesaclink.domain.reservation.service.SpaceService;
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

import java.util.List;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/reservation/space")
public class SpaceReservationController {

    private final SpaceService spaceService;

    private final ReservationStatusService reservationStatusService;

    private final MessageService messageService;

    // 공간 예약 페이지
    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public String getReservationSpacePage(Model model,
                                          RedirectAttributes redirectAttributes,
                                          @AuthenticationPrincipal UserMemberSecurityDTO userMemberSecurityDTO) {

        // 공간 목록
        List<SpaceDTO> spaceDTOList = spaceService.getSpaceList(userMemberSecurityDTO.getCampusNo());
        
        // 공간 목록 없음
        if (spaceDTOList.isEmpty()) {

            // 메시지
            redirectAttributes.addFlashAttribute("message",
                                                 messageService.getMessage("space.not_found"));

            return "redirect:/";
        }
        
        model.addAttribute("spaceDTOList", spaceDTOList);

        // 예약 상태 목록
        List<ReservationStatus> reservationStatusList = reservationStatusService.getReservationStatusList();
        model.addAttribute("reservationStatusList", reservationStatusList);

        return "reservation/space";
    }
}

