import React from "react";
import { Select } from "antd";
import "./index.scss";

const { Option } = Select;

const DropDown = ({
  placeholder,
  options,
  label,
  multiple,
  onChange,
  tags,
  value,
  allowClear,
  defaultValue,
}) => {
  return (
    <>
      <div
        className={`form-control ${multiple || tags ? "mutliple-select" : ""}`}
      >
        {label && (
          <>
            <label className="form-label">{label}</label>
            <br />
          </>
        )}
        <Select
          placeholder={placeholder}
          label={label}
          showSearch
          mode={multiple ? "multiple" : tags ? "tags" : null}
          onChange={onChange}
          dropdownRender={(menu) => <div>{menu}</div>}
          value={value}
          allowClear={allowClear}
          defaultValue={defaultValue}
        >
          {options.map((item) => (
            <Option value={item.id || item} key={item.id || item}>
              {item.value || item}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default DropDown;
