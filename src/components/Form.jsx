import React, { useEffect, useState } from "react";
import myString from "../utils/myString.cjs";
import myObj from "../utils/myObj.cjs";
import MyButton from "./buttons/MyButton";

export class InputData {
  constructor({ id, name, label, type, required, options, enforceOptions }) {
    Object.entries(arguments[0]).forEach(([key, value]) => this[key] = value);
    if (!this.label) this.label = myString.capitalize(this.name);
    if (!this.id) this.id = name;
    if (options) {
      this.list = name + "Options";
      if (enforceOptions) this.pattern = options.join('|');
    }
  }

  isValid() {
    return this.name;
  }
}

const Form = ({ defaultData, reactiveData, title, submitFn, inputs, injectComponents, css }) => {
  if (defaultData && Array.isArray(inputs)) {
    defaultData = myObj.unwrap(defaultData, inputs.map(e => e.name));
    inputs.forEach(e => { if (defaultData.hasOwnProperty(e)) e.placeholder = defaultData[e]; });
  }

  const [formData, setFormData] = useState(defaultData ? { ...defaultData } : {});
  const [errorMsg, setErrorMsg] = useState("");
  const [textareaHeightMap, setTextareaHeightMap] = useState({});

  let inputWidth = "10em";
  if (inputs.some(i => i.type === "textarea"))
    inputWidth = "15em";

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        ...myObj.unwrap(reactiveData, inputs.map(e => e.name)),
      }
    })
  }, [reactiveData])

  const onChange = event => {
    const { name, value } = event.target;

    if (event.target.tagName === "TEXTAREA") {
      setTextareaHeightMap((prevData) => {
        return {
          ...prevData,
          [name]: `${event.target.scrollHeight}px`,
        }
      })
    }

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!(submitFn instanceof Function)) return;

    const errorMsg = await submitFn(formData);
    if (typeof errorMsg === "string" && errorMsg.length > 0) {
      setErrorMsg(errorMsg);
      return;
    } else setErrorMsg("");

    if (defaultData) setFormData({ ...defaultData });
    else {
      setFormData((prevData) => {
        return Object.keys(prevData).reduce((acc, e) => { acc[e] = ""; return acc; }, {});
      });
    }
  }

  return <div className={`${css?.colorClass ?? "primary-color-t"} card flex justify-center items-center m-2 px-3 py-2 rounded-md shadow-md w-max`}>
    <section className="containerForm textShadow">
      {title && <h2 className="text-2xl font-bold mb-2 p-1">{title}</h2>}
      <form onSubmit={onSubmit} className="flex flex-col" >
        {Array.isArray(inputs) && inputs.map(input => {
          if (!(input instanceof InputData && input.isValid())) return null;
          const InputTag = input.type === "textarea" ? "textarea" : "input";
          const styling = { width: inputWidth, color: "black" };
          if (input.type === "textarea") {
            styling.minHeight = "1.5em";
            styling.height = textareaHeightMap[input.name] ?? styling.minHeight;
          }
          return <div key={input.id} className="flex justify-end" style={{ margin: "1px 0" }}>
            <label className="mr-2" htmlFor={input.id}>{input.label}:</label>
            <InputTag style={styling} {...input} value={formData[input.name]} onChange={onChange}></InputTag>
            {input.options &&
              <datalist id={input.list}>
                {input.options.map((e, i) => <option key={i} value={e} />)}
              </datalist>
            }
          </div>
        })}
        <div>
          <MyButton text={submitFn?.value ?? "Submit"} cssType="submit" cssAdd={"mt-4"} />
        </div>
        {errorMsg && <div className="error-text" >{errorMsg}</div>}
      </form>
      {Array.isArray(injectComponents) &&
        injectComponents.filter(ec => React.isValidElement(ec))
      }
    </section>
  </div>
}

export default Form;