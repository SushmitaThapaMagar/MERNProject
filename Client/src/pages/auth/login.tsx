import { Link } from "react-router";
import LoginForm from "../../components/forms/auth/login-form";

const Login = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-white w-full max-w-md px-7 py-6  rounded-md shadow-lg bg-white">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-center text-cyan-700 mb-3">
          Login
        </h1>

        {/* Login form */}
        <div>
          <LoginForm />
        </div>
        <div className="mt-3 text-center">
          <p className="mt-1">
            Do not have an account?{" "}
            <Link to={"/register"}>
              <span className="text-cyan-700 font-bold cursor-pointer">
                {" "}
                Sign Up
              </span>
            </Link>
          </p>
          <p className="mt-1">
            <i>
              <span className="text-cyan-700 font-m cursor-pointer">
                Forgot Password?
              </span>
            </i>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
