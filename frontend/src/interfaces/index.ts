enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  // emailVerified?: Date | null;
  role: Role;
  // phone?: string | null;
  // job?: string | null;
  // manager?: string | null;
  // department?: string | null;
  // refresh_token?: string | null;
  // access_token?: string | null;
  // balances: Balances[];
}

export interface Balances {
  id: string;
  year: string;
  annualCredit?: number | null;
  annualUsed?: number | null;
  annualAvailable?: number | null;
  healthCredit?: number | null;
  healthUsed?: number | null;
  healthAvailable?: number | null;
  studyCredit?: number | null;
  studyUsed?: number | null;
  studyAvailable?: number | null;
  maternityCredit?: number | null;
  maternityUsed?: number | null;
  maternityAvailable?: number | null;
  familyCredit?: number | null;
  familyUsed?: number | null;
  familyAvailable?: number | null;
  paternityCredit?: number | null;
  paternityUsed?: number | null;
  paternityAvailable?: number | null;
  unpaidUsed?: number | null;
  name: string;
  email: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}
