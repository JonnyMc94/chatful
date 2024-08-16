declare module './aws-exports' {
    const awsmobile: {
        aws_project_region: "ca-central-1",
        aws_cognito_identity_pool_id: "ca-central-1:4e862ecb-95d7-45c8-bffb-21d7c8412ccc", // Update this if necessary
        aws_cognito_region: "ca-central-1",
        aws_user_pools_id: "ca-central-1_l5kNtopT8", // Corrected user pool ID
        aws_user_pools_web_client_id: "4guuv66r3diepagonjr23bdj8q", // Corrected client ID
        oauth: {
          domain: "chatful.auth.ca-central-1.amazoncognito.com",
          scope: ["phone", "email", "openid"],
          redirectSignIn: "http://localhost:4000/",
          redirectSignOut: "http://localhost:4000/",
          responseType: "code",
        },
        aws_cognito_username_attributes: ["EMAIL"],
        aws_cognito_social_providers: [],
        aws_cognito_signup_attributes: ["EMAIL"],
        aws_cognito_mfa_configuration: "OFF",
        aws_cognito_mfa_types: ["SMS"],
        aws_cognito_password_protection_settings: {
          passwordPolicyMinLength: 8,
          passwordPolicyCharacters: [],
        },
        aws_cognito_verification_mechanisms: ["EMAIL"],
    };
  
    export { awsmobile };
}