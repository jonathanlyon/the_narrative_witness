import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // cinematic cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInSlow: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 1.2,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealLeft: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 1.0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleReveal: React.FC<MotionProps> = ({
  children,
  delay = 0,
  duration = 1.4,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${className} overflow-hidden`}
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerStep?: number;
}

export const StaggerContainer: React.FC<StaggerProps> = ({
  children,
  className = "",
  delayChildren = 0,
  staggerStep = 0.15,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren: staggerStep,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
