package com.konkatenate.konkatenate.KonkatenateUser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KonkatenateUserRepository extends JpaRepository<KonkatenateUser, Long> {

    KonkatenateUser findByUsername(String username);

    Boolean existsByUsername(String username);
}
