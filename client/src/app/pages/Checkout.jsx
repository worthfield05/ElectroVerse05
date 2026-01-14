import CheckoutSteps from "@/components/ecommerce/CheckoutSteps";
import React, { useState } from "react";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Checkout Process</h2>
      <CheckoutSteps currentStep={currentStep} />
      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="px-6 py-2 border rounded-lg hover:bg-neutral-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Checkout;
