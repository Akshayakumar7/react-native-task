import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import * as FileSystem from "expo-file-system";
import React from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";
import { style } from "../Utils/GeneralStyle";
import { SCREEN_CONST } from "../Utils/ScreenConst";

const COMPLETED_STORAGE_KEY = "completed_timers";
const STORAGE_KEY = "timers";

const ExportFile = ({ navigation }) => {
  const systemTheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [completedTimers, setCompletedTimers] = React.useState([]);
  const [timers, setTimers] = React.useState([]);

  const loadCompletedTimers = async () => {
    try {
      const storedData = await AsyncStorage.getItem(COMPLETED_STORAGE_KEY);
      if (storedData) {
        let tempData = (await JSON.parse(storedData)) ?? [];
        setCompletedTimers(tempData ?? []);
      }
    } catch (error) {
      console.error("Error loading completed timers:", error);
    }
  };

  const loadTimers = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setTimers(JSON.parse(storedData));
      } else {
        Alert.alert("No data", "No timers stored.");
      }
    } catch (error) {
      console.error("Error loading timers:", error);
    }
  };

  React.useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkTheme(savedTheme === "dark");
      } else {
        setIsDarkTheme(systemTheme === "dark");
      }
    };
    loadTheme();
    loadCompletedTimers();
    loadTimers();
  }, [systemTheme]);

  const exportJson = async (data, fileName) => {
    try {
      const jsonData = JSON.stringify(data);
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, jsonData);
      Alert.alert("Success", `File saved as: ${fileUri}`);
    } catch (error) {
      console.error("Error exporting JSON:", error);
      Alert.alert("Error", "Failed to save the file.");
    }
  };

  return (
    <View style={[isDarkTheme ? styles.darkThemeMainView : style.mainView]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={style.statusBarSpacer} />
      <Text
        style={[
          isDarkTheme
            ? styles.darkThemeExportTextStyle
            : styles.exportTextStyle,
        ]}
      >
        {SCREEN_CONST.EXPORT_DATA}
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={SCREEN_CONST.EXPORT_HISTORY}
          customTitleStyle={isDarkTheme && styles.customTitleStyle}
          customButtonStyle={[
            isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
          ]}
          onPress={() => exportJson(completedTimers, "completedData.json")}
        />

        <CustomButton
          title={SCREEN_CONST.EXPORT_TIMERS}
          customTitleStyle={isDarkTheme && styles.customTitleStyle}
          customButtonStyle={[
            isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
          ]}
          onPress={() => exportJson(timers, "timersData.json")}
        />
      </View>
    </View>
  );
};

export default ExportFile;

const styles = StyleSheet.create({
  exportTextStyle: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    color: COLOR.black,
    textAlign: "center",
    margin: hp(15),
  },

  darkThemeExportTextStyle: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    color: COLOR.white,
    textAlign: "center",
    margin: hp(15),
  },

  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },

  customTitleStyle: {
    textAlign: "center",
    fontSize: getFontSize(14),
    fontWeight: "bold",
    color: COLOR.white,
  },

  customButtonStyle: {
    margin: hp(10),
    padding: hp(10),
    backgroundColor: COLOR.orange,
    borderRadius: hp(5),
    width: "40%",
  },

  normalButtonStyle: {
    width: "40%",
  },

  darkThemeMainView: {
    flex: 1,
    backgroundColor: COLOR.black,
  },
});
