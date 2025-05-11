export default class PasswordValidator {
  static isValidPassword(pass) {
    if (pass.length < 6) {
      return "New password must be at least 6 characters!";
    }
    if (pass.length > 30) {
      return "New password must be less than 30 characters!";
    }

    return true;
  }
}
