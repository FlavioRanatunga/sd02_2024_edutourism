package com.EduExplore.System.repository;

import com.EduExplore.System.model.Traveller;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TravellerRepository extends CrudRepository<Traveller,Integer> {

    Optional<Traveller> findById(Integer id);
    Traveller findByUsername(String username);
    Traveller findByEmail(String email);


}