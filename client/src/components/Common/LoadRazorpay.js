import apihelper from "../ApiHelper";

const razor = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(window.Razorpay);
    };

  
    document.body.appendChild(script);
  });
};

export default async function LoadRazorpay(paymentoption) {
  const Razorpay = await razor();

  var options = {
    key: paymentoption.apikey,
    amount: paymentoption.amount, // Amount in paise (100 paise = 1 rupee)
    currency: paymentoption.currency,
    name: "amazona",
    description: "Purchase Description",
    orderid: paymentoption.razorpayorderid,
    image: "https://your-company-logo.png",

    handler: async function (response) {

      try {
        let paymentdetails = {
          orderid: paymentoption.orderid,
          paymentid: response.razorpay_payment_id,
          razorpayorderid: paymentoption.razorpayorderid,
        };


        const result = await apihelper.verifypayment(paymentdetails);
        if (result) {
          paymentoption.navigate(`/order/${result.data.orderid}`)
        }

        console.log(result.data.orderid);

      } catch (error) {
        console.log(error);
      }
      // Callback function after payment success
      // alert("Payment successful!");
      
      console.log(response);
    },
    prefill: {
      name: paymentoption.name,
      contact: paymentoption.phone,
    },
    notes: {
      address: paymentoption.address,
    },
    theme: {
      color: "#00000",
    },
    paymentmethod: {
      card: true,
      netbanking: true,
      wallet: true,
      upi: true,
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
