export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function validateOtp(storedOtp, otp) {
  if (storedOtp.token !== otp) {
    return {
      otpStat: false,
      err_msg: "Invalid OTP",
    };
  }
  if (storedOtp.try_count >= 3) {
    return {
      otpStat: false,
      err_msg: "Too many attempts.",
    };
  }
  if (storedOtp.expired_at < new Date()) {
    return {
      otpStat: false,
      err_msg: "OTP expired",
    };
  }
  return {
    otpStat: true,
    err_msg: "",
  };
}
