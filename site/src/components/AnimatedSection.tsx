"use client";

import { motion } from "framer-motion";

const appleEase = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function AppleReveal({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px", amount: 0.2 }}
      transition={{ duration: 1, delay, ease: appleEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const appleItemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function AppleStagger({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AppleStaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={appleItemVariants}
      transition={{ duration: 0.85, ease: appleEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
