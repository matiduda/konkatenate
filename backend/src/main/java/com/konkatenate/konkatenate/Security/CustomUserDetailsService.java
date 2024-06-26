package com.konkatenate.konkatenate.Security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUser;
import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUserRepository;
import com.konkatenate.konkatenate.KonkatenateUserRole.KonkatenateUserRole;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private KonkatenateUserRepository repository;

    public CustomUserDetailsService(KonkatenateUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        KonkatenateUser user = repository.findByUsername(username);
        return new User(user.getUsername(), user.getPassword(), this.mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<KonkatenateUserRole> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    public List<KonkatenateUser> getAllUsersByUsername(String username) {
        return repository.findAllByUsername(username);
    }

    public List<KonkatenateUser> getAllUsers() {
        return repository.findAll();
    }

    public KonkatenateUser findByName(String username) {
        return repository.findByUsername(username);
    }

    public boolean isAdmin(KonkatenateUser user) {
        return user.getRoles().stream().filter(role -> role.getName().equals("ADMIN")).findFirst().isPresent();
    }
}
