import jwtDecode from "jwt-decode";

interface JWTObject {
  token_type: string;
  user_id: number;
  username: string;
}

const getObjectFromJWT = (token: string): JWTObject => {
  return jwtDecode(token);
};

export default getObjectFromJWT;
