package com.example.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.exception.ResourceNotFoundException;
import com.example.api.model.User;
import com.example.api.repository.UserRepository;
import com.example.api.security.CurrentUser;
import com.example.api.security.UserPrincipal;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    // @PreAuthorize("hasRole('SELLER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/user/is-verified")
    @PreAuthorize("hasRole('SELLER')")
    public boolean getIsVerifiedUser(@CurrentUser UserPrincipal userPrincipal) {
        if (userRepository.isUserVerified(userPrincipal.getId())){
            return true;
        }
        else {return false;}
    }
    
    
}
