import { Database } from "./types/supabase";
export type ProfileData = Database["public"]["Tables"]["profiles"]["Row"];
export type User =
  | null
  | ({
      username: string | null;
      email: string | null;
      avatar_url: string | null;
      id: string | null;
    } & ProfileData);
export type Post = Database["public"]["Tables"]["posts"]["Row"];
