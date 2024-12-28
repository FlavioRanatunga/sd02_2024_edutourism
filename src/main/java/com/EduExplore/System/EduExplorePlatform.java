package com.EduExplore.System;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class EduExplorePlatform {

	public static void main(String[] args) {
		SpringApplication.run(EduExplorePlatform.class, args);
	}

}
