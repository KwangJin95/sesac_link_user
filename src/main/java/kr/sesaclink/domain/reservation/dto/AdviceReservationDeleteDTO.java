package kr.sesaclink.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdviceReservationDeleteDTO {
  private Long adviceReservationNo;

  private LocalDate resDate;

  private LocalTime startTime;

  private LocalTime endTime;

  private Integer reservationStatusNo;

  private Long jobAdminNo;
}
