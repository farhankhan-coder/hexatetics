import React from "react";
import { Calendar } from 'primereact/calendar';

const CalenderComponet = ({attribute,eventHandlersofCalender}) => {


  const { value, placeholder, className,dateFormat,selectionMode} = attribute;
  const { calenderchangeHandler}=eventHandlersofCalender;

  return (
    <div>
      <Calendar
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={ calenderchangeHandler}
        dateFormat={dateFormat}
        selectionMode={selectionMode}
      />
    </div>
  );
};

export default CalenderComponet;
