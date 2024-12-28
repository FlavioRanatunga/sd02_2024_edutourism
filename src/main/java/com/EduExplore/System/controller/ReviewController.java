package com.EduExplore.System.controller;


import com.EduExplore.System.model.Review;
import com.EduExplore.System.repository.ReviewRepository;
import com.EduExplore.System.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // GET all reviews
    @GetMapping("/reviews")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // POST a new review
    @PostMapping("/reviews")
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }
}
