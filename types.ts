import { Database } from "./types/supabase";
export type ProfileData = Database["public"]["Tables"]["profiles"]["Row"];
export type User = {
  email: string | null;
} & Partial<ProfileData>;
export type Post = Database["public"]["Tables"]["posts"]["Row"];
