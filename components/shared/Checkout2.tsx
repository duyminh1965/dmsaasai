"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

const PayPalCheckout = ({ amount }: { amount: number }) => {
  const { toast } = useToast();
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load the PayPal script
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;
        script.onload = initializePayPalButtons;
        document.body.appendChild(script);
      } else {
        initializePayPalButtons();
      }
    };

    const initializePayPalButtons = () => {
      if (paypalRef.current && window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toFixed(2), // Convert amount to string with two decimals
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              try {
                const order = await actions.order.capture();
                toast({
                  title: "Payment Successful",
                  description: `Transaction completed with ID: ${order.id}`,
                  duration: 5000,
                  className: "success-toast",
                });
                console.log("Order details:", order);
              } catch (error) {
                toast({
                  title: "Payment Error",
                  description: "Something went wrong while processing your payment.",
                  duration: 5000,
                  className: "error-toast",
                });
                console.error("Payment error:", error);
              }
            },
            onError: (err) => {
              toast({
                title: "Error",
                description: "An error occurred during the payment process.",
                duration: 5000,
                className: "error-toast",
              });
              console.error("PayPal error:", err);
            },
          })
          .render(paypalRef.current);
      }
    };

    loadPayPalScript();
  }, [amount, toast]);

  return (
    <section>
      <div ref={paypalRef}></div>
      <div className="mt-4">
        <Button
          onClick={() => toast({ title: "PayPal Button Loaded", description: "You can now complete the transaction." })}
          className="w-full rounded-full bg-blue-600 text-white"
        >
          Continue with PayPal
        </Button>
      </div>
    </section>
  );
};

export default PayPalCheckout;
