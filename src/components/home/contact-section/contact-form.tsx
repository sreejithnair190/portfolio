"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";  
import { useEnquiryStore } from "@/stores/enquiryStore";
import { useForm } from "react-hook-form";
import { enquirySchema } from "@/lib/zod";
import { z } from "zod";
import ContactMessage from "./contact-message";
import { useEffect } from "react";

const ContactForm = () => {
  const { isSubmitting, submitSuccess, submitEnquiry } = useEnquiryStore();
  
  type FormValues = z.infer<typeof enquirySchema>;
  
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (submitSuccess) {
      form.reset();
    }
  }, [submitSuccess, form]);

  const onSubmit = async (data: FormValues) => {
    await submitEnquiry(data);
  };

  const formFields = [
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "message", label: "Message", type: "textarea" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name={field.id as keyof FormValues}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-cyan-300">
                    {field.label}
                  </FormLabel>
                  <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.02 }}>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          {...fieldProps}
                          rows={4}
                          className="border-cyan-100/20 focus:border-cyan-300 resize-none bg-background/5"
                        />
                      ) : (
                        <Input
                          {...fieldProps}
                          type={field.type}
                          className="border-cyan-100/20 focus:border-cyan-300 bg-background/5"
                        />
                      )}
                    </FormControl>
                  </motion.div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Button
            type="submit"
            className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                Send Message
                <motion.span
                  animate={isSubmitting ? {} : { x: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Send className="h-4 w-4" />
                </motion.span>
              </>
            )}
          </Button>
        </motion.div>

        <ContactMessage />
      </form>
    </Form>
  );
};

export default ContactForm;