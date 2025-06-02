package kr.sesaclink.domain.sesac.dto;

import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.sesac.entity.SesacUserMember;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SesacUserMemberDTO {
  private String id;

  private String name;

  private String phone;

  private String email;

  private String address;

  private String detailAddress;

  private Integer campusNo;

  private String campusName;

  private List<CourseDTO> courseList;

  public SesacUserMemberDTO(SesacUserMember sesacUserMember,
                            List<CourseDTO> courseList) {
    this.id = sesacUserMember.getId();
    this.name = sesacUserMember.getName();
    this.phone = sesacUserMember.getPhone();
    this.email = sesacUserMember.getEmail();
    this.address = sesacUserMember.getAddress();
    this.detailAddress = sesacUserMember.getDetailAddress();
    if (sesacUserMember.getCampus() != null) {
      this.campusNo = sesacUserMember.getCampus().getCampusNo();
      this.campusName = sesacUserMember.getCampus().getCampusName();
    }
    if (courseList != null) {
      this.courseList = courseList;
    }
  }
}
