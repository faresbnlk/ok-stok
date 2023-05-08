export class AppConfigConstants {

    //http://localhost:8090/oauth2/redirect,myandroidapp://oauth2/redirect,myiosapp://oauth2/redirect
    // App URIs
    public static API_BASE_URL = 'http://localhost:8890';
    // public static API_BASE_URL = 'http://192.168.1.26:8890';
    public static OAUTH2_REDIRECT_URI = 'http://localhost:8100/oauth2/redirect';
    public static GOOGLE_AUTH_URI = AppConfigConstants.API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + AppConfigConstants.OAUTH2_REDIRECT_URI;
    public static FACEBOOK_AUTH_URI = AppConfigConstants.API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + AppConfigConstants.OAUTH2_REDIRECT_URI;
    public static EMAIL_REGEX_VALIDATION = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    public static PHONE_REGEX_VALIDATION = "[0]{1}[5-7]{1}[5-9]{1}[0-9]{7}";
    public static PHONE_CODE = '+33';
    public static APP_CURRENCY = 'DA';
    // Categories names constants
    public static CATEGORY_PHONE_ACCESSORIES_NAME = 'CATEGORIES.PHONE_ACCESSORIES.name';
    public static CATEGORY_COMPUTER_NAME = 'CATEGORIES.COMPUTER.name';
    public static CATEGORY_CAMERA_PHOTO_ACCESSORIES_NAME = 'CATEGORIES.CAMERA_ACCESSORIES.name';
    public static CATEGORY_SMART_ELECTRONIC_NAME = 'CATEGORIES.SMART_ELECTRONIC.name';
    public static CATEGORY_MUSICAL_INSTRUMENTS_NAME = 'CATEGORIES.MUSICAL_INSTRUMENTS.name';
    public static CATEGORY_MEN_CLOTHING_NAME = 'CATEGORIES.MEN_CLOTHING.name';
    public static CATEGORY_WOMEN_CLOTHING_NAME = 'CATEGORIES.WOMEN_CLOTHING.name';
    public static CATEGORY_BABY_CLOTHING_NAME = 'CATEGORIES.BABY_CLOTHING_NAME.name';

    // Search product size per page
    public static PRODUCTS_PER_PAGE = 14;

}
