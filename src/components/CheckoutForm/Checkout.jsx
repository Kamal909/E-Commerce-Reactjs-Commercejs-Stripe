
import React,{ useState, useEffect }  from 'react';
import { Paper, Stepper, Step,  StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { commerce } from '../lib/commerce';
import { useNavigate } from 'react-router-dom';



const steps =['Shiping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const navigate = useNavigate();
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {

        
       const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, { type:'cart' } );
            setCheckoutToken(token);
        }
        catch (error) {
           navigate('/');
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

        const timeout = () => {
            setTimeout(() => {
                setIsFinished(true);
            }, 3000);
        }
            
       
  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

    if(error)
    {
        <>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <Button component={Link} to="/" variant='outlined' type="button"></Button>
        </>
    }

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
            onCaptureCheckout={onCaptureCheckout}
            timeout= {timeout}/>

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
