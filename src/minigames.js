import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What is the best way to save money?",
    options: ["Spend it all", "Save a portion", "Borrow more money", "Ignore savings"],
    correct: "Save a portion"
  },
  {
    question: "Why is it important to save money?",
    options: ["To buy expensive things", "For financial security", "To impress friends", "No reason"],
    correct: "For financial security"
  },
  {
    question: "What is a good way to track savings?",
    options: ["Ignore it", "Use a savings app", "Spend first, save later", "Ask a friend"],
    correct: "Use a savings app"
  }
];

const MiniGames = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 10);
      alert("Correct! You earned 10 points.");
    } else {
      alert("Try again!");
    }
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mini Games</h2>
      <Card className="mb-4">
        <CardContent>
          <p className="text-lg mb-2">{questions[currentQuestion].question}</p>
          {questions[currentQuestion].options.map((option, index) => (
            <Button key={index} className="m-2" onClick={() => handleAnswer(option)}>
              {option}
            </Button>
          ))}
        </CardContent>
      </Card>
      <p className="text-lg font-semibold">Score: {score}</p>
    </div>
  );
};

export default MiniGames;
