package kr.sesaclink.domain.member.dto;

import kr.sesaclink.domain.member.entity.UserMember;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

@Getter
@Setter
@ToString
public class UserMemberSecurityDTO extends User {
  private Long userNo;

  private String id;

  private String pw;

  private String name;

  private String phone;

  private String email;

  private String address;

  private String detailAddress;

  private String profileThumbnail;

  private Long adminNo;

  private String adminName;

  private Integer campusNo;

  private String campusName;

  private String authName;

  private String authNameKor;


  public UserMemberSecurityDTO(UserMember userMember) {

    super(userMember.getId(), userMember.getPw(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userMember.getUserAuth().getAuthName())));
    this.userNo = userMember.getUserNo();
    this.id = userMember.getId();
    this.pw = userMember.getPw();
    this.name = userMember.getName();
    this.phone = userMember.getPhone();
    this.email = userMember.getEmail();
    this.address = userMember.getAddress();
    this.detailAddress = userMember.getDetailAddress();
    this.profileThumbnail = userMember.getProfileThumbnail() != null ?
            userMember.getProfileThumbnail() : null;

    this.adminNo = userMember.getAdminMember() != null ?
            userMember.getAdminMember().getAdminNo() : null;

    this.adminName = userMember.getAdminMember() != null ?
            userMember.getAdminMember().getName() : null;

    this.campusNo = userMember.getCampus() != null ?
            userMember.getCampus().getCampusNo() : null;
    this.campusName = userMember.getCampus() != null ?
            userMember.getCampus().getCampusName() : null;;
    this.authName = userMember.getUserAuth().getAuthName();

    // 권한 이름 한글 표시
    this.authNameKor = switch (userMember.getUserAuth().getAuthName()) {
      case "USER" -> "학생";
      case "PRE_USER" -> "예비 학생";
      default -> null;
    };
  }

}
