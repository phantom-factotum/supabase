import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import ContextContainer from "./src/Context";
import { getData } from "./src/helpers/storage";
import { Theme } from "./src/hooks/useThemeReducer";
import Screens from "./src/screens";

type Props = {};
type SavedData = {
  themeData: Theme;
};

export default function App(props: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedData, setSavedData] = useState<SavedData | null>(null);
  useEffect(() => {
    getData()
      .then((data) => {
        setSavedData(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
      });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {isLoaded ? (
        <SafeAreaProvider>
          <ContextContainer {...savedData}>
            <Screens />
          </ContextContainer>
        </SafeAreaProvider>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center'
  },
});
