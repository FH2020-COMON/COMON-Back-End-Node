enum UserType {
  "OWNER",
  "EXECUTIVE",
  "APPLICANT"
};

interface UserAttributes {
  email: string;
  name: string;
  password: string;
  user_type?: UserType;
  company?: number;
}

export {
  UserAttributes,
  UserType
}
