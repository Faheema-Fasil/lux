export interface RegisterFormProps {
  username: string;
  first_name: string;
  billing: BillingInfo;
}

interface BillingInfo {
  country: string;
  phone: string;
}

export interface loginFormProps {
  username: string;
  email?: string;
  password: string;
}

export interface ResetPasswordFormProps {
  email: string;
  // newPassword: string;
  // reenteredPassword: string;
  // code: string;
}
