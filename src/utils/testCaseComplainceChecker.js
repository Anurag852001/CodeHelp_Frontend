import { DataTypeEnums, enumValue } from "../enums/DataTypeEnums";

export default function testCaseComplianceChecker(type, value) {
  const enumType = enumValue(type);
  console.log("enumType:" + enumType);
  switch (enumType) {
    case DataTypeEnums.INTEGER_ARRAY:
      return checkComplianceWithIntegerArray(value);
    case DataTypeEnums.INTEGER:
      return checkComplianceWithInteger(value);
    case DataTypeEnums.FLOAT:
      return checkComplianceWithFloat(value);
    case DataTypeEnums.STRING:
      return ""; // Assuming any string is valid, no validation required
    default:
      return "Invalid data type";
  }
}

function checkComplianceWithIntegerArray(value) {
  // Checking if the value starts with "[" and ends with "]"
  if (!value.startsWith("[") || !value.endsWith("]")) {
    return "Invalid start of array, an array should start with [ and end with ]";
  }

  const strippedVal = value.substring(1, value.length - 1).trim();
  if (strippedVal === "") return "Empty arrays are not allowed";

  const elements = strippedVal.split(",");

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i].trim();

    if (!/^[-+]?\d+$/.test(element)) {
      return `Invalid element "${element}" in array, expected only integer values`;
    }
  }

  return "";
}

function checkComplianceWithFloat(value) {
  if (!/^[-+]?\d*\.?\d+([eE][-+]?\d+)?$/.test(value)) {
    return "Invalid float value entered";
  }
  return "";
}

function checkComplianceWithInteger(value) {
  if (!/^[-+]?\d+$/.test(value)) {
    return "Invalid integer value entered";
  }
  return "";
}
