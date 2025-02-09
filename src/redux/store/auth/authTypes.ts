export interface UserState {
  isAuthenticated: boolean,
  token: string;
  loading: boolean;
  displayName: string;
  email: string;
  user_nicename: string;
  phone: string;
  isVerified: boolean;
}

export interface UserDetails {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}