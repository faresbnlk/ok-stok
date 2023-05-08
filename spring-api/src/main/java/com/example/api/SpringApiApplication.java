package com.example.api;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.api.config.AppProperties;
import com.example.api.config.TwilioConfig;
import com.twilio.Twilio;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class SpringApiApplication {

	@Autowired
	private TwilioConfig twilioConfig;

	@PostConstruct
	public void initTwilio(){
		Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SpringApiApplication.class, args);
	}
	
}
