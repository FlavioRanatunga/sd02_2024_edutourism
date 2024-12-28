package com.EduExplore.System.repository;

import com.EduExplore.System.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByUsername(String username);
    Admin findByEmail(String email);
    List<Admin> findAll();
}
