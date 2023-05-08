package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.api.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    @Query("SELECT u FROM User u WHERE u.email = ?1 OR u.phone = ?1")
    Optional<User> findByPhoneOrByEmail(String phone);

    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);


    @Query("SELECT u.verifiedUser FROM User u WHERE u.email = ?1")
    Boolean findverifiedUserByEmail(String email);

    @Query("SELECT u.verifiedUser FROM User u WHERE u.phone = ?1")
    Boolean findVerifiedUserByPhone(String phone);

    @Query("SELECT u.verifiedUser FROM User u WHERE u.id = ?1")
    Boolean isUserVerified(Long id);
}
