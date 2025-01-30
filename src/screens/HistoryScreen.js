import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import CustomAccordian from "../components/CustomAccordian";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";
import { style } from "../Utils/GeneralStyle";
import { SCREEN_CONST } from "../Utils/ScreenConst";

const STORAGE_KEY = "timers";
const COMPLETED_STORAGE_KEY = "completed_timers";

const HistoryScreen = () => {
  const [timers, setTimers] = useState([]);
  const [currentItem, setCurrentItem] = useState(-1);
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
      } else {
        Alert.alert("No data", "No timers stored.");
      }
    } catch (error) {
      console.error("Error loading timers:", error);
    }
  };

  const startTimer = (index) => {
    const updatedTimers = [...timers];
    const timer = updatedTimers[index];

    if (timer.status === "Completed") return;

    if (timer.status !== "Running") {
      timer.status = "Running";

      if (timer.remainingTime === undefined) {
        timer.remainingTime = timer.duration;
      }

      const interval = setInterval(() => {
        setTimers((prevTimers) => {
          const newTimers = [...prevTimers];
          const currentTimer = newTimers[index];

          if (currentTimer.remainingTime > 0) {
            currentTimer.remainingTime -= 1;
          } else {
            clearInterval(interval);
            currentTimer.status = "Completed";
            currentTimer.remainingTime = 0;

            Alert.alert(
              "Timer Completed",
              `${currentTimer.timerName} has reached 0.`
            );

            moveTimerToCompleted(index, currentTimer);
          }

          return newTimers;
        });
      }, 1000);

      timer.interval = interval;
      setTimers(updatedTimers);
    }
  };

  const moveTimerToCompleted = async (index, completedTimer) => {
    try {
      const updatedTimers = [...timers];
      updatedTimers.splice(index, 1);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTimers));

      const storedCompleted = await AsyncStorage.getItem(COMPLETED_STORAGE_KEY);
      const completedTimers = storedCompleted
        ? JSON.parse(storedCompleted)
        : [];

      completedTimers.push(completedTimer);
      await AsyncStorage.setItem(
        COMPLETED_STORAGE_KEY,
        JSON.stringify(completedTimers)
      );

      loadTimers();
    } catch (error) {
      console.error("Error updating timer lists:", error);
    }
  };

  const pauseTimer = (index) => {
    const updatedTimers = [...timers];
    const timer = updatedTimers[index];

    clearInterval(timer.interval);
    timer.status = "Paused";
    saveTimerState(timer);

    setTimers(updatedTimers);
  };

  const resetTimer = (index) => {
    const updatedTimers = [...timers];
    const timer = updatedTimers[index];

    clearInterval(timer.interval);
    timer.status = "Not Started";
    timer.remainingTime = timer.duration;
    timer.interval = null;
    saveTimerState(timer);
    setTimers(updatedTimers);
  };

  const saveTimerState = async (timer) => {
    try {
      const storedTimers = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedTimers = storedTimers ? JSON.parse(storedTimers) : [];

      const timerIndex = parsedTimers.findIndex((t) => t.id === timer.id);
      if (timerIndex !== -1) {
        parsedTimers[timerIndex] = timer;
      } else {
        parsedTimers.push(timer);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsedTimers));
    } catch (error) {
      console.error("Error saving timer state:", error);
    }
  };

  const onPressAccordian = (index) => {
    setCurrentItem(index === currentItem ? -1 : index);
  };

  const renderItem = ({ item, index }) => (
    <View key={item?.id}>
      <CustomAccordian
        data={item}
        showDetails={index === currentItem}
        onPress={() => onPressAccordian(index)}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        index={index}
        isDarkTheme={isDarkTheme}
      />
    </View>
  );

  return (
    <View style={[isDarkTheme ? styles.darkContainer : styles.container]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={style.statusBarSpacer} />
      <Text style={[isDarkTheme ? styles.darkTitleText : styles.title]}>
        {SCREEN_CONST.HISTORY_SCREEN}
      </Text>
      {timers?.length === 0 ? (
        <Text style={[{ color: isDarkTheme ? COLOR.white : COLOR.black }]}>
          {SCREEN_CONST.NO_TIMERS_FOUND}
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

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: COLOR.white,
  },

  darkContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: COLOR.black,
  },
  title: {
    fontSize: getFontSize(24),
    fontWeight: "bold",
    marginBottom: hp(20),
    color: COLOR.black,
  },
  darkTitleText: {
    fontSize: getFontSize(24),
    fontWeight: "bold",
    marginBottom: hp(20),
    color: COLOR.white,
  },
});
