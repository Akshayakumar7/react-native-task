import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, useColorScheme, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { COLOR } from "../Utils/Colors";
import { style } from "../Utils/GeneralStyle";
import { SCREEN_CONST } from "../Utils/ScreenConst";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";

const ThemeSelection = ({ navigation }) => {
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

  const lightTheme = {
    background: "#ffffff",
    text: "#000000",
    switchThumb: "#6200ee",
  };

  const darkTheme = {
    background: "#121212",
    text: "#ffffff",
    switchThumb: "#bb86fc",
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        {isDarkTheme ? "Dark Theme" : "Light Theme"}
      </Text>

      <Switch
        value={isDarkTheme}
        onValueChange={() => setIsDarkTheme(!isDarkTheme)}
        thumbColor={theme.switchThumb}
      />
      <View style={style.itemDivider} />
      <CustomButton
        title={SCREEN_CONST.CREATE_TIMER}
        onPress={() => navigation.navigate("Home")}
        customTitleStyle={isDarkTheme && styles.customTitleStyle}
        customButtonStyle={isDarkTheme && styles.customButtonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
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
  },
});

export default ThemeSelection;
