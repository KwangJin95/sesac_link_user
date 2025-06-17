package kr.sesaclink.domain.course.service;

import kr.sesaclink.domain.course.dto.CourseDTO;
import kr.sesaclink.domain.course.dto.CourseSearchDTO;

import java.util.List;

public interface CourseService {

    // 회원 등록 강좌 목록 조회
    List<CourseDTO> getCourseListByUserNo(Long userNo);

}
