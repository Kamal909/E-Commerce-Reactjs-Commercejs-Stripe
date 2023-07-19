import React from 'react';
import {TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CustomTextField = ({ name, label, required }) => {
   const { control }  = useFormContext();


  return (
    <div>
        <Grid item xs={12} sm={6}>
            <Controller
            as={TextField}
            defaultValue=""
            control={control}
            name={name}
            label={label}
            fullWidth
            required={required}
            render={({ field }) => <TextField {...field} />}
        />
        </Grid>
      
    </div>
  )
}

export default CustomTextField
