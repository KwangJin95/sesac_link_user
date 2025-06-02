package kr.sesaclink.domain.reservation.controller;

import kr.sesaclink.global.util.CustomFileUtil;
import kr.sesaclink.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/space")
public class SpaceApiController {

    private final CustomFileUtil customFileUtil;

    private final S3Util s3Util;

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    // 공간 이미지
    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> getSpaceImage(@PathVariable String filename) {
        if ("dev".equals(activeProfile)) {
            return customFileUtil.getFile(filename, "space_images");
        } else {
            return s3Util.getFileFromS3(filename, "space_images");
        }
    }
}
