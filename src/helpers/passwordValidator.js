export function isValidPassword(pass) {
  // check if the new password length is less than 6 characters
  if (newPassword.length < 6) {
    return "New password must be at least 6 characters!";
  }
  // check if the new password length is more than 30 characters
  if (newPassword.length > 30) {
    return "New password must be less than 30 characters!";
  }

  return true;
}
