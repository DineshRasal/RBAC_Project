package com.rbac.repository;

import com.rbac.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional; //Optional is used to avoid null

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); //Find user by email from database
    boolean existsByEmail(String email); //Checks if email already exists in database
}
