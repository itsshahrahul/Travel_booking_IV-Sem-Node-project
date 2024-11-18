import jwt from "jsonwebtoken";

const createToken = (id, role) => 
    jwt.sign({ _id: id, role }, "mysecretkey", { expiresIn: "3d" });

export default createToken;
