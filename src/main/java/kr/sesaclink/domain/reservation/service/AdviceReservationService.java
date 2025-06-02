package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.AdviceReservationDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationDeleteDTO;
import kr.sesaclink.domain.reservation.dto.AdviceReservationRegisterDTO;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface AdviceReservationService {
    // 내 상담 예약 목록 조회
    List<AdviceReservationDTO> getAdviceReservationList(Long userNo,
                                                        Long jobAdminNo,
                                                        LocalDate resDate,
                                                        String statusName);


    // 첨부파일 수정
    boolean modifyAdviceReservation(Long spaceReservationNo,
                                    MultipartFile adviceFile);

    // 상담 예약 취소
    boolean deleteAdviceReservation(AdviceReservationDeleteDTO adviceReservationDeleteDTO);

    // 상담 예약 등록
    boolean registerAdviceReservation(AdviceReservationRegisterDTO adviceReservationRegisterDTO);

    // 예약 불가능한 상담 예약 목록 시작시간 목록 조회
    List<String> getUnavailbaleAdviceReservationStartTimeList(Long userNo,
                                                              Long jobAdminNo,
                                                              LocalDate resDate);
}
