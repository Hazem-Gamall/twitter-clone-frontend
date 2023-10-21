import jwtDecode from "jwt-decode";

const getObjectFromJwt: any = (token: string) => {
  return jwtDecode(token);
};

export default getObjectFromJwt;
