import React, { useState } from "react";

export class InputData {
  constructor({ id, name, label, type, required }) {
    Object.entries(arguments[0]).forEach(([key, value]) => this[key] = value);
  }
}

const Form = (props) => {
  const { title, submitFn, inputs, injectComponents } = props;

  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = event => {
    const { name, value } = event.target
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
      <form onSubmit={onSubmit} className="flex flex-col">
        {Array.isArray(inputs) && inputs.map(input => {
          if (!(input instanceof InputData)) return null;
          return <div key={input.id} className="flex justify-end">
            <label className="mr-2" htmlFor={input.id}>{input.label ?? input.name}:</label>
            <input {...input} onChange={onChange}></input>
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