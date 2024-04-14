package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KonkatenateUserController {

    @Autowired
    private KonkatenateUserService konkatenateUserService;

    public KonkatenateUserController(KonkatenateUserService konkatenateUserService) {
        this.konkatenateUserService = konkatenateUserService;

        // Insert a demo user
        this.konkatenateUserService.registerUser("testuser", "test@gmail.com", "1234");
    }

    @GetMapping("/allusers")
    public List<KonkatenateUserDto> getAllUsers() {
        return konkatenateUserService.getAllKonkatenateUsers();
    }

    @PostMapping("/createuser")
    public String postMethodName(@RequestBody String entity) {
        // TODO: process POST request
        return entity;
    }
}
