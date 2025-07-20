import "./auth/login.css";
const Login = () => {
  return (
    <main>
      <h1>
        Login
        {/*form*/}
      </h1>
      <div className="wrapper">
        {/*email*/}

        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            placeholder="shopkart@gmail.com"
            type="email"
          />
        </div>
        {/*password*/}
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        {/*Login*/}
        <br />
        <div className="input-wrapper">
          <button>Login</button>
        </div>
      </div>
    </main>
  );
};

export default Login;
