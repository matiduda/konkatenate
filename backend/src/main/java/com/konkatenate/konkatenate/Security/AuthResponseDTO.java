package com.konkatenate.konkatenate.Security;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private String message;

    public AuthResponseDTO(String accessToken, String message) {
        this.accessToken = accessToken;
        this.message = message;
    }
}
