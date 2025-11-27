"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PlanData {
  name: string;
  price: number;
  features: string[];
  isVilla: boolean;
}

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description: string;
  hasQuantity?: boolean; // For services that can have multiple quantities
}

const additionalServices: AdditionalService[] = [
  {
    id: "3d-floor-plan",
    name: "3D Floor plan",
    price: 450,
    description: "3D Floor plan",
  },
  {
    id: "seasonal-photography",
    name: "Foto med säsongsbyte",
    price: 250,
    description: "Digital omvandling av bilder på bostaden för att se ut som under olika årstider",
  },
  {
    id: "broker-video",
    name: "Videos of property with broker presentation",
    price: 550,
    description: "Videos of property with broker presentation",
  },
  {
    id: "drone-photos",
    name: "Drönarbilder",
    price: 70,
    description: "Professionella drönarfoton",
    hasQuantity: true,
  },
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [formData, setFormData] = useState({
    zipcode: "",
    address: "",
    date: "",
    additionalServices: [] as string[],
    serviceQuantities: {} as Record<string, number>, // Track quantities for services
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isStockholmCounty, setIsStockholmCounty] = useState<boolean | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phone: "",
    zipcode: "",
    address: "",
  });

  const totalSteps = 6;

  useEffect(() => {
    // Get plan data from URL params
    const planName = searchParams.get("plan");
    const isVilla = searchParams.get("type") === "villa";
    
    // Define plans (same as pricing component)
    const plans = [
      {
        name: "Fotografi",
        price: isVilla ? 3200 : 2200,
        features: [
          "1 session med 20-25 interiörfoton",
          "3 exteriörfoton",
          "1 skymningsbild",
          "1 planritning",
        ],
      },
      {
        name: "Video",
        price: isVilla ? 3200 : 2200,
        features: [
          "30 sekunders video (horisontell eller vertikal)",
          "Drönarvideo inkluderad",
        ],
      },
      {
        name: "Fotografi + Video",
        price: isVilla ? 4800 : 3300,
        features: [
          "1 session med 20-25 interiörfoton",
          "3 exteriörfoton",
          "1 skymningsbild",
          "1 planritning",
          "30 sekunders video (horisontell eller vertikal)",
          "Drönarvideo inkluderad",
        ],
      },
    ];

    const selectedPlan = plans.find((p) => p.name === planName) || plans[0];
    setPlanData({
      ...selectedPlan,
      isVilla,
    });
  }, [searchParams]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (10 digits starting with 0)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    const cleaned = phone.replace(/\s|-/g, "");
    return phoneRegex.test(cleaned);
  };

  // Check if zipcode is in Stockholm County
  // Stockholm County zipcodes: 10000-19999 (Stockholm city and surrounding areas)
  const checkStockholmCounty = (zipcode: string): boolean => {
    const cleaned = zipcode.replace(/\s/g, "");
    if (cleaned.length !== 5) return false;
    
    const zipNum = parseInt(cleaned);
    // Stockholm County zipcodes range from 10000 to 19999
    return zipNum >= 10000 && zipNum <= 19999;
  };

  const handleZipcodeChange = (value: string) => {
    // Only allow digits and spaces, max 5 digits
    const cleaned = value.replace(/\D/g, "").substring(0, 5);
    setFormData({ ...formData, zipcode: cleaned, address: "" });
    setValidationErrors({ ...validationErrors, zipcode: "", address: "" });
    
    // Check if it's Stockholm County when we have 5 digits
    if (cleaned.length === 5) {
      const isStockholm = checkStockholmCounty(cleaned);
      setIsStockholmCounty(isStockholm);
    } else {
      setIsStockholmCounty(null);
    }
  };

  const validateForm = () => {
    const errors = {
      email: "",
      phone: "",
      zipcode: "",
      address: "",
    };

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Ange en giltig e-postadress";
    }

    if (formData.phone) {
      const cleaned = formData.phone.replace(/\s|-/g, "");
      if (!validatePhone(cleaned)) {
        errors.phone = "Ange ett giltigt telefonnummer (10 siffror som börjar med 0)";
      }
    }

    if (formData.zipcode.length !== 5) {
      errors.zipcode = "Ange ett giltigt postnummer (5 siffror)";
    }

    // Only validate address if in Stockholm County
    if (isStockholmCounty) {
      const addressTrimmed = formData.address.trim();
      if (addressTrimmed.length < 3) {
        errors.address = "Ange en giltig adress";
      } else if (!/\d/.test(addressTrimmed)) {
        errors.address = "Adressen måste innehålla minst en siffra";
      }
    }

    setValidationErrors(errors);
    return !errors.email && !errors.phone && !errors.zipcode && (!isStockholmCounty || !errors.address);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        // Must have valid zipcode, and if Stockholm County, must have address
        const hasValidZipcode = formData.zipcode.length === 5 && !validationErrors.zipcode;
        if (!hasValidZipcode) return false;
        // If Stockholm County, address is required and must contain at least one digit
        if (isStockholmCounty === true) {
          const addressTrimmed = formData.address.trim();
          return addressTrimmed.length >= 3 && /\d/.test(addressTrimmed) && !validationErrors.address;
        }
        // If not Stockholm County, we can proceed (they'll see the positive message)
        return true;
      case 3:
        return formData.date !== "";
      case 5:
        const isEmailValid = formData.email.trim() !== "" && validateEmail(formData.email);
        const isPhoneValid = formData.phone.trim() !== "" && validatePhone(formData.phone.replace(/\s|-/g, ""));
        return (
          formData.fullName.trim() !== "" &&
          isEmailValid &&
          isPhoneValid
        );
      case 6:
        // Summary step - always allow proceeding
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAdditionalService = (serviceId: string) => {
    setFormData((prev) => {
      const isIncluded = prev.additionalServices.includes(serviceId);
      const service = additionalServices.find((s) => s.id === serviceId);
      
      return {
        ...prev,
        additionalServices: isIncluded
          ? prev.additionalServices.filter((id) => id !== serviceId)
          : [...prev.additionalServices, serviceId],
        // Set default quantity to 1 if service has quantity and is being added
        serviceQuantities: isIncluded
          ? { ...prev.serviceQuantities, [serviceId]: 0 }
          : service?.hasQuantity
          ? { ...prev.serviceQuantities, [serviceId]: 1 }
          : prev.serviceQuantities,
      };
    });
  };

  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    setFormData((prev) => {
      const newQuantity = Math.max(0, quantity);
      // If quantity becomes 0, remove the service from selected services
      if (newQuantity === 0 && prev.additionalServices.includes(serviceId)) {
        return {
          ...prev,
          additionalServices: prev.additionalServices.filter((id) => id !== serviceId),
          serviceQuantities: {
            ...prev.serviceQuantities,
            [serviceId]: 0,
          },
        };
      }
      return {
        ...prev,
        serviceQuantities: {
          ...prev.serviceQuantities,
          [serviceId]: newQuantity,
        },
      };
    });
  };

  const calculateTotal = () => {
    const basePrice = planData?.price || 0;
    const additionalPrice = formData.additionalServices.reduce((sum, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      if (!service) return sum;
      
      // If service has quantity, multiply price by quantity
      if (service.hasQuantity) {
        const quantity = formData.serviceQuantities[serviceId] || 0;
        return sum + (service.price * quantity);
      }
      return sum + service.price;
    }, 0);
    return basePrice + additionalPrice;
  };

  const calculateVAT = () => {
    return Math.round(calculateTotal() * 0.25);
  };

  const calculateTotalWithVAT = () => {
    return calculateTotal() + calculateVAT();
  };

  const handleSubmit = async () => {
    if (!validateForm() || !canProceed()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const selectedServices = formData.additionalServices.map((id) => {
        const service = additionalServices.find((s) => s.id === id);
        if (!service) return null;
        
        if (service.hasQuantity) {
          const quantity = formData.serviceQuantities[id] || 0;
          return {
            name: `${service.name} (${quantity} st)`,
            price: service.price * quantity,
          };
        }
        return { name: service.name, price: service.price };
      }).filter(Boolean);

      const submissionData = {
        plan: planData,
        zipcode: formData.zipcode,
        address: isStockholmCounty 
          ? `${formData.address}, ${formData.zipcode}` 
          : `Postnummer: ${formData.zipcode} (Vi når din zon snart!)`,
        date: formData.date,
        additionalServices: selectedServices,
        contact: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        total: calculateTotal(),
        vat: calculateVAT(),
        totalWithVAT: calculateTotalWithVAT(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // Store order data in localStorage as backup
        localStorage.setItem("lastOrder", JSON.stringify(submissionData));
        // Redirect to success page with order data
        const encodedData = encodeURIComponent(JSON.stringify(submissionData));
        window.location.href = `/contact/success?data=${encodedData}`;
      } else {
        setSubmitStatus("error");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  if (!planData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70">Laddar formulär...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center px-4 py-4 sm:py-8 mx-auto">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/70">Steg {currentStep} av {totalSteps}</span>
            <span className="text-sm text-white/70">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto"
          >
            {/* Step 1: Plan Summary */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-5">Din valda plan</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{planData.name}</h3>
                    <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent mb-4">
                      {planData.price} kr
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-base">Ingår i paketet:</h3>
                    <ul className="space-y-3">
                      {planData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-base leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Zipcode and Address */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Var ligger fastigheten?</h2>
                <p className="text-white/70 mb-6">Ange postnummer för objektet som ska fotograferas</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Postnummer</label>
                    <input
                      type="text"
                      value={formData.zipcode}
                      onChange={(e) => handleZipcodeChange(e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                        validationErrors.zipcode
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-amber-500"
                      }`}
                      placeholder="123 45"
                      maxLength={5}
                    />
                    {validationErrors.zipcode && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.zipcode}</p>
                    )}
                  </div>

                  {/* Show message if not in Stockholm County */}
                  {isStockholmCounty === false && formData.zipcode.length === 5 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/30 rounded-lg"
                    >
                      <p className="text-amber-400 font-semibold mb-1">Vi når din zon snart! 🚀</p>
                      <p className="text-white/80 text-sm">
                        Vi expanderar vår verksamhet och kommer snart att kunna erbjuda våra tjänster i ditt område. 
                        Vi kontaktar dig så snart vi är redo!
                      </p>
                    </motion.div>
                  )}

                  {/* Show address field if in Stockholm County */}
                  {isStockholmCounty === true && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-sm font-medium mb-2">Adress</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          const addressTrimmed = e.target.value.trim();
                          if (addressTrimmed.length > 0 && addressTrimmed.length < 3) {
                            setValidationErrors({ ...validationErrors, address: "Ange en giltig adress" });
                          } else if (addressTrimmed.length >= 3 && !/\d/.test(addressTrimmed)) {
                            setValidationErrors({ ...validationErrors, address: "Adressen måste innehålla minst en siffra" });
                          } else {
                            setValidationErrors({ ...validationErrors, address: "" });
                          }
                        }}
                        onBlur={() => {
                          const addressTrimmed = formData.address.trim();
                          if (addressTrimmed.length < 3) {
                            setValidationErrors({ ...validationErrors, address: "Ange en giltig adress" });
                          } else if (!/\d/.test(addressTrimmed)) {
                            setValidationErrors({ ...validationErrors, address: "Adressen måste innehålla minst en siffra" });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                          validationErrors.address
                            ? "border-red-500 focus:ring-red-500"
                            : "border-white/20 focus:ring-amber-500"
                        }`}
                        placeholder="Ex: Storgatan 12"
                      />
                      {validationErrors.address && (
                        <p className="text-red-400 text-sm mt-1">{validationErrors.address}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Date Picker */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">När ska fotograferingen ske?</h2>
                <p className="text-white/70 mb-6">Välj önskat datum för fotograferingen</p>
                <div>
                  <label className="block text-sm font-medium mb-2">Datum</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full max-w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 [color-scheme:dark] text-sm sm:text-base"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Additional Services */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Vill du lägga till extratjänster?</h2>
                <p className="text-white/70 mb-6">Välj eventuella extratjänster</p>
                <div className="space-y-3 mb-6">
                  {additionalServices.map((service) => {
                    const isSelected = formData.additionalServices.includes(service.id);
                    const quantity = formData.serviceQuantities[service.id] || 0;
                    const totalPrice = service.hasQuantity ? service.price * quantity : service.price;
                    
                    return (
                      <div
                        key={service.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          isSelected
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAdditionalService(service.id)}
                            className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">{service.name}</span>
                              <span className="text-amber-400 font-semibold">
                                {service.hasQuantity 
                                  ? `+${service.price} kr/st` 
                                  : `+${service.price} kr`}
                              </span>
                            </div>
                            <p className="text-sm text-white/70 mb-2">{service.description}</p>
                            {service.hasQuantity && isSelected && (
                              <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-white/70">Antal:</label>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateServiceQuantity(service.id, Math.max(0, quantity - 1));
                                    }}
                                    className="w-8 h-8 rounded border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    min="0"
                                    value={quantity}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      updateServiceQuantity(service.id, Math.max(0, val));
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateServiceQuantity(service.id, quantity + 1);
                                    }}
                                    className="w-8 h-8 rounded border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                                  >
                                    +
                                  </button>
                                </div>
                                {quantity > 0 && (
                                  <span className="text-amber-400 font-semibold ml-auto">
                                    Totalt: {totalPrice} kr
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>

                {/* Total Preview */}
                <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Baspris:</span>
                    <span className="font-semibold">{planData.price} kr</span>
                  </div>
                  {formData.additionalServices.length > 0 && (
                    <>
                      {formData.additionalServices.map((serviceId) => {
                        const service = additionalServices.find((s) => s.id === serviceId);
                        if (!service) return null;
                        
                        const quantity = formData.serviceQuantities[serviceId] || 0;
                        const totalPrice = service.hasQuantity ? service.price * quantity : service.price;
                        const displayName = service.hasQuantity && quantity > 0
                          ? `${service.name} (${quantity} st)`
                          : service.name;
                        
                        return (
                          <div key={serviceId} className="flex justify-between items-center mb-2">
                            <span className="text-white/70">{displayName}:</span>
                            <span className="font-semibold">+{totalPrice} kr</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-2">
                    <span className="text-white/70">Subtotal:</span>
                    <span className="font-semibold">{calculateTotal()} kr</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Moms (25%):</span>
                    <span className="font-semibold">{calculateVAT()} kr</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/20 mt-3">
                    <span className="text-lg font-semibold">Totalt inkl. moms:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                      {calculateTotalWithVAT()} kr
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contact Details */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Kontaktuppgifter</h2>
                <p className="text-white/70 mb-6">Ange dina kontaktuppgifter så återkommer vi till dig</p>
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400">Ett fel uppstod. Vänligen försök igen.</p>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">Fullständigt namn</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Förnamn Efternamn"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">E-post</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (e.target.value && !validateEmail(e.target.value)) {
                          setValidationErrors({ ...validationErrors, email: "Ange en giltig e-postadress" });
                        } else {
                          setValidationErrors({ ...validationErrors, email: "" });
                        }
                      }}
                      onBlur={() => {
                        if (formData.email && !validateEmail(formData.email)) {
                          setValidationErrors({ ...validationErrors, email: "Ange en giltig e-postadress" });
                        }
                      }}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                        validationErrors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-amber-500"
                      }`}
                      placeholder="namn@exempel.se"
                    />
                    {validationErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefonnummer</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const formatted = value.length > 0 ? value.substring(0, 10) : "";
                        setFormData({ ...formData, phone: formatted });
                        if (formatted && !validatePhone(formatted)) {
                          setValidationErrors({ ...validationErrors, phone: "Ange ett giltigt telefonnummer (10 siffror som börjar med 0)" });
                        } else {
                          setValidationErrors({ ...validationErrors, phone: "" });
                        }
                      }}
                      onBlur={() => {
                        if (formData.phone && !validatePhone(formData.phone)) {
                          setValidationErrors({ ...validationErrors, phone: "Ange ett giltigt telefonnummer (10 siffror som börjar med 0)" });
                        }
                      }}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                        validationErrors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-amber-500"
                      }`}
                      placeholder="0701234567"
                      maxLength={10}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Order Summary */}
            {currentStep === 6 && (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sammanfattning av din bokning</h2>
                  <p className="text-white/70">Granska din bokning innan du skickar</p>
                </div>
                
                <div className="space-y-4">
                  {/* Plan */}
                  <div className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-green-400">{planData.name}</h3>
                        <p className="text-white/70 text-sm mb-2">{planData.isVilla ? "Villa" : "Lägenhet"}</p>
                        <p className="text-2xl font-bold text-green-400">{planData.price} kr</p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-blue-400">Plats</h3>
                        {isStockholmCounty ? (
                          <p className="text-white/90 font-medium">{formData.address}, {formData.zipcode}</p>
                        ) : (
                          <p className="text-white/90 font-medium">Postnummer: {formData.zipcode}</p>
                        )}
                        <p className="text-white/80 mt-2 text-sm">
                          📅 {new Date(formData.date).toLocaleDateString("sv-SE", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Services */}
                  {formData.additionalServices.length > 0 && (
                    <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg text-purple-400">Extratjänster</h3>
                      </div>
                      <ul className="space-y-2 ml-9">
                        {formData.additionalServices.map((serviceId) => {
                          const service = additionalServices.find((s) => s.id === serviceId);
                          if (!service) return null;
                          
                          const quantity = formData.serviceQuantities[serviceId] || 0;
                          const totalPrice = service.hasQuantity ? service.price * quantity : service.price;
                          const displayName = service.hasQuantity && quantity > 0
                            ? `${service.name} (${quantity} st)`
                            : service.name;
                          
                          return (
                            <li key={serviceId} className="flex justify-between items-center">
                              <span className="text-white/90 flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                                {displayName}
                              </span>
                              <span className="font-semibold text-green-400">+{totalPrice} kr</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/40 rounded-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg text-amber-400">Prisuppdelning</h3>
                    </div>
                    <div className="space-y-2 mb-4 ml-9">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Baspris:</span>
                        <span className="font-semibold text-white">{planData.price} kr</span>
                      </div>
                      {formData.additionalServices.length > 0 && (
                        <>
                          {formData.additionalServices.map((serviceId) => {
                            const service = additionalServices.find((s) => s.id === serviceId);
                            if (!service) return null;
                            
                            const quantity = formData.serviceQuantities[serviceId] || 0;
                            const totalPrice = service.hasQuantity ? service.price * quantity : service.price;
                            const displayName = service.hasQuantity && quantity > 0
                              ? `${service.name} (${quantity} st)`
                              : service.name;
                            
                            return (
                              <div key={serviceId} className="flex justify-between items-center">
                                <span className="text-white/80">{displayName}:</span>
                                <span className="font-semibold text-white">+{totalPrice} kr</span>
                              </div>
                            );
                          })}
                        </>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="text-white/80">Subtotal:</span>
                        <span className="font-semibold text-white">{calculateTotal()} kr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Moms (25%):</span>
                        <span className="font-semibold text-white">{calculateVAT()} kr</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t-2 border-amber-500/40 mt-4 ml-9">
                      <span className="text-xl font-bold text-white">Totalt inkl. moms:</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        {calculateTotalWithVAT()} kr
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tillbaka
              </Button>
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 5 ? "Visa sammanfattning" : "Nästa"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Skickar..." : "Skicka"}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70">Laddar formulär...</p>
        </div>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}

