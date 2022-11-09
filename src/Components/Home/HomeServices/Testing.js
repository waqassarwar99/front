// import React from 'react'
// import TextField from '@mui/material/TextField';
// const Testing = () => {
//   return (
//     <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}><TextField id="standard-basic" label="Number of Menu" variant="standard" /></div>
//   )
// }

// export default Testing


import React, { useState } from 'react'
import './Testing.css'
import TextField from '@mui/material/TextField';

const Testing = () => {

    const [formValues, setFormValues] = useState([{ name: "", email : ""}])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              {/* <label>Name</label> */}
              <TextField id="standard-basic" label="Name" variant="standard"  onChange={e => handleChange(index, e)}/>
              {/* <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} /> */}
              <label>Email</label>
              <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    )
}

export default Testing