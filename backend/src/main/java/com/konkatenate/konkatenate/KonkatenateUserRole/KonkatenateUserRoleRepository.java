package com.konkatenate.konkatenate.KonkatenateUserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KonkatenateUserRoleRepository extends JpaRepository<KonkatenateUserRole, Long> {

    List<KonkatenateUserRole> findByName(String name);
}
