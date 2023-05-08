import { ErrorStatus } from "./error-status";

export class Error{

  public static DEFAULT_ERROR = "ERROR.default";
  public static WRONG_PASSWORD = "ERROR.wrongPassword";
  public static NOT_FOUND_EMAIL = "ERROR.unknownEmail";
  public static NOT_FOUND_PHONE = "ERROR.unknownPhone";
  public static NOT_VERIFIED_EMAIL = "ERROR.emailNotVerified";
  public static NOT_VERIFIED_PHONE = "ERROR.phoneNotVerified";
  public static EMAIL_ALREADY_EXIST = "ERROR.emailAlreadyExists";
  public static PHONE_ALREADY_EXIST = "ERROR.phoneAlreadyExists";
  public static EMAIL_NOT_FOUND_OR_NOT_VERIFIED = "ERROR.emailNotFoundOrNotVerified"
  public static PHONE_NOT_FOUND_OR_NOT_VERIFIED = "ERROR.phoneNotFoundOrNotVerified";
  public static OTP_NOT_VALIDATED = "ERROR.otpNotValidated"

  public static ERRORS : ErrorStatus[]= [
    {code: 401, title: "ERROR.auth"},
    {code: 403, title: "ERROR.forbidden"},
    {code: 404, title: "ERROR.notFound"},
    {code: 405, title: "ERROR.notAuthorized"},
    {code: 406, title: "ERROR.notAccepted"},
    {code: 408, title: "ERROR.timeOut"},
    {code: 415, title: "ERROR.formatNotSupported"},
    {code: 423, title: "ERROR.lockedResource"},
    {code: 498, title: "ERROR.expiredOrInvalidSession"}
  ];
}










