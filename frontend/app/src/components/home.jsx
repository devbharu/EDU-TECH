import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [hovered, setHovered] = useState(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.main 
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <section className="text-center mb-8 sm:mb-12">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          EDUTECH
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Empowering students with AI-driven personalized learning, interactive study tools, and gamified motivation.
        </motion.p>
      </section>

      {/* Cards */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="bg-black bg-opacity-70 rounded-2xl shadow-xl p-5 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur transform transition-all duration-300"
          variants={item}
          whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-yellow-400"
            animate={{ scale: hovered === 1 ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Personalised Learners
          </motion.h2>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <motion.li variants={item}>AI-Driven Personal Learning Assistant for real-time guidance</motion.li>
            <motion.li variants={item}>Smart Content Generation: flashcards, quizzes, summaries</motion.li>
            <motion.li variants={item}>Real-Time Performance Insights and progress tracking</motion.li>
            <motion.li variants={item}>Interactive AI Study Companion for adaptive learning</motion.li>
            <motion.li variants={item}>Gamification: badges, leaderboards, daily motivation</motion.li>
            <motion.li variants={item}>Multilingual Support with accessibility tools </motion.li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-black bg-opacity-70 rounded-2xl shadow-xl p-5 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur transform transition-all duration-300"
          variants={item}
          whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.h2 
            className="text-xl sm:text-2xl font-semibold text-yellow-400"
            animate={{ scale: hovered === 2 ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Key Features
          </motion.h2>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <motion.li variants={item}>AI-Driven Learning Assistant for tailored learning</motion.li>
            <motion.li variants={item}>Interactive Study Companion with revision aids</motion.li>
            <motion.li variants={item}>AI Tutors and Study Rooms</motion.li>
            <motion.li variants={item}>AI Mentor and Peer Group collaboration</motion.li>
            <motion.li variants={item}>Gamified learning with leaderboards</motion.li>
          </ul>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="text-center mt-8 sm:mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.button 
          className="bg-yellow-400 text-black text-base sm:text-lg px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started with COLOSSUS 2.0
        </motion.button>
      </motion.section>
    </motion.main>
  );
}