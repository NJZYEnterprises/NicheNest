import myString from "../../utils/myString.cjs";
import MyButton from "./MyButton";

function ToggleButton({ text, state, bool, setBool, cssType, cssSpacing }) {
  if (state) [bool, setBool] = state;
  const onClick = (e) => {
    setBool(!bool);
  }

  let displayText = text;
  if (Array.isArray(text))
    displayText = text[Number(bool)];
  else if (typeof (text) === "object")
    displayText = text[String(bool)];

  if (!myString.validate(displayText))
    displayText = "Toggle";

  return <MyButton text={displayText} {...{ cssType, cssSpacing, onClick }} />
}

export default ToggleButton;