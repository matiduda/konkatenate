package com.konkatenate.konkatenate.KonkatenateUser;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KonkatenateUserRepository extends JpaRepository<KonkatenateUser, Long> {

    List<KonkatenateUser> findByEmail(String email);

    KonkatenateUser findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
