package com.EduExplore.System.service;

import com.EduExplore.System.model.Admin;
import com.EduExplore.System.model.PreBooking;
import com.EduExplore.System.repository.AdminRepository;
import com.EduExplore.System.repository.PreBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;


@Service
public class PreBookingImpl implements PreBookingService{
    @Autowired
    private PreBookingRepository preBookingRepository;



    @Override
    public String addPreBooking(PreBooking preBooking)
    {
        preBooking.setBookingTime(LocalDateTime.now());
        preBookingRepository.save(preBooking);

        return "prebooking created successfully";
    }

    @Override
    public PreBooking getPreBooking(int id)
    {
       PreBooking temp = preBookingRepository.getReferenceById(id);

        return temp;
    }

}

