package com.EduExplore.System.service;

import com.EduExplore.System.model.Booking;

import java.util.List;

public interface BookingService {

    public void saveBooking(Booking booking);

    public List<Booking> getBookingsByServiceProviderId(int serviceProviderId);
}
