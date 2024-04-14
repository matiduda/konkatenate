package com.konkatenate.konkatenate.KonkatenateUser;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KonkatenateUserRepository extends JpaRepository<KonkatenateUser, Long> {

    // Custom query methods

    List<KonkatenateUser> findByUsername(String username);
}
