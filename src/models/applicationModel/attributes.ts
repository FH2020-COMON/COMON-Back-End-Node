interface ApplicationAttributes {
  id?: number;
  name: string;
  email: string;
  form: string;
  companyId: number;
  status: "서류접수중" | "합격" | "불합격" | "면접대기" | "면접가능";
  date?: string;
}

export default ApplicationAttributes;