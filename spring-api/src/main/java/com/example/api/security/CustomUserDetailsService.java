package com.example.api.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.exception.ResourceNotFoundException;
import com.example.api.model.User;
import com.example.api.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        if (email.substring(1).contains("@") && !email.matches("[0-9]+")){
            User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
                );
            return UserPrincipal.create(user);
        }
        else{
            User user = userRepository.findByPhone(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with phone : " + email)
                );
            return UserPrincipal.create(user);
        }
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public boolean isAccountVerified(String email) {
        boolean isVerified = userRepository.findverifiedUserByEmail(email);
        return isVerified;
    }
}