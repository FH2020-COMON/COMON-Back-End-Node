enum UserType {
  "OWNER",
  "EXECUTIVE",
  "APPLICANT"
};

interface UserAttributes {
  email: string;
  name: string;
  password: string;
  userType?: UserType;
  company: number;
}

export {
  UserAttributes,
  UserType
}
