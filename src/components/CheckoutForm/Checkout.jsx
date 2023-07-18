
import React,{ useState, useEffect }  from 'react';
import { Paper, Stepper, Step,  StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import useStyles from './styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { commerce } from '../lib/commerce';


const steps =['Shiping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
       const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, { type:'cart' } );
            setCheckoutToken(token);
        }
        catch (error) {
            console.log("Error Testing");
        }
       }
       generateToken();

    }, [ cart]);
const  nextStep = () =>setActiveStep((preActiveStep) => preActiveStep + 1);
const  backStep = () =>setActiveStep((preActiveStep) => preActiveStep - 1);                                                                                                                                                                                                                                                                                                                                                            

    const next = (data) => {
     setShippingData(data);
     nextStep();
    }

    const Confirmation = () => (
        <div >
            Thank you message
        </div>
    )

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={ checkoutToken } 
         next={next}
         shippingData={shippingData}
         />
        : <PaymentForm 
            shippingData={shippingData} 
            checkoutToken={checkoutToken} 
            backStep={backStep} 
            nextStep={nextStep} 
            onCaptureCheckout={onCaptureCheckout}/>

  return (
    <>
      <div className= { classes.toolbar }/>
      <main className= { classes.layout } > 
      <Paper className={classes.paper}>
        <Typography variant= "h4" align= "center">Checkout</Typography>
        {error}
        <Stepper activeStep={activeStep} className={classes.stepper} >
            {steps.map((step) => (
                <Step key={step}>
                    <StepLabel>{step}
                    </StepLabel>
                </Step>
             ))}
        </Stepper>

       {activeStep === steps.length ? <Confirmation /> : checkoutToken &&  <Form />}
      </Paper>
      
      </main>
    </>
  )
}

export default Checkout
