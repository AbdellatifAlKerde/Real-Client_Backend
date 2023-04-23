// import jwt from "jsonwebtoken";

// export default (req, res, next) => {
//   try {
//     console.log(req.headers.authorization);
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       message: "User failed",
//     });
//   }
// };
