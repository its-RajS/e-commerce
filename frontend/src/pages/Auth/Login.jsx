import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../comonents/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation(); //get the query string form the URL
  const sp = new URLSearchParams(search); //parses the query string
  const redirect = sp.get("redirect") || "/"; //gets the redirect value from the query string or default to "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Add validation
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      console.log("Attempting login with:", { email }); // Debug log

      const res = await login({ email, password }).unwrap();
      console.log("Login Response:", res); // Debug response

      if (res) {
        dispatch(setCredentials({ ...res }));
        toast.success("Login successful!");
        navigate(redirect); // Add explicit navigation
      }
    } catch (error) {
      console.error("Login error details:", error); // Debug error
      toast.error(
        error?.data?.message ||
          error?.error ||
          error?.message ||
          "Failed to login. Please check your credentials."
      );
    }
  };

  return (
    <div>
      <section className=" pl-[10rem] flex flex-wrap ">
        <div className=" mr-[4rem] mt-[5rem] ">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={submitHandler} className="container w-[40rem] ">
            <div className="my-[2rem] ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded-xl w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem] ">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password Address
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded-xl w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] "
            >
              {isLoading ? "Signin In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline "
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
