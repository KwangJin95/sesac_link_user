package kr.sesaclink.domain.sesac.repository;

import kr.sesaclink.domain.sesac.entity.SesacUserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SesacUserCourseRepository extends JpaRepository<SesacUserCourse, Long> {
}
