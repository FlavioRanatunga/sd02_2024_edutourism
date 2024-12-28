package com.EduExplore.System.service;

import com.EduExplore.System.model.PaymentResponse;
import com.google.api.client.util.Value;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    //    @Override
//    public PaymentResponse createPaymentLink(Order order) {
//        return null;
//    }
    @Override
    public PaymentResponse createPaymentLink(long totalPrice) throws StripeException {

        //Stripe.apiKey=stripeSecretKey;
        Stripe.apiKey="sk_test_51PvzxGRqDInvDCSbYr6Z9VEjOx2imiiLk9YGFFdJHGCJ8A1X5N18yVHaD1pxZHdzVxBGkCrx4MUax215cNJuOQx200XLjZQcoO";
        SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(
                        SessionCreateParams.
                                PaymentMethodType.CARD).
                setMode(SessionCreateParams.Mode.PAYMENT).
                setSuccessUrl("http://localhost:3000/?status=success")
                .setCancelUrl("http://localhost:3000/?status=failure")
                .addLineItem(SessionCreateParams.LineItem.builder().
                        setQuantity(1L).
                        setPriceData(SessionCreateParams.LineItem.
                                PriceData.builder().
                                setCurrency("usd").setUnitAmount(totalPrice)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Itinerary")
                                        .build()
                                ).build()
                        )
                        .build()
                ).build();

        Session session =Session.create(params);

        PaymentResponse res= new PaymentResponse();
        res.setPayment_url(session.getUrl());
        return res;
    }
}
