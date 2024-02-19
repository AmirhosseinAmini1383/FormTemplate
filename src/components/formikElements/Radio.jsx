import React from "react";
import { FastField } from "formik";
import { Fragment } from "react";

const Radio = (props) => {
  const { label, options, name } = props;
  return (
    <div className="mb-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <FastField className="form-control" id={name} name={name}>
        {({ field }) => {
          console.log(field);
          return options.map((o) => (
            <Fragment key={o.id}>
              <input
                className="form-check-input mx-2"
                type="radio"
                id={o.id}
                {...field}
                value={o.id}
                checked={field.value == o.id}
              />
              <label htmlFor={o.id} className="mx-1 mx-4">
                {o.value}
              </label>
            </Fragment>
          ));
        }}
      </FastField>
    </div>
  );
};

export default Radio;
