package com.example.api.payload;

import javax.validation.constraints.NotBlank;

public class VerifyEmailRequest {
 
    @NotBlank
    private String email;
    
    private Integer otpNo;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getOtpNo() {
        return otpNo;
    }

    public void setOtpNo(Integer otpNo) {
        this.otpNo = otpNo;
    }
    
}