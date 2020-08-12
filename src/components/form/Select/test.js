import React, { useState } from 'react';
import { Select, Divider, Input, Form } from 'antd';
import './index.scss';

const { Option } = Select;

const DropDown = ({
  placeholder, text, options, label, multiple, ...restProps
}) => {
  // const [form] = Form.useForm();
  // const onGenderChange = value => {
  //   console.log(value);
  //   form.setFieldsValue({
  //     socialId: value,
  //   });
  // };
  return (
    // <div className='form-control'>
    // <label className='form-label'>
    //   {label}
    // </label>
    // <br />
    // <div className="custom-select">
    <Select
      className="form-field"
      placeholder={placeholder}
      label={label}
      showSearch
      mode={multiple}
      // onChange={onGenderChange}
      // {...restProps}
      dropdownRender={(menu) => (
        <div>
          {menu}
        </div>
      )}
    >
      {options.map((item) => (
        <Option key={item.id || item}>{item.value || item}</Option>
      ))}
    </Select>
    // </div>
    // </div>
  );
};

export default DropDown;
