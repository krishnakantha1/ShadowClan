import axios from "axios";

const getDetailsFromToken = (token) => {
  const {} = axios({
    url: "localhost:5000/login/verify",
    token,
  });
  return {};
};

export default getDetailsFromToken;
