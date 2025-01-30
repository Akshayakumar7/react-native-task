import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getFontSize, hp, wp } from "../Methods/ScreenRatioMethods";
import { COLOR } from "../Utils/Colors";
import { style } from "../Utils/GeneralStyle";
import DOWN_ARROW from "../images/down.png";
import UP_ARROW from "../images/up.png";

const CustomDropDown = ({
  placeHolder,
  value,
  listData = [],
  onselect,
  customTextInputStyle,
  isDarkTheme,
  customContentStyle,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const onSelectDropDownElement = (item) => {
    onselect?.(item);
    setShowDropDown(false);
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setShowDropDown(!showDropDown);
        }}
        style={[style.textinputStyle, customTextInputStyle]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder={placeHolder}
              value={value}
              editable={false}
              pointerEvents="none"
              style={[{ color: isDarkTheme ? COLOR.white : COLOR.black }]}
              placeholderTextColor={isDarkTheme ? COLOR.white : COLOR.black}
            />
          </View>
          <Image
            source={showDropDown ? UP_ARROW : DOWN_ARROW}
            style={{
              height: hp(20),
              width: wp(20),
              tintColor: isDarkTheme ? COLOR.white : COLOR.black,
            }}
          />
        </View>
      </Pressable>
      {showDropDown && (
        <ScrollView
          style={[
            isDarkTheme
              ? styles.darkThemescrollViewStyle
              : styles.scrollViewStyle,
            customContentStyle,
          ]}
          nestedScrollEnabled={true}
        >
          {listData.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => onSelectDropDownElement(item)}
              style={styles.itemContainer}
            >
              <Text
                style={[
                  isDarkTheme
                    ? styles.darkThemitemTextStyle
                    : styles.itemTextStyle,
                ]}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: COLOR.white,
    maxHeight: hp(200),
    borderRadius: hp(10),
    borderWidth: hp(0.5),
    borderColor: COLOR.grey,
    width: "95%",
    alignSelf: "center",
  },
  darkThemescrollViewStyle: {
    backgroundColor: COLOR.black,
    maxHeight: hp(200),
    borderRadius: hp(10),
    borderWidth: hp(0.5),
    borderColor: COLOR.grey,
    width: "95%",
    alignSelf: "center",
  },
  itemContainer: {
    padding: hp(10),
    borderBottomWidth: hp(0.5),
    borderBottomColor: COLOR.grey,
  },
  itemTextStyle: {
    fontSize: getFontSize(16),
    color: COLOR.black,
  },
  darkThemitemTextStyle: {
    fontSize: getFontSize(16),
    color: COLOR.white,
  },
  inputStyle: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default CustomDropDown;
