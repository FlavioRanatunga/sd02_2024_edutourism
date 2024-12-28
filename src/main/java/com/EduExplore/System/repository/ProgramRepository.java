package com.EduExplore.System.repository;


import com.EduExplore.System.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer> {
    List<Program> findCourseByServiceProviderIdCode(int serviceProviderIdCode);
    @Query("SELECT p.title FROM Program p WHERE p.title LIKE :prefix%")
    List<String> findTitlesByTitleStartingWith(@Param("prefix") String prefix);

    long countByType(String type);

}



