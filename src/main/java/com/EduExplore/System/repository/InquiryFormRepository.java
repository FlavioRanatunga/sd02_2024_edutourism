package com.EduExplore.System.repository;

import com.EduExplore.System.model.InquiryForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryFormRepository extends JpaRepository<InquiryForm, Integer> {
    List<InquiryForm> findAll();
    InquiryForm findById(int id);
}
