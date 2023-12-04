import React from 'react'
import { Dropdown } from 'primereact/dropdown';


export default function DropdownComponent({ attribute, eventHandlers}) {

  if (!attribute) {

    return null;
  }
  if (!eventHandlers) {

    return null;
  }
  const { options, placeholder,className,style, name, isDisable, isClearable } = attribute;


  return (
    <>
        <Dropdown 
          options={options}
          filter
          value={eventHandlers.selectedValue}
          onChange={eventHandlers.onChange}
          placeholder={placeholder}
          className={className}
          style={style}
          name={name ?? ''}
          disabled={isDisable ?? false}
          showClear={isClearable ?? false}
        />
</>
  )
}
