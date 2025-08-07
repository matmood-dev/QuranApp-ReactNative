import React from "react";
import { Text, StyleSheet, TextProps, TextStyle } from "react-native";

type AppTextProps = TextProps & {
  size?: number;
  weight?: "normal" | "bold" | "600" | "700";
  color?: string;
  font?:
    | "normalFont"
    | "QuranFont"
    | "lightFont"
    | "boldFont"
    | "duaLightFont"
    | "duaBoldFont"
    | "duaNormalFont";
  align?: "right" | "left" | "center";
  marginBottom?: number;
  writingDirection?: "rtl" | "ltr";
  flex?: number;
  borderBottomWidth?: number;
  borderBottomColor?: string;
  width?: string;
  alignSelf?: string;
  paddingBottom?: number;
  paddindTop?: number;
  paddingHorizontal?: number;
  lineHeight?: number;
};

export default function AppText({
  style,
  size = 16,
  weight = "normal",
  color = "#212529",
  font = "normalFont",
  align = "right",
  marginBottom = 0,
  writingDirection = "rtl",
  flex = 0,
  borderBottomWidth = 0,
  borderBottomColor = "",
  width = undefined,
  alignSelf = "center",
  paddingBottom = 0,
  paddindTop = 0,
  paddingHorizontal = 0,
  lineHeight,
  ...props
}: AppTextProps) {
  const combinedStyle: TextStyle = {
    fontFamily: font,
    fontSize: size,
    fontWeight: weight,
    color,
    textAlign: align,
    marginBottom: marginBottom,
    writingDirection: writingDirection,
    flex: flex || 0,
    borderBottomWidth: borderBottomWidth,
    borderBottomColor: borderBottomColor,
    width: width,
    alignSelf: align === "center" ? "center" : "flex-start",
    paddingBottom: paddingBottom,
    paddingTop: paddindTop,
    paddingHorizontal: paddingHorizontal,
    lineHeight: lineHeight,
  };

  return <Text {...props} style={[combinedStyle, style]} />;
}
