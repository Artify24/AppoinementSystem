import api from "../../api";
import { Doctor } from "@/types/models";

// Login
export async function login(Email: string, Passwords: string): Promise<Doctor> {
  try {
    const res = await api.post("AdminAuth/login", { Email, Passwords });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}
