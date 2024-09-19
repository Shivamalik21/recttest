import React, { useState } from 'react';
import { Formik, Field, Form,} from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
   const[isActive,setActive]=useState("button")
   const[col,setCol]=useState("transparent")
   const[color,setColor]=useState("lightgrey")


   
   
  return (
    <Formik
   
      initialValues={{ firstName: '',email: '' }}
      validate={values => {
        const errors = {};
         if((values.firstName==="")){
            setActive("button")
            setCol("transparent")
            setColor("lightgrey") 

         }else if(!values.email.includes("@")||!values.email.includes(".com")){
            setActive("button")
            setCol("transparent")
            setColor("lightgrey") 
 
         } else if (!values.password) {
            errors.password = 'Required';
         
        } else if(values.password!==(values.conf_password)){
             errors.conf_password="correct input"
            setActive("button")
            setCol("transparent")
            setColor("lightgrey")
          
         }
         
         else{
            setActive("submit")
            setCol("green")
            setColor("white")
         }
      
        return errors;
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
       
        email: Yup.string().email('Invalid email address').required('Required'),
        })}
        
      onSubmit={(values, { setSubmitting }) => {
      
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
        {({   values,
         errors,
         touched,
         handleChange,
         handleBlur,
        
         }) => (
      <Form className='App'>
        <h1>Welcome!</h1>
      
       <Field  className="input" name="firstName" type="text" placeholder="Name" />
       {errors.firstName && touched.firstName ? (
             <div className='error'>{errors.firstName}</div>
           ) : null}
      
       <Field  className="input" name="email" type="email" placeholder="Email"/>
       {errors.email && touched.email ? <div  className='error'>{errors.email}</div> : null}
       <Field
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             className="input"
             placeholder="password"
           />
              {errors.password && touched.password && errors.password?<div  className='error'>{errors.password}</div> : null}
           <Field
             type="password"
             name="conf_password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.conf_password}
             className="input"
              placeholder="confirm password"
           />
           {errors.conf_password?<div  className='error'>{errors.conf_password}</div> : null}
          

           <button type={isActive} style={{backgroundColor:col, color:color}}>Sign UP</button>
      </Form>
    
       
       )}
    </Formik>
  );
};
export default SignupForm