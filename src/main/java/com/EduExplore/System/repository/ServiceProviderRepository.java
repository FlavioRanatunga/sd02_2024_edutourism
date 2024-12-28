package com.EduExplore.System.repository;

import com.EduExplore.System.model.ServiceProvider;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceProviderRepository extends CrudRepository<ServiceProvider,Integer> {

    ServiceProvider findByUsername(String username);
    ServiceProvider findById(int id);

    ServiceProvider findByEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}