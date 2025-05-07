"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Courses", href: "/courses" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col space-y-4"
            >
              <Link href="/" className="text-2xl font-bold tracking-tighter">
                True<span className="text-primary">Space</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Modern educational platform with high-quality video courses for everyone.
              </p>
            </motion.div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={section.title} className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-medium mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} TrueSpace. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-muted-foreground">
                Designed with ♥ for the modern learning experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 