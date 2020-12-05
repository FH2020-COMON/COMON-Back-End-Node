interface ApplicationAttributes {
  id?: number;
  name: string;
  status: "서류접수중" | "합격" | "불합격" | "면접대기" | "면접가능";
  form: string;
  date?: string;
  company_id: number;
  user_email: string;
}

export default ApplicationAttributes;