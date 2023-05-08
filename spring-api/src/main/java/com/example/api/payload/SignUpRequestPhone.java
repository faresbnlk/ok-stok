package com.example.api.payload;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @NoArgsConstructor @AllArgsConstructor
public class SignUpRequestPhone {

    @NotBlank
    private String phone;

    @NotBlank
    private String password;

    @NotBlank
    private String role;
}

