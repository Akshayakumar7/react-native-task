import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { getFontSize, hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";

const CustomButton = (props) => {
  const { title, onPress, customButtonStyle, customTitleStyle } = props;
  return (
    <Pressable
      style={[styles.buttonStyle, customButtonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.titleStyle, customTitleStyle]}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: "center",
    fontSize: getFontSize(14),
    fontWeight: "bold",
    color:COLOR.black
  },
  buttonStyle: {
    margin: hp(10),
    padding: hp(10),
    backgroundColor: "#0A84FF",
    borderRadius: hp(5),
  },
});
