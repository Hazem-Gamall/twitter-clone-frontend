import jwtDecode from "jwt-decode";

interface JWTObject {
  token_type: string;
  user_id: number;
  username: string;
}

const getObjectFromJWT = (token: string | undefined): JWTObject | null => {
  if (token) return jwtDecode(token);
  return null;
};

export default getObjectFromJWT;
