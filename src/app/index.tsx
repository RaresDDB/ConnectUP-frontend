import store from "../store";
import theme from "../theme";
import Router from "../router";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ThemeProvider } from "@emotion/react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
                    <Elements stripe={stripePromise}>
                        <Router />
                    </Elements>
                </APIProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default App;