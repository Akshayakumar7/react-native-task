import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const fontScale = PixelRatio.getFontScale();

const widthScale = (size) => (width / guidelineBaseWidth) * size;
const heightScale = (size) => (height / guidelineBaseHeight) * size;
export const getFontSize = (size) => size / fontScale;

export { heightScale as hp, widthScale as wp };
