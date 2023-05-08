package com.example.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.api.config.TwilioConfig;
import com.example.api.model.AuthProvider;
import com.example.api.model.ConfirmationToken;
import com.example.api.model.PrimaryContact;
import com.example.api.model.Role;
import com.example.api.model.User;
import com.example.api.payload.OTPSendingSmsResponse;
import com.example.api.payload.OTPSmsStatus;
import com.example.api.payload.SignUpRequest;
import com.example.api.payload.SignUpRequestPhone;
import com.example.api.repository.ConfirmationTokenRepository;
import com.example.api.repository.RoleRepository;
import com.example.api.repository.UserRepository;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TwilioConfig twilioConfig;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone).get();
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User saveUser(SignUpRequest signUpRequest) {
        Set<Role> roles = new HashSet<>();

        roles.add(roleRepository.findByName("ROLE_" + signUpRequest.getRole()));
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(roles);
        user.setPrimaryContact(PrimaryContact.EMAIL);
        return userRepository.save(user);
    }

    public User saveUserByPhone(SignUpRequestPhone signUpRequest) {
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_" + signUpRequest.getRole()));
        User user = new User();
        user.setPhone(signUpRequest.getPhone());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(roles);
        user.setPrimaryContact(PrimaryContact.PHONE);
        String otp = otpService.generateOtpForSms(signUpRequest.getPhone()).toString();
        this.sendOTPBySms(signUpRequest.getPhone(), otp);
        return userRepository.save(user);
    }

    public boolean existsByPhone(String phone) {
        return this.userRepository.existsByPhone(phone);
    }

    public Mono<OTPSendingSmsResponse> sendOTPBySms(String phoneNumber, String otp) {
        OTPSendingSmsResponse oTPSendingSmsResponse = null;
        try {
            String otpMessage = "Bonjour, nous vous remecions pour votre inscription sur notre site \n Votre code de validation est : [ "
                    + otp + " ]";
            PhoneNumber to = new PhoneNumber(phoneNumber);
            PhoneNumber from = new PhoneNumber(twilioConfig.getTrialNumber());
            Message message = Message
                    .creator(to, from, otpMessage)
                    .create();
            oTPSendingSmsResponse = new OTPSendingSmsResponse(OTPSmsStatus.DELIVRED, "Code OTP [ " + otp + " ] envoyé");
        } catch (Exception e) {
            oTPSendingSmsResponse = new OTPSendingSmsResponse(OTPSmsStatus.FAILED,
                    "Code OTP [ " + otp + " ] non envoyé " + e.getMessage());
        }
        return Mono.just(oTPSendingSmsResponse);
    }

    public boolean changePassword(String email, String password) {
        User user = findByEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        if (save(user) != null) {
            return true;
        }
        return false;
    }

    public boolean changePasswordByPhone(String phone, String password) {
        User user = findByPhone(phone);
        user.setPassword(passwordEncoder.encode(password));
        if (save(user) != null) {
            return true;
        }
        return false;
    }

    public ConfirmationToken createToken(User user) {
        ConfirmationToken confirmationToken = new ConfirmationToken(user);
        return confirmationTokenRepository.save(confirmationToken);
    }

    public ConfirmationToken findByConfirmationToken(String token) {
        return confirmationTokenRepository.findByConfirmationToken(token);
    }

    public void deleteToken(ConfirmationToken confirmationToken) {
        this.confirmationTokenRepository.delete(confirmationToken);
    }
}