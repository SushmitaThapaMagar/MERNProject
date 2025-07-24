import RegisterForm from "../../components/forms/auth/register-from";

const Register = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border border-white w-full max-w-md px-7 py-5 rounded-md shadow-lg bg-white">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-3">
          Register
        </h1>

        {/* Register form */}
        <div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default Register;
