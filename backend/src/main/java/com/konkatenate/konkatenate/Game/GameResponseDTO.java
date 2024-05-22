package com.konkatenate.konkatenate.Game;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@Data
@Setter
@AllArgsConstructor
public class GameResponseDTO {
    private List<GameInfo> games;
}
