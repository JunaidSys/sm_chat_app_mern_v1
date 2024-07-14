//   private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
//     return JWT.sign(
//       {
//         userId: userObjectId,
//         uId: data.uId,
//         email: data.email,
//         username: data.username,
//         avatarColor: data.avatarColor
//       },
//       config.JWT_TOKEN!
//     );
// }

// import jwt from "jsonwebtoken";
// import { CustomError } from "./CustomError";
//  const generateAccessToken = (user) =>
//   jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });

//   const verifyAccessToken = (token) =>
//   jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
//     if (err) {
//       return new CustomError (401,"Invalid Token")
//     } else {
//       return user;
//     }
//   });

//  export  {
//    generateAccessToken,verifyAccessToken }

//    export JWT {
//     genereateAccessToken (user)
//    }
