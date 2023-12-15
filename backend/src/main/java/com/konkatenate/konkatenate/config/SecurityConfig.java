package com.konkatenate.konkatenate.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/api/v1/**").authenticated()
                        .anyRequest().permitAll())
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement((management) -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    // // To enable CORS
    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    // final CorsConfiguration configuration = new CorsConfiguration();

    // configuration.setAllowedOrigins(List.of("https://127.0.0.1:1234/")); //
    // // www - obligatory
    // // configuration.setAllowedOrigins(List.of("*")); // set access from all
    // // domains
    // configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    // configuration.setAllowCredentials(true);
    // configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control",
    // "Content-Type"));

    // final UrlBasedCorsConfigurationSource source = new
    // UrlBasedCorsConfigurationSource();
    // source.registerCorsConfiguration("/**", configuration);

    // return source;
    // }
}
