package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KonkatenateUserService implements IKonkatenateUserService {

    @Autowired
    private KonkatenateUserRepository konkatenateUserRepository;

    public KonkatenateUserService(KonkatenateUserRepository konkatenateUserRepository) {
        this.konkatenateUserRepository = konkatenateUserRepository;
    }

    @Override
    public List<KonkatenateUserDto> getAllKonkatenateUsers() {
        List<KonkatenateUser> users = konkatenateUserRepository.findAll();
        return users.stream().map((user) -> mapToUserDto(user)).collect(Collectors.toList());
    }

    public void registerUser(String username, String email, String password) {
        KonkatenateUser newUser = KonkatenateUser.builder()
                .username(username)
                .email(email)
                .password(password)
                .build();

        konkatenateUserRepository.save(newUser);
    }

    private KonkatenateUserDto mapToUserDto(KonkatenateUser user) {
        return KonkatenateUserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}
