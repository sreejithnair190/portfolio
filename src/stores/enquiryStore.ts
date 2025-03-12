import { enquirySchema } from "@/lib/zod";
import { create } from "zustand";
import { z } from "zod";

type FormValues = z.infer<typeof enquirySchema>;

interface EnquiryStore {
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;
  setIsSubmitting: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setError: (message: string | null) => void;
  resetState: () => void;
  submitEnquiry: (data: FormValues) => Promise<void>;
}

export const useEnquiryStore = create<EnquiryStore>((set) => ({
  isSubmitting: false,
  submitSuccess: false,
  error: null,
  setIsSubmitting: (value) => set({ isSubmitting: value }),
  setSubmitSuccess: (value) => set({ submitSuccess: value }),
  setError: (message) => set({ error: message }),
  resetState: () => set({ submitSuccess: false, error: null }),
  submitEnquiry: async (data) => {
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        // Handle server errors with error message from API if available
        const errorMessage = responseData.error || "Failed to submit enquiry";
        throw new Error(errorMessage);
      }
      
      set({ submitSuccess: true });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        set({ submitSuccess: false });
      }, 5000);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      
      // Set the error message based on the caught error
      let errorMessage = "Failed to submit your message. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error instanceof z.ZodError) {
        errorMessage = "Please check your form inputs and try again.";
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      set({ error: errorMessage });
      
      // Clear error after 5 seconds
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    } finally {
      set({ isSubmitting: false });
    }
  },
}));