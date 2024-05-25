package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KonkatenateUserRepository extends JpaRepository<KonkatenateUser, Long> {

    KonkatenateUser findByUsername(String username);

    List<KonkatenateUser> findAllByUsername(String username);

    Boolean existsByUsername(String username);
}
