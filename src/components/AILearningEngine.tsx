import React, { useState, useEffect } from "react";

interface LearningData {
  userInterests: string[];
  commonQuestions: Record<string, number>;
  userIndustry?: string;
  userGoals?: string[];
  conversationPatterns: string[];
  responseEffectiveness: Record<string, number>;
}

interface AILearningEngineProps {
  onLearningUpdate: (data: LearningData) => void;
  conversationHistory: any[];
}

const AILearningEngine: React.FC<AILearningEngineProps> = ({
  onLearningUpdate,
  conversationHistory,
}) => {
  const [learningData, setLearningData] = useState<LearningData>({
    userInterests: [],
    commonQuestions: {},
    conversationPatterns: [],
    responseEffectiveness: {},
  });

  useEffect(() => {
    // Analyze conversation history for learning
    const analyzeConversation = () => {
      const newData = { ...learningData };

      // Extract user interests from conversation
      const interests = extractInterests(conversationHistory);
      newData.userInterests = [
        ...new Set([...newData.userInterests, ...interests]),
      ];

      // Track common questions
      const questions = extractQuestions(conversationHistory);
      questions.forEach((question) => {
        newData.commonQuestions[question] =
          (newData.commonQuestions[question] || 0) + 1;
      });

      // Identify conversation patterns
      const patterns = extractPatterns(conversationHistory);
      newData.conversationPatterns = [
        ...new Set([...newData.conversationPatterns, ...patterns]),
      ];

      // Update learning data
      setLearningData(newData);
      onLearningUpdate(newData);
    };

    if (conversationHistory.length > 0) {
      analyzeConversation();
    }
  }, [conversationHistory]);

  const extractInterests = (history: any[]): string[] => {
    const interests: string[] = [];
    const keywords = {
      "web-development": [
        "website",
        "web development",
        "frontend",
        "backend",
        "react",
        "next.js",
      ],
      "ai-seo": ["seo", "ai seo", "search engine", "ranking", "chatgpt", "llm"],
      blockchain: ["blockchain", "crypto", "smart contract", "defi", "nft"],
      automation: [
        "automation",
        "workflow",
        "chatbot",
        "ai assistant",
        "process",
      ],
      "mobile-app": ["mobile app", "ios", "android", "react native", "flutter"],
      ecommerce: ["ecommerce", "online store", "shop", "retail", "selling"],
      healthcare: ["healthcare", "medical", "hospital", "clinic", "patient"],
      education: ["education", "school", "university", "learning", "edtech"],
      finance: ["finance", "banking", "fintech", "payment", "financial"],
    };

    history.forEach((message) => {
      if (message.sender === "user") {
        const text = message.text.toLowerCase();
        Object.entries(keywords).forEach(([interest, words]) => {
          if (words.some((word) => text.includes(word))) {
            interests.push(interest);
          }
        });
      }
    });

    return interests;
  };

  const extractQuestions = (history: any[]): string[] => {
    const questions: string[] = [];

    history.forEach((message) => {
      if (message.sender === "user" && message.text.includes("?")) {
        // Extract question patterns
        const questionPatterns = [
          /what is (.+)\?/i,
          /how (?:do|can|does) (.+)\?/i,
          /why (.+)\?/i,
          /when (.+)\?/i,
          /where (.+)\?/i,
          /which (.+)\?/i,
        ];

        questionPatterns.forEach((pattern) => {
          const match = message.text.match(pattern);
          if (match) {
            questions.push(match[1].trim());
          }
        });
      }
    });

    return questions;
  };

  const extractPatterns = (history: any[]): string[] => {
    const patterns: string[] = [];

    // Analyze conversation flow patterns
    for (let i = 0; i < history.length - 1; i++) {
      const current = history[i];
      const next = history[i + 1];

      if (current.sender === "user" && next.sender === "bot") {
        // User asked something, bot responded
        patterns.push("question-response");
      } else if (current.sender === "bot" && next.sender === "user") {
        // Bot provided info, user followed up
        patterns.push("info-followup");
      }
    }

    return patterns;
  };

  // Generate personalized responses based on learning data
  const generatePersonalizedResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check if user has shown interest in specific areas
    if (
      learningData.userInterests.includes("web-development") &&
      (lowerMessage.includes("website") || lowerMessage.includes("web"))
    ) {
      return `Based on your interest in web development, I'd recommend our AI-powered web development services. We use modern technologies like React, Next.js, and TypeScript to build high-performance websites that rank well on both Google and AI search engines.`;
    }

    if (
      learningData.userInterests.includes("ai-seo") &&
      (lowerMessage.includes("seo") || lowerMessage.includes("ranking"))
    ) {
      return `Since you're interested in AI SEO, let me share that our clients typically see 200-350% traffic growth within 6 months. We specialize in optimizing content for ChatGPT, Perplexity, and other AI platforms.`;
    }

    // Check for common questions and provide more detailed answers
    const commonQuestion = Object.keys(learningData.commonQuestions).find(
      (question) => lowerMessage.includes(question.toLowerCase())
    );

    if (commonQuestion) {
      return `I notice you've asked about ${commonQuestion} before. Let me provide a more detailed answer based on your previous interest...`;
    }

    return "";
  };

  return null; // This is a learning engine, no UI needed
};

export default AILearningEngine;
