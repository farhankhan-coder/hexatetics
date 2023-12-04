import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function InputComponent({datas,inputEventHandler}) {
  if (!datas) {

    return null;
  }
  if(!inputEventHandler){
    return null;
  }
  const { placeHolders,values,clasname,type,isDisable,name} = datas;
  return (
    <>
      <InputText 
      value={values} type={type} 
      placeholder={placeHolders} 
      className={clasname} 
      disabled={isDisable ?? false}
      name={name ?? ''}
      onChange={inputEventHandler.handelChange}></InputText>
    </>
  )
}
