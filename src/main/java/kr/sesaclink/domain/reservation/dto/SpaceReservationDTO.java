package kr.sesaclink.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.sesaclink.domain.reservation.entity.SpaceReservation;
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
public class SpaceReservationDTO {
  private Long spaceReservationNo;

  private LocalDate resDate;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime startTime;

  @JsonFormat(pattern = "HH:mm")
  private LocalTime endTime;

  private Integer peopleCount;

  private String purpose;

  private Integer reservationStatusNo;

  private String statusNameKor;

  private Integer spaceNo;

  private String spaceName;

  // 학생
  private Long userNo;

  private String userName;

  public SpaceReservationDTO(SpaceReservation spaceReservation) {
    this.spaceReservationNo = spaceReservation.getSpaceReservationNo();
    this.resDate = spaceReservation.getResDate();
    this.startTime = spaceReservation.getStartTime();
    this.endTime = spaceReservation.getEndTime();
    this.peopleCount = spaceReservation.getPeopleCount();
    this.purpose = spaceReservation.getPurpose();

    this.reservationStatusNo = spaceReservation.getReservationStatus().getReservationStatusNo();

    if (spaceReservation.getSpace() != null) {
      this.spaceNo = spaceReservation.getSpace().getSpaceNo();
      this.spaceName = spaceReservation.getSpace().getSpaceName();
    }

    // 예약 상태 이름 한글 표시
    this.statusNameKor =
      switch (spaceReservation.getReservationStatus().getStatusName()) {
        case "APPLYING" -> "요청";
        case "REJECTED" -> "거절";
        case "APPROVED" -> "승인";
        case "CANCELED" -> "취소";
        default -> null;
    };

    if (spaceReservation.getUserMember() != null) {
      this.userNo = spaceReservation.getUserMember().getUserNo();
      this.userName = spaceReservation.getUserMember().getName();
    }
  }

}
