import React from "react";
import { StyleSheet, View } from "react-native";
import { hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";

const CustomProgressBar = (props) => {
  const { percenatageValue = "0%" } = props;
  return (
    <View style={styles.outerView}>
      <View style={[styles.innerView, { width: percenatageValue }]} />
    </View>
  );
};

export default CustomProgressBar;

const styles = StyleSheet.create({
  outerView: {
    borderWidth: hp(0.3),
    borderColor: COLOR.black,
    borderRadius: hp(20),
    width: "100%",
    height: hp(10),
  },
  innerView: {
    height: hp(10),
    borderRadius: hp(20),
    backgroundColor: COLOR.green,
  },
});
