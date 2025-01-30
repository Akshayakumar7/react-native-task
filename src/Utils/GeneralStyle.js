import { Platform, StatusBar, StyleSheet } from "react-native";
import { hp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "./Colors";

export const style = StyleSheet.create({
  statusBarSpacer: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : hp(30),
  },
  mainView:{
    flex:1,
    backgroundColor:COLOR.white
  },
  itemDivider: {
    height: hp(10),
  },
  textinputStyle: {
    borderWidth: hp(1),
    borderRadius: hp(5),
    borderColor: COLOR.black,
    margin: hp(10),
  },
  darkThemetextinputStyle:{
    borderWidth: hp(1),
    borderRadius: hp(5),
    borderColor: COLOR.white,
    margin: hp(10),
    color:COLOR.white
  }
});
