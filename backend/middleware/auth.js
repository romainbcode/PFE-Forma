const jwt = require("jsonwebtoken");

exports.isAdmin = async (req, res, next) => {
  const token = req.headers["authorization"];
  const decodedToken = jwt.decode(token);
  roleUser = decodedToken["https://PFE-ESI.com/roles"][0];
  if (roleUser === "") {
    return res.status(401).json({
      success: false,
      message: "Accès non authorisé ! Vous devez vous connecter",
    });
  } else if (roleUser === "user") {
    return res.status(401).json({
      success: false,
      message: "Accès non authorisé pour un user",
    });
  } else if (roleUser === "teacher") {
    return res.status(401).json({
      success: false,
      message: "Accès non authorisé pour un professeur",
    });
  }
  console.log("Accès authorisé pour un admin");
  next();
};

exports.isTeacher = async (req, res, next) => {
  const token = req.headers["authorization"];
  const decodedToken = jwt.decode(token);
  roleUser = decodedToken["https://PFE-ESI.com/roles"][0];
  if (roleUser === "") {
    return res.status(401).json({
      success: false,
      message: "Accès non authorisé ! Vous devez vous connecter",
    });
  } else if (roleUser === "user") {
    return res.status(401).json({
      success: false,
      message: "Accès non authorisé pour un user",
    });
  }
  console.log("Accès authorisé pour un admin ou professeur");
  next();
};

exports.isUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  const decodedToken = jwt.decode(token);
  roleUser = decodedToken["https://PFE-ESI.com/roles"][0];
  if (roleUser === "") {
    return res.status(401).json({
      success: false,
      message: "Accès non authorisé ! Vous devez vous connecter",
    });
  }
  console.log("Accès authorisé pour un admin, professeur ou user");
  next();
};
