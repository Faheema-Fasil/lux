export interface LoginFormProps {
  email?: string
  password: string
  username?: string
}

export interface RegisterFormProps {
  email: string;
  username: string;
  billing: BillingInfo;
  shipping: ShippingInfo;
  password: string;
  confirm_password: string;
}

interface ShippingInfo {
  country: string;
}
interface BillingInfo {
  country: string;
  phone: string;
}