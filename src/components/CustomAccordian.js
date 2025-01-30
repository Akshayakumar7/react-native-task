import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DOWN_ARROW from "../images/down.png";
import UP_ARROW from "../images/up.png";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";
import { SCREEN_CONST } from "../Utils/ScreenConst";
import CustomProgressBar from "./CustomProgressBar";

const CustomAccordian = (props) => {
  const {
    data,
    showDetails,
    onPress,
    startTimer,
    pauseTimer,
    resetTimer,
    index,
    showButtons = true,
    isDarkTheme,
  } = props;

  const textColor = isDarkTheme ? COLOR.white : COLOR.black;
  const backgroundColor = isDarkTheme ? COLOR.black : COLOR.white;
  const buttonTextColor = isDarkTheme ? COLOR.black : COLOR.white;

  return (
    <Pressable
      onPress={onPress}
      style={[
        isDarkTheme ? styles.darkpressableBorder : styles.pressableBorder,
        { backgroundColor },
      ]}
    >
      <View style={styles.rowContainer}>
        <View>
          <Text style={[styles.titleText, { color: textColor }]}>
            {data?.timerName}
          </Text>
        </View>
        <Image
          source={showDetails ? UP_ARROW : DOWN_ARROW}
          style={[styles.arrowIcon, { tintColor: textColor }]}
        />
      </View>
      <View style={styles.separator} />
      {showDetails && (
        <View>
          <Text style={[styles.detailsText, { color: textColor }]}>
            {SCREEN_CONST.TIMER_NAME}: {data?.timerName}
          </Text>
          <View style={styles.separator} />
          <Text style={[styles.detailsText, { color: textColor }]}>
            {SCREEN_CONST.TIMER_DURATION}: {data?.duration}
          </Text>
          <View style={styles.separator} />
          <Text style={[styles.detailsText, { color: textColor }]}>
            {SCREEN_CONST.TIMER_CATEGORY}: {data?.category}
          </Text>
          <View style={styles.separator} />
          <Text style={[styles.detailsText, { color: textColor }]}>
            Remaining Time: {data?.remainingTime} seconds
          </Text>
          <View style={styles.separator} />
          <CustomProgressBar
            percenatageValue={`${
              (parseFloat(data?.remainingTime) / parseFloat(data?.duration)) *
              100
            }%`}
          />
          <View style={styles.separator} />
          {showButtons && (
            <View style={styles.buttonContainer}>
              {data?.status === "Not Started" && (
                <Pressable
                  style={[styles.button, { backgroundColor: "green" }]}
                  onPress={() => startTimer(index)}
                >
                  <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                    Start
                  </Text>
                </Pressable>
              )}
              {data?.status === "Running" && (
                <Pressable
                  style={[styles.button, { backgroundColor: "#FFCC00" }]}
                  onPress={() => pauseTimer(index)}
                >
                  <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                    Pause
                  </Text>
                </Pressable>
              )}
              {data?.status === "Paused" && (
                <Pressable
                  style={[styles.button, { backgroundColor: "#007BFF" }]}
                  onPress={() => startTimer(index)}
                >
                  <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                    Resume
                  </Text>
                </Pressable>
              )}
              <Pressable
                style={[styles.button, { backgroundColor: "#DC3545" }]}
                onPress={() => resetTimer(index)}
              >
                <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                  Reset
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default CustomAccordian;

const styles = StyleSheet.create({
  pressableBorder: {
    borderWidth: hp(1),
    margin: hp(10),
    padding: hp(10),
    borderRadius: hp(5),
    borderColor: COLOR.black,
  },

  darkpressableBorder: {
    borderWidth: hp(1),
    margin: hp(10),
    padding: hp(10),
    borderRadius: hp(5),
    borderColor: COLOR.white,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  titleText: {
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  button: {
    padding: hp(5),
    borderRadius: hp(4),
    marginVertical: hp(5),
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: getFontSize(18),
    fontWeight: "bold",
  },
  separator: {
    height: hp(5),
  },
  detailsText: {
    fontSize: getFontSize(14),
    marginLeft: hp(10),
  },
  arrowIcon: {
    width: hp(20),
    height: hp(20),
  },
  buttonContainer: {
    marginTop: hp(10),
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
