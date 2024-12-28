package com.EduExplore.System.service;

import com.EduExplore.System.model.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    //public PaymentResponse createPaymentLink(Order order);
    public PaymentResponse createPaymentLink(long totalPrice) throws StripeException;
}
