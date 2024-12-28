package com.EduExplore.System.repository;

import com.EduExplore.System.model.PreBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Repository
public interface PreBookingRepository extends JpaRepository<PreBooking, Integer> {


}
