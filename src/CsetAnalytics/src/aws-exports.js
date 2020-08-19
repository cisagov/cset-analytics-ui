const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:9ede6ae4-7d0c-4999-9091-c1ad644e276e",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_u5WdTzuFy",
  aws_user_pools_web_client_id: "5vb86p6m4g7ivavbftgfbsdsfp",
  oauth: {
    domain: "cset-analytics.auth.us-east-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "http://localhost:4200/",
    redirectSignOut: "http://localhost:4200/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default awsmobile;
