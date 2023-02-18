import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { TabsParamList } from ".";
type Props = BottomTabScreenProps<TabsParamList, "Home">;

export default function HomeScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Text>This is the home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
