interface ApplicationAttributes {
  id?: number;
  name: string;
  email: string;
  form: string;
  companyId: number;
  status: "PASS" | "FAIL" | "PEND";
  date?: string;
}

export default ApplicationAttributes;