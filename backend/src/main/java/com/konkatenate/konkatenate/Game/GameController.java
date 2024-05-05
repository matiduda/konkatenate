package com.konkatenate.konkatenate.Game;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping()
    public void upload(@RequestParam("image") MultipartFile file, @RequestParam("title") String title)
            throws IllegalStateException, IOException {

        gameService.uploadGameToFileSystem(file, title);

        // Requires:
        // - .zip with game contents (as working HTML page)
        // - cover picture
        // - title, description, author, category, etc.
    }

    // @GetMapping("/products/{id}")
    // public String getProduct(@PathVariable("id") Long productId) {
    // // get product by ID
    // return "product_details";
    // }
}
