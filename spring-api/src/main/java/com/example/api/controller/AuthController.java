package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.api.exception.BadRequestException;
import com.example.api.model.ConfirmationToken;
import com.example.api.model.User;
import com.example.api.payload.ApiResponse;
import com.example.api.payload.AuthResponse;
import com.example.api.payload.LoginRequest;
import com.example.api.payload.SignUpRequest;
import com.example.api.payload.SignUpRequestPhone;
import com.example.api.repository.UserRepository;
import com.example.api.security.CustomUserDetailsService;
import com.example.api.security.TokenProvider;
import com.example.api.service.AuthService;
import com.example.api.service.EmailSenderService;
import com.example.api.service.OtpService;

import javax.validation.Valid;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Value("${server.port}")
    private String serverPort;
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OtpService otpService;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        UserDetails user = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        
        // if (userDetailsService.isAccountVerified(user.getUsername()) == false) {
        //     throw new UserNotVerifiedException(user.getUsername() + " is not verified");
        // }
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        //UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = user.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token, roles, user.getUsername()));

    }

    @PostMapping("/login-phone")
    public ResponseEntity<?> findByEmailOrPhone(@RequestBody String username) {
        Optional<User> user = userRepository.findByPhoneOrByEmail(username);
        if(user.isPresent()){
            return ResponseEntity.ok().body(new ApiResponse(true, "User registred succesfully !" + "User : " + user));
        }
        else {
            return ResponseEntity.ok().body(new ApiResponse(false, "User not found !"));
        }


    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

        if (authService.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("email already used.");
        }
        User user = authService.saveUser(signUpRequest);
        emailSenderService.sendMail(user.getEmail(), otpService.generateOtpForSms(user.getEmail()).toString());

        return ResponseEntity.ok().body(new ApiResponse(true, "User registred succesfully !"));
    }

    @PostMapping("/signup-phone")
    public ResponseEntity<?> registerUserPhone(@Valid @RequestBody SignUpRequestPhone signUpRequest) {

        if (authService.existsByPhone(signUpRequest.getPhone())){
            throw new BadRequestException("phone number already used !");
        }
        User user = authService.saveUserByPhone(signUpRequest);

        return ResponseEntity.ok().body(new ApiResponse(true, "User registred succesfully !"));
    }

    @GetMapping("confirm-account")
    public ResponseEntity<?> getMethodName(@RequestParam("token") String token) {

        ConfirmationToken confirmationToken = authService.findByConfirmationToken(token);
        
        if (confirmationToken == null) {
            throw new BadRequestException("Invalid token");
        }

        User user = confirmationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        
        if((confirmationToken.getExpiryDate().getTime() - 
                calendar.getTime().getTime()) <= 0) {
            return ResponseEntity.badRequest().body("Link expired. Generate new link from http://localhost:4200/login");
        }

        user.setVerifiedUser(true);
        authService.save(user);
        return ResponseEntity.ok("Account verified successfully!");
    }

    // @PostMapping("/send-email")
    // public ResponseEntity<?> sendVerificationMail(@Valid @RequestBody 
    //                     VerifyEmailRequest emailRequest) {
    //     if(authService.existsByEmail(emailRequest.getEmail())){
    //         if(userDetailsService.isAccountVerified(emailRequest.getEmail())){
    //             throw new BadRequestException("Email is already verified");
    //         } else {
    //             User user = authService.findByEmail(emailRequest.getEmail());
    //             ConfirmationToken token = authService.createToken(user);
    //             emailSenderService.sendMail(user.getEmail(), token.getConfirmationToken(), this.serverPort);
    //             return ResponseEntity.ok(new ApiResponse(true, "Verification link is sent on your mail id"));
    //         }
    //     } else {
    //         throw new BadRequestException("Email is not associated with any account");
    //     }
    // }  
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody LoginRequest loginRequest) {
        if(authService.existsByEmail(loginRequest.getEmail())){
            if(authService.changePassword(loginRequest.getEmail(), loginRequest.getPassword())) {
                return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully"));
            } else {
                throw new BadRequestException("Unable to change password. Try again!");
            }
        } else {
            throw new BadRequestException("User not found with this email id");
        }
    }

    @PostMapping("/reset-password-phone")
    public ResponseEntity<?> resetPasswordPhone(@Valid @RequestBody LoginRequest loginRequest) {
        if(authService.existsByPhone(loginRequest.getEmail())){
            if(authService.changePasswordByPhone(loginRequest.getEmail(), loginRequest.getPassword())) {
                return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully"));
            } else {
                throw new BadRequestException("Unable to change password. Try again!");
            }
        } else {
            throw new BadRequestException("User not found with this email id");
        }
    }

    @RequestMapping("/alive")
    public boolean imAlive(){
        return true;
    }
}
