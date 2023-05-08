package com.example.api.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatter {
    public static SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
    
    public static String formatDate(Date date) {
		return formatter.format(date);
	}
}
