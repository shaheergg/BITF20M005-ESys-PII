import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const comparePassword = (password, hash) => {
  const match = bcrypt.compare(password, hash);
  return match;
};

export const hashPassword = (password) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  return token;
};
