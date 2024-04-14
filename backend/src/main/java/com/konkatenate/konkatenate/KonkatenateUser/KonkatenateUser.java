package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.Set;

import com.konkatenate.konkatenate.KonkatenateGame.KonkatenateGame;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "konkatenate_users")
public class KonkatenateUser {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String email;
    private String password;

    // @OneToMany(cascade=ALL, mappedBy="customer")
    // public Set<KonkatenateGame> getPublishedGames() { return orders; }
}
