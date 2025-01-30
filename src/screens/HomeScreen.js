import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";
import { style } from "../Utils/GeneralStyle";
import { CATEGORY, SCREEN_CONST } from "../Utils/ScreenConst";
import CustomButton from "../components/CustomButton";
import CustomDropDown from "../components/CustomDropdown";

const STORAGE_KEY = "timers";

const HomeScreen = ({ navigation }) => {
  const [timerName, setTimerName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [timers, setTimers] = useState([]);

  const systemTheme = useColorScheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkTheme(savedTheme === "dark");
      } else {
        setIsDarkTheme(systemTheme === "dark");
      }
    };
    loadTheme();
  }, [systemTheme]);

  useEffect(() => {
    AsyncStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setTimers(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading timers:", error);
    }
  };

  const saveTimer = async () => {
    if (!timerName || !duration || !category) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      timerName,
      duration,
      category,
      status: "Not Started",
    };

    const updatedTimers = [...timers, newTimer];

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTimers));
      setTimers(updatedTimers);
      setTimerName("");
      setDuration("");
      setCategory("");
      Alert.alert("Success", "Timer saved successfully!");
    } catch (error) {
      console.error("Error saving timer:", error);
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
            ? styles.darkThemeCreateTimerTextStyle
            : styles.createTimerTextStyle,
        ]}
      >
        {SCREEN_CONST.CREATE_TIMER}
      </Text>
      <TextInput
        placeholder={SCREEN_CONST.ENTER_TIMER_NAME}
        style={
          isDarkTheme ? style.darkThemetextinputStyle : style.textinputStyle
        }
        onChangeText={setTimerName}
        value={timerName}
        placeholderTextColor={isDarkTheme ? COLOR.white : COLOR.black}
      />
      <TextInput
        placeholder={SCREEN_CONST.ENTER_TIMER_DURATION}
        style={
          isDarkTheme ? style.darkThemetextinputStyle : style.textinputStyle
        }
        keyboardType="numeric"
        onChangeText={setDuration}
        value={duration}
        placeholderTextColor={isDarkTheme ? COLOR.white : COLOR.black}
      />
      <CustomDropDown
        listData={CATEGORY}
        onselect={(item) => setCategory(item?.value)}
        placeHolder={SCREEN_CONST.SELECT_CATEGORY}
        value={category}
        isDarkTheme={isDarkTheme}
        customTextInputStyle={isDarkTheme && style.darkThemetextinputStyle}
        placeholderTextColor={isDarkTheme ? COLOR.white : COLOR.black}
      />
      <View style={style.itemDivider} />
      <View style={{ alignSelf: "center" }}>
        <CustomButton
          title={SCREEN_CONST.SAVE}
          onPress={saveTimer}
          customTitleStyle={isDarkTheme && styles.customTitleStyle}
          customButtonStyle={[
            isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
          ]}
        />
      </View>
      <View style={style.itemDivider} />

      <View style={styles.allButtonStyle}>
        <View style={styles.flexView}>
          <CustomButton
            title={SCREEN_CONST.HISTORY}
            customTitleStyle={isDarkTheme && styles.customTitleStyle}
            customButtonStyle={[
              isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
            ]}
            onPress={async () => {
              navigation.navigate("History");
              setTimers([]);
            }}
          />
          <CustomButton
            title={SCREEN_CONST.COMPLETED}
            customTitleStyle={isDarkTheme && styles.customTitleStyle}
            customButtonStyle={[
              isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
            ]}
            onPress={async () => {
              navigation.navigate("Complete");
            }}
          />
        </View>
        <View style={styles.flexView}>
          <CustomButton
            title={SCREEN_CONST.RESET_ALL}
            customTitleStyle={isDarkTheme && styles.customTitleStyle}
            customButtonStyle={[
              isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
            ]}
            onPress={async () => {
              await AsyncStorage.clear();
            }}
          />
          <CustomButton
            title={SCREEN_CONST.EXPORT}
            customTitleStyle={isDarkTheme && styles.customTitleStyle}
            customButtonStyle={[
              isDarkTheme ? styles.customButtonStyle : styles.normalButtonStyle,
            ]}
            onPress={async () => {
              navigation.navigate("ExportFile");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  createTimerTextStyle: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    color: COLOR.black,
    textAlign: "center",
    margin: hp(15),
  },

  darkThemeCreateTimerTextStyle: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    color: COLOR.white,
    textAlign: "center",
    margin: hp(15),
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  allButtonStyle: { position: "absolute", bottom: 10, right: 20 },
  darkThemeMainView: {
    flex: 1,
    backgroundColor: COLOR.black,
  },
  normalButtonStyle: {
    width: "40%",
  },
});
