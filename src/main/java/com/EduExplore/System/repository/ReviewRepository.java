package com.EduExplore.System.repository;

import com.EduExplore.System.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

}
