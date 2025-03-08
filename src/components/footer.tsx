"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 md:py-12 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Top Section with Logo and Back to Top */}
          <div className="flex flex-col md:flex-row items-center justify-end border-b border-cyan-100/20 pb-6">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={scrollToTop} 
                variant="outline" 
                size="sm" 
                className="rounded-full border border-cyan-100/20 hover:border-cyan-300/30 hover:bg-cyan-500/10"
              >
                <ArrowUp className="h-4 w-4 mr-2 text-cyan-500" />
                Back to Top
              </Button>
            </motion.div>
          </div>
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-cyan-500">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="mailto:sreejith190nair@gmail.com" 
                    className="text-muted-foreground hover:text-cyan-400 flex items-center gap-2 group"
                  >
                    <Mail className="h-4 w-4 group-hover:text-cyan-500 transition-colors" />
                    sreejith190nair@gmail.com
                  </Link>
                </li>
                <li className="text-muted-foreground">Toronto, Canada</li>
              </ul>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-cyan-500">Navigation</h4>
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <Link href="#home" className="text-muted-foreground hover:text-cyan-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-cyan-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-muted-foreground hover:text-cyan-400">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#education" className="text-muted-foreground hover:text-cyan-400">
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-muted-foreground hover:text-cyan-400">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-cyan-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            {/* Social Media */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-cyan-500">Connect</h4>
              <div className="flex gap-4">
                <motion.div 
                  whileHover={{ y: -5, scale: 1.1 }} 
                  transition={{ duration: 0.2 }}
                  className="bg-cyan-100/10 p-3 rounded-xl border border-cyan-100/20 hover:border-cyan-300/30"
                >
                  <Link
                    href="mailto:sreejith190nair@gmail.com"
                    className="text-cyan-500"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, scale: 1.1 }} 
                  transition={{ duration: 0.2 }}
                  className="bg-cyan-100/10 p-3 rounded-xl border border-cyan-100/20 hover:border-cyan-300/30"
                >
                  <Link
                    href="https://github.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, scale: 1.1 }} 
                  transition={{ duration: 0.2 }}
                  className="bg-cyan-100/10 p-3 rounded-xl border border-cyan-100/20 hover:border-cyan-300/30"
                >
                  <Link
                    href="https://linkedin.com/in/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
              
              <Badge variant="outline" className="mt-4 border-cyan-100/20">
                Available for new opportunities
              </Badge>
            </motion.div>
          </div>
          
          {/* Copyright Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-cyan-100/20 mt-4"
          >
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {currentYear} Sreejith Nair. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </motion.footer>
  );
} 