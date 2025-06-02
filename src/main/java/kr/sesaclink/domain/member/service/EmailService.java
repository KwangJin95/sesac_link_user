package kr.sesaclink.domain.member.service;

public interface EmailService {
    // 이메일 인증 코드 발송
    String sendVerificationCode(String email);
}
