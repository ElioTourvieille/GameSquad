"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <motion.footer 
      className="relative z-10 py-6 px-4 bg-indigo-950/30 backdrop-blur-sm border-t border-purple-500/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-purple-300 font-semibold">GameSquad</h3>
          <p className="text-sm text-purple-200/70">
            Created with <span className="text-purple-300">❤️</span> by Elio Tourvieille
          </p>
        </div>

        <div className="flex items-center space-x-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
            >
              <social.icon className="h-5 w-5" />
              <span className="sr-only">{social.label}</span>
            </motion.a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-sm text-purple-200/70">
            © {new Date().getFullYear()} GameSquad. All rights reserved.
          </p>
          <div className="text-xs text-purple-300/50 space-x-4">
            <a href="#" className="hover:text-purple-300">Privacy Policy</a>
            <a href="#" className="hover:text-purple-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 