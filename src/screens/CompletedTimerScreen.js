import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomAccordian from "../components/CustomAccordian";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";
import { style } from "../Utils/GeneralStyle";
import { SCREEN_CONST } from "../Utils/ScreenConst";

const CompletedTimerScreen = () => {
  const [timers, setTimers] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const COMPLETED_STORAGE_KEY = "completed_timers";
  const [currentItem, setCurrentItem] = useState(-1);

  const loadCompletedTimers = async () => {
    try {
      const storedData = await AsyncStorage.getItem(COMPLETED_STORAGE_KEY);
      if (storedData) {
        let tempData = (await JSON.parse(storedData)) ?? [];
        setTimers(tempData ?? []);
      }
    } catch (error) {
      console.error("Error loading completed timers:", error);
    }
  };

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      if (theme) {
        setIsDarkTheme(theme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  useEffect(() => {
    loadCompletedTimers();
    loadTheme();
  }, []);

  const onPressAccordian = (index) => {
    setCurrentItem(index === currentItem ? -1 : index);
  };

  const renderItem = ({ item, index }) => (
    <View key={item?.id}>
      <CustomAccordian
        data={item}
        showDetails={index === currentItem}
        onPress={() => onPressAccordian(index)}
        showButtons={false}
        isDarkTheme={isDarkTheme} 
      />
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? COLOR.black : COLOR.white },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
      />
      <View style={style.statusBarSpacer} />
      <Text
        style={[
          styles.title,
          { color: isDarkTheme ? COLOR.white : COLOR.black },
        ]}
      >
        {SCREEN_CONST.COMPLETED_TIMERS}
      </Text>
      {timers?.length === 0 ? (
        <Text
          style={[
            styles.noDateTextStyle,
            { color: isDarkTheme ? COLOR.white : COLOR.black },
          ]}
        >
          {SCREEN_CONST.NO_COMPLETED_TIMERS_FOUND}
        </Text>
      ) : (
        <FlatList
          data={timers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default CompletedTimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(10),
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: "bold",
    marginBottom: hp(20),
    textAlign: "center",
  },
  noDateTextStyle: {
    margin: hp(20),
    textAlign: "center",
    fontSize: getFontSize(16),
    marginTop: hp(50),
  },
});
