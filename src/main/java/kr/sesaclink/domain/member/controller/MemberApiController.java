package kr.sesaclink.domain.member.controller;

import kr.sesaclink.domain.member.service.MemberService;
import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberApiController {

    private final MemberService memberService;

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 아이디 중복 확인
    @PostMapping("/check-id")
    public boolean checkId(@RequestParam String id) {
        return memberService.isIdAvailable(id);
    }

    // 이메일 중복 확인
    @PostMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return memberService.checkEmail(email);
    }

    // 아이디, 이메일 매칭 확인
    @PostMapping("/check-id-email")
    public boolean checkIdWithEmail(@RequestParam String id,
                                    @RequestParam String email) {
        return memberService.checkIdWithEmail(id, email);
    }

    // 프로필 이미지
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> getProfileThumbnail(@PathVariable String fileName) {
        if ("dev".equals(activeProfile)) {
            return customFileUtil.getFile(fileName, "profile_images");
        } else {
            return s3Util.getFileFromS3(fileName, "profile_images");
        }
    }

    // 비밀번호 확인
    @PostMapping("/check-pw")
    public boolean checkPw(@RequestParam Long userNo,
                           @RequestParam String pw) {
        return memberService.checkPw(userNo, pw);
    }
}
