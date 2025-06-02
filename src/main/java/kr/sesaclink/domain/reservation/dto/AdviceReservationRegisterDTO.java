package kr.sesaclink.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdviceReservationRegisterDTO {

  private LocalDate resDate;

  private LocalTime startTime;

  private LocalTime endTime;

  private Long jobAdminNo;

  private Long userNo;

  private Integer reservationStatusNo;

  private MultipartFile adviceFile;

}
