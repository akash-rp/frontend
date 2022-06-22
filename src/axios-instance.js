import axios from "axios";
import router from "./routes";
const instance = axios.create({
  baseURL: "http://localhost/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    let { status } = err.response;
    if (status == 401) {
      console.log("unauthorized");
      router.push("/login");
    }
    return Promise.reject(err);
  }
);
// instance.interceptors.request.use(
//   (req) => {
//     console.log(JSON.stringify(req));
//     return res;
//   },
//   (err) => {
//     console.log(JSON.stringify(err));
//     return err;
//   }
// );
export default instance;
