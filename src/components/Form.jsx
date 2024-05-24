import React, { useState } from "react";
import myString from "../utils/myString.cjs";

export class InputData {
  constructor({ id, name, label, type, required }) {
    Object.entries(arguments[0]).forEach(([key, value]) => this[key] = value);
    if (!this.label) this.label = myString.capitalize(this.name);
    if (!this.id) this.id = this.name;
  }

  isValid() {
    return this.name;
  }
}

const Form = (props) => {
  const { title, submitFn, inputs, injectComponents } = props;

  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [textareaHeightMap, setTextareaHeightMap] = useState({});

  let inputWidth = "10em";
  if (inputs.some(i => i.type === "textarea"))
    inputWidth = "15em";

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

    event.target.reset();
  }

  return <div className="flex justify-center items-center m-2 bg-gray-700 px-3 py-2 rounded-md shadow-md w-max">
    <section className="containerForm">
      {title && <h2 className="text-2xl font-bold mb-2 p-1">{title}</h2>}
      <form onSubmit={onSubmit} className="flex flex-col" >
        {Array.isArray(inputs) && inputs.map(input => {
          if (!(input instanceof InputData && input.isValid())) return null;

          const InputTag = input.type === "textarea" ? "textarea" : "input";
          const styling = { width: inputWidth };
          if (input.type === "textarea") {
            styling.minHeight = "1.5em";
            styling.height = textareaHeightMap[input.name] ?? styling.minHeight;
          }

          return <div key={input.id} className="flex justify-end">
            <label className="mr-2" htmlFor={input.id}>{input.label}:</label>
            <InputTag style={styling} {...input} onChange={onChange}></InputTag>
          </div>
        })}
        <div>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-4 py-2 px-4 rounded" type="submit">{submitFn?.value ?? "Submit"}</button>
        </div>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </form>
      {Array.isArray(injectComponents) &&
        injectComponents.filter(ec => React.isValidElement(ec))
      }
    </section>
  </div>
}

export default Form;