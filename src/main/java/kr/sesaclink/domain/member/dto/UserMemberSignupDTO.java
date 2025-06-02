package kr.sesaclink.domain.member.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class UserMemberSignupDTO {
  private String id;

  private String pw;

  private String name;

  private String phone;

  private String email;

  private String address;

  private String detailAddress;

  private String profileThumbnail;

  private Integer campusNo;

  private Integer userAuthNo;

  private Integer memberStatusNo;

  private List<Integer> courseNo;

  // 기본값 설정
  public UserMemberSignupDTO() {
    this.memberStatusNo = 1;  // ACTIVE
  }

}
