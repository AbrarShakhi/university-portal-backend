export const homeStudent = async (req, res) => {
  if (!req.std || !req.std.id) {
    return res.status(401).json({ message: "Not authorized, please login!" });
  }

  return res.status(200).json({
    message: "Welcome to your home page",
    data: req.std,
  });
};
