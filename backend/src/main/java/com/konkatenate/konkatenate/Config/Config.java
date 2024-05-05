package com.konkatenate.konkatenate.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.konkatenate.konkatenate.KonkatenateApplication;

@Configuration
public class Config implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/games/**")
                .addResourceLocations("file:" + KonkatenateApplication.GAME_DATA_LOCATION);
        // super.addResourceHandlers(registry);
    }
}
