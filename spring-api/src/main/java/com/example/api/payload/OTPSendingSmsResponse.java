package com.example.api.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@AllArgsConstructor@NoArgsConstructor
public class OTPSendingSmsResponse {
    private OTPSmsStatus status;
    private String message;
}
