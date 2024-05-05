package com.konkatenate.konkatenate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class KonkatenateApplication {

	public final static String GAME_DATA_LOCATION = "/home/tanczmy/konkatenate/storage/";

	public static void main(String[] args) {
		SpringApplication.run(KonkatenateApplication.class, args);
	}

}
