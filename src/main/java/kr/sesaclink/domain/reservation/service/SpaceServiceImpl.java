package kr.sesaclink.domain.reservation.service;

import kr.sesaclink.domain.reservation.dto.SpaceDTO;
import kr.sesaclink.domain.reservation.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class SpaceServiceImpl implements SpaceService {

    private final SpaceRepository spaceRepository;

    // 공간 목록 조회
    @Override
    public List<SpaceDTO> getSpaceList(Integer campusNo) {

        return spaceRepository.getSpaceByCampusNo(campusNo).stream()
                .map(space -> new SpaceDTO(space))
                .collect(Collectors.toList());
    }
}