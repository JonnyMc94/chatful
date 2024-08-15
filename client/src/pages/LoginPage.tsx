import React from "react";
import { signInWithRedirect } from "aws-amplify/auth";

const LoginPage = () => {
  // Cognito Hosted UI URL
  const cognitoHostedUIUrl =
    "https://chatful.auth.ca-central-1.amazoncognito.com/login" +
    "?response_type=code" + // Authorization Code Grant
    "&client_id=4guuv66r3diepagonjr23bdj8q" + // App Client ID
    "&redirect_uri=http://localhost:4000/" + // Callback URL
    "&scope=email+openid+phone"; // Scopes

  const signIn = async (): Promise<void> => {
    try {
      await signInWithRedirect();
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = () => {
    // Redirect to Cognito Hosted UI
    signIn();
    window.location.href = cognitoHostedUIUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <button
          onClick={handleLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in with Cognito
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
