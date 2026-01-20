import PaymentDetails from "@/components/ecommerce/PaymentDetails";
import ShippingAddress from "@/components/ecommerce/ShippingAddress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getCart,
  getShippingAddress,
  setShippingAddress,
} from "@/hooks/useCart";
import { useCartItem } from "@/hooks/useCartItem";
import { useCreateOrder } from "@/hooks/useOrder";
import {
  paymentSchema,
  shippingAddressSchema,
} from "@/schemas/shipping.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  ShoppingBag,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const steps = [
  { id: 1, title: "Shipping", icon: Truck },
  { id: 2, title: "Confirm", icon: ShoppingBag },
  { id: 3, title: "Payment", icon: CreditCard },
];
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate, isPending, isSuccess, isError, error } = useCreateOrder();

  const shippingDetails = getShippingAddress();

  const cartItems = getCart();

  const cartQueries = useCartItem();

  const shippingForm = useForm({
    resolver: zodResolver(shippingAddressSchema),
    mode: "onBlur",
    defaultValues: {
      country: shippingDetails.country || "",
      phone: shippingDetails.phone || "",
      state: shippingDetails.state || "",
      address: shippingDetails.address || "",
      city: shippingDetails.city || "",
      pin: shippingDetails.pin || "",
    },
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardHolder: "", cardNumber: "", expiry: "", cvv: "" },
  });
  const cartSummaryItems = cartQueries
    .map((query, index) => {
      if (!query.data) return null;
      return {
        price: query.data.product.price,
        quantity: cartItems[index].quantity,
        product: query.data.product._id,
        name: query.data.product.name,
        image: query.data.product.image[0].url,
      };
    })
    .filter(Boolean);
  const subtotal = cartSummaryItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const handleNext = async () => {
    let valid = false;
    if (currentStep === 1) {
      valid = await shippingForm.trigger();

      let shippingDetail = {
        country: shippingForm.getValues("country"),
        phone: shippingForm.getValues("phone"),
        state: shippingForm.getValues("state"),
        address: shippingForm.getValues("address"),
        city: shippingForm.getValues("city"),
        pin: shippingForm.getValues("pin"),
      };
      setShippingAddress(shippingDetail);
    } else if (currentStep === 2) {
      valid = true;
    }

    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onFinalSubmit = async () => {
    const shippingInfo = {
      address: shippingDetails.address,
      city: shippingDetails.city,
      country: shippingDetails.country,
      pinCode: shippingDetails.pin,
      phone: shippingDetails.phone,
    };
    const orderItems = cartSummaryItems;
    const paymentInfo = {
      id: Date.now().toString(36) + Math.random(),
      status: "Processing",
    };
    const itemPrice = subtotal;
    const taxPrice = tax;
    const shippingPrice = 0;
    const totalPrice = total;
    mutate({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center p-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold">Success!</h2>
        <p className="text-gray-500">Your order has been placed.</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-4"
        >
          Start Over
        </Button>
      </div>
    );
  }

  const progressValue = (currentStep / steps.length) * 100;
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center px-2 mb-4">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep >= s.id;
            const isCurrent = currentStep === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    isActive
                      ? "bg-black text-white shadow-lg"
                      : "bg-white text-gray-400 border border-gray-200"
                  }
                  ${isCurrent ? "ring-2 ring-black ring-offset-2" : ""}`}
                >
                  <Icon size={18} />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
        <Progress value={progressValue} />
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-left">
            {steps[currentStep - 1].title} Details
          </h1>

          {currentStep === 1 && <ShippingAddress shippingForm={shippingForm} />}

          {currentStep === 2 && (
            <div className="text-left space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold border-b pb-2 mb-2">Order Summary</p>
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>Rs. {total.toFixed(2)} inc. tax</span>
                </div>
              </div>
              <div className="text-sm">
                <p className="font-bold">Shipping To:</p>
                <p>
                  {shippingForm.getValues().address},{" "}
                  {shippingForm.getValues().city}
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && <PaymentDetails paymentForm={paymentForm} />}
        </div>

        <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onFinalSubmit}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700 text-white border-none"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Complete Purchase"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
