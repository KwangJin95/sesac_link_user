package kr.sesaclink.domain.reservation.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.reservation.dto.SpaceRegisterDTO;
import kr.sesaclink.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Space extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Integer spaceNo;

  @Column(nullable = false)
  private String spaceName;

  @Column(nullable = false)
  private LocalTime spaceAvailableStartTime;

  @Column(nullable = false)
  private LocalTime spaceAvailableEndTime;

  @Column(nullable = false)
  private Boolean beamProjector;

  @Column(nullable = false)
  private Integer peopleCount;

  @Column(nullable = false)
  private Boolean whiteBoard;

  private String spaceImage;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "campus_no", nullable = false)
  private Campus campus;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_no", nullable = false)
  private AdminMember adminMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "space_status_no", nullable = false)
  private SpaceStatus spaceStatus;
 
}
