package com.EduExplore.System.service;

import com.EduExplore.System.model.Booking;
import com.EduExplore.System.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    BookingRepository bookingRepository;

    @Override
    public void saveBooking(Booking booking) {
        bookingRepository.save(booking);
        System.out.println("Booking saved");
    }

    @Override
    public List<Booking> getBookingsByServiceProviderId(int serviceProviderId) {
        List<Booking>bookingList=  bookingRepository.findBookingByServiceProviderId(serviceProviderId);
        return bookingList;
    }
}
