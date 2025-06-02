package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceDTO;

import java.util.List;

public interface SpaceService {
    // 캠퍼스별 공간 목록 조회
    List<SpaceDTO> getSpaceList(Integer campusNo);
}