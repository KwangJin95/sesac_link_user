package kr.sesaclink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SesacLinkUserApplication {

  public static void main(String[] args) {
    SpringApplication.run(SesacLinkUserApplication.class, args);
  }
}