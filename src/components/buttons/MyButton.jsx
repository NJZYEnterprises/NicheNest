import myString from "../../utils/myString.cjs";

function MyButton({ text, onClick, cssType, cssColor, cssSpacing, cssAdd, isBold = true }) {
  if (!myString.validate(text)) text = "Button";
  if (!myString.validate(cssType)) cssType = "view";

  const classNames = [`${cssType}-button rounded textShadow`];
  classNames.push(cssSpacing ?? "py-1 px-2 mx-2");
  classNames.push(cssColor ?? "text-white");
  if (isBold) classNames.push("font-bold");
  if (cssAdd) classNames.push(cssAdd);

  return <button
    className={classNames.join(' ')}
    onClick={onClick}>
    {text}
  </button>
}

export default MyButton;