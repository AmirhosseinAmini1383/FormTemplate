import { FastField } from "formik";
import React from "react";
import { Fragment } from "react";

const Checkbox = (props) => {
  const { option, name } = props;
  return (
    <div>
      <div>
        <FastField className="form-control" name={name}>
          {({ field }) => {
            console.log(field);
            return option.map((o) => (
              <Fragment key={o.id}>
                <input
                  type="checkbox"
                  id={o.value}
                  {...field}
                  value={o.value}
                  checked={field.value && field.value.includes(o.value)}
                />
                <label className="radio">{o.value}</label>
              </Fragment>
            ));
          }}
        </FastField>
      </div>
    </div>
  );
};

export default Checkbox;
