import React from "react";
import PersonalInfoForm from "./steps/PersonalInfoForm";
import OrganizationDetailsForm from "./steps/OrganizationDetailsForm";
import ContactDetailsForm from "./steps/ContactDetailsForm";
import ReviewForm from "./steps/ReviewForm";

export default function StepForm({ step, formData, setFormData, onNext, onBack }) {
  switch (step) {
    case 0:
      return <PersonalInfoForm data={formData} setData={setFormData} onNext={onNext} />;
    case 1:
      return (
        <OrganizationDetailsForm
          formData={formData}
          setFormData={setFormData}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 2:
      return <ContactDetailsForm data={formData} setData={setFormData} onNext={onNext} onBack={onBack} />;
    case 3:
      return <ReviewForm data={formData} onBack={onBack} />;
    default:
      return null;
  }
}

