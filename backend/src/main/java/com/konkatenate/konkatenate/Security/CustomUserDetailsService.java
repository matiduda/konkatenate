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
        KonkatenateUser user = repository.findByUsername(username); // TODO: Add UsernameNotFoundException
        return new User(user.getUsername(), user.getPassword(), this.mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<KonkatenateUserRole> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
