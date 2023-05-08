package com.example.api.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.exception.BadRequestException;
import com.example.api.model.User;
import com.example.api.payload.ApiResponse;
import com.example.api.payload.OTPSendingSmsResponse;
import com.example.api.payload.OTPSmsStatus;
import com.example.api.payload.VerifyEmailRequest;
import com.example.api.repository.UserRepository;
import com.example.api.service.AuthService;
import com.example.api.service.OtpService;

import javassist.NotFoundException;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
public class OtpController {
    
    @Autowired
    private OtpService otpService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@Valid @RequestBody 
        VerifyEmailRequest emailRequest) {
        
        if(authService.existsByEmail(emailRequest.getEmail())) {
            if(otpService.generateOtp(emailRequest.getEmail())) {
                return ResponseEntity.ok(new ApiResponse(true, "Otp sent on email account"));
            } else {
                throw new BadRequestException("Unable to send OTP. try again");
            }
        } else {
            throw new BadRequestException("Email is not associated with any account.");
        }
    }
    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@Valid @RequestBody VerifyEmailRequest emailRequest) {
        if(emailRequest.getOtpNo() != null) {
            if(otpService.validateOTP(emailRequest.getEmail(), emailRequest.getOtpNo())) {
                return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully"));
            }
        }
        return ResponseEntity.badRequest().body("Invalid OTP");
    }


    @PostMapping(value= "/get-otp")
    public ResponseEntity<?> findByEmail(@Valid @RequestBody String emailRequest) throws NotFoundException {
        if (userRepository.existsByEmail(emailRequest) &&  userRepository.findverifiedUserByEmail(emailRequest)) {
            
            if(otpService.generateOtp(emailRequest)) {
                return ResponseEntity.ok(new ApiResponse(true, "Otp sent on email account"));
            } else {
                throw new BadRequestException("Unable to send OTP. try again");
            }
        } else {
            throw new BadRequestException("Email is not associated with any account or not verified");
        }

    }

    @PostMapping(value= "/get-otp-phone")
    public ResponseEntity<?> findByPhone(@Valid @RequestBody String phone) throws NotFoundException {
        if (userRepository.existsByPhone(phone) &&  userRepository.findVerifiedUserByPhone(phone)) {

            String otp = otpService.generateOtpForSms(phone).toString();
            Mono<OTPSendingSmsResponse> reponse = authService.sendOTPBySms(phone, otp);
            if(reponse.block().getStatus() == OTPSmsStatus.DELIVRED) {
                return ResponseEntity.ok(new ApiResponse(true, "Otp sent by sms"));
            } else {
                throw new BadRequestException("Unable to send OTP. try again");
            }
        } else {
            throw new BadRequestException("Phone is not associated with any account or not verified");
        }

    }

}