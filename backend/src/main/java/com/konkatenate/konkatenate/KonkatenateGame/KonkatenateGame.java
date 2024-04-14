package com.konkatenate.konkatenate.KonkatenateGame;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUser;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "konkatenate_games")
public class KonkatenateGame {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    // @ManyToOne
    // @JoinColumn(name = "publisher_id", nullable = false)
    // private KonkatenateUser publisher;

    private String coverImageUrl;

    @CreationTimestamp
    private LocalDateTime createdOn;
}
