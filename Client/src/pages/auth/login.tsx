import LoginForm from "../../components/forms/auth/login-form";

const Login = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-white w-full max-w-md px-7 py-6  rounded-md shadow-lg bg-white">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-3">
          Login
        </h1>

        {/* Login form */}
        <div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
