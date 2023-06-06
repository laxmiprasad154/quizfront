import { useState } from "react";

function useForm(getfreshModelObject){
const[values,setValues]=useState(getfreshModelObject());
const [errors,setErrors]=useState({});
const handleInputChange=e=>{
    const{name,value}=e.target
    setValues({
        ...values,
        [name]:value
    })
}
return{
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
}
}
export  default useForm;