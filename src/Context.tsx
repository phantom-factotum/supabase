import { NavigationContainer } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { User } from "../types";
import { saveData } from "./helpers/storage";
import useThemeReducer, { Theme } from "./hooks/useThemeReducer";
import { supabase } from "./initSupabase";
type ThemeContextType = ReturnType<typeof useThemeReducer>;
export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);
type SContextType = {
  session: Session | null;
  user: User;
} | null;
export const SessionContext = createContext<SContextType>(null);

type Props = {
  themeData?: Theme | {};
  children: React.ReactNode;
};

export default function ContextContainer({ themeData = {}, children }: Props) {
  const [user, setUser] = useState<User>(null);
  const [session, setSession] = useState<Session | null>(null);
  const theme = useThemeReducer(themeData);
  // on mount get supabase session
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    // subscribe to auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) supabase.removeAllChannels();
    });
  }, []);
  // get user profile data and subscribe to changes on the user profile database
  useEffect(() => {
    if (!session?.user.id) {
      setUser(null);
      return;
    }
    // get user data
    supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log("error retrieving profile data", error);
        }
        if (data) {
          setUser({
            email: session.user?.email || null,
            id: session.user.id,
            ...data,
          });
        }
      });
    // subscribe to use profile data changes
    const subscription = supabase
      .channel(`UserProfileData`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${session.user.id}`,
        },
        (payload) => {
          setUser({
            email: session.user.email,
            id: session.user.id,
            ...payload["new"],
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [session]);
  // save @react-navigation react-native-paper theme to AsyncStorage
  useEffect(() => {
    saveData({ theme });
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <PaperProvider theme={theme.theme}>
        <NavigationContainer style={{ flex: 1 }} theme={theme.theme}>
          <SessionContext.Provider value={{ session, user }}>
            {children}
          </SessionContext.Provider>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
