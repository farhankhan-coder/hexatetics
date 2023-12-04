import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function InputComponent({datas,inputEventHandler}) {
  if (!datas) {

    return null;
  }
  if(!inputEventHandler){
    return null;
  }
  const { placeHolders,values,clasname,type} = datas;
  return (
    <>
      <InputText 
      value={values} type={type} 
      placeholder={placeHolders} 
      className={clasname} 
      onChange={inputEventHandler.handelChange}></InputText>
    </>
  )
}
