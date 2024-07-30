import { useEffect, useRef, useState } from "react";
import {formatDate} from '@/utils/index'

export default function Form(props: {
  submit: any;
  formItem?: never[] | undefined;
  defaultValue?: {}
}) {
  const { submit, formItem = [], defaultValue = {} } = props;
  const form = useRef<any>(null);
  
  const [values, setValues] = useState(defaultValue);

  const submitForm = () => {
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());
    submit({...values,...data});
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    console.log(name,'handleInputChange', event ,"handleInputChange");
    
    setValues({ ...values, [name]: value });
  };

  const setItem = (item: {
    options: any;
    type: any;
    params: { type: any };
    name: string | undefined;
  }) => {
    switch (item.type) {
      case "input":
        return (
          <input
            type={item.params?.type || "text"}
            className="form-control"
            id={item.name}
            name={item.name}
            value={values[item.name]}
            aria-describedby="emailHelp"
            onChange={handleInputChange}

          />
        );

      case "radio":
        return (
          <div id={item.name}>
            {item.options.map((i, v) => {
              return (
                <div className="form-check" key={v}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.name}
                    id={i.value}
                    value={i.value}
                    checked={values[item.name] === i.value}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={i.value}
                  >
                    {i.label}
                  </label>
                </div>
              );
            })}
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className="form mt-5 mb-5 mx-auto w-50">
      <form id="form" ref={form} onSubmit={submitForm}>
        <div className="mb-3">
          {formItem.map((item, index) => {
            return (
              <div key={index} className="mb-3 mt-2">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {item.label}
                </label>
                {setItem(item)}
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
