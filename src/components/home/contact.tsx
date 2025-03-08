"use client";

import { useState } from "react";
import ScrollReveal from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Send,
  CheckCircle,
  MoveRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/utils/contact";

const gridPatternStyle = `
  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <style jsx>{gridPatternStyle}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container px-4 md:px-6">
        <ScrollReveal width="100%" className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold tracking-tighter md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 bg-clip-text text-transparent"
          >
            Get In Touch{" "}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss opportunities? I&apos;d
            love to hear from you.
          </motion.p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full border border-cyan-100/20 bg-card/95 backdrop-blur-sm shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-base">
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {CONTACT.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/5 hover:bg-background/10 transition-colors group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <div className="bg-cyan-100/20 p-3 rounded-lg">
                      <item.icon className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-cyan-300">{item.title}</p>
                      {item.href ? (
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1"
                        >
                          {item.content}
                          <MoveRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border border-cyan-100/20 bg-card/95 backdrop-blur-sm shadow-lg hover:shadow-[0_0_25px_rgba(103,232,249,0.1)]">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Send a Message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and I&apos;ll get back to you ASAP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: "name", label: "Name", type: "text" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "message", label: "Message", type: "textarea" },
                  ].map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor={field.id}
                        className="text-sm font-medium text-cyan-300"
                      >
                        {field.label}
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        {field.type === "textarea" ? (
                          <Textarea
                            id={field.id}
                            name={field.id}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="border-cyan-100/20 focus:border-cyan-300 resize-none bg-background/5"
                          />
                        ) : (
                          <Input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleChange}
                            required
                            className="border-cyan-100/20 focus:border-cyan-300 bg-background/5"
                          />
                        )}
                      </motion.div>
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

                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        className="flex items-center gap-3 p-4 rounded-md bg-green-100/90 dark:bg-green-900/30 text-green-700 dark:text-green-400 backdrop-blur-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <p>
                          Message sent successfully! I&apos;ll get back to you
                          soon.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
