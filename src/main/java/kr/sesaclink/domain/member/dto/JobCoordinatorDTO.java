package kr.sesaclink.domain.member.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class JobCoordinatorDTO {

  private String name;

  private String phone;

  private String email;

  public JobCoordinatorDTO(String name, String phone, String email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}
