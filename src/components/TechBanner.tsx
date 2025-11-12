import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TechBanner: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const techStack = [
    {
      name: "Webflow",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M17.5 3.5c-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v11.5c1.45 1.1 3.55 1.5 5.5 1.5s4.05-.4 5.5-1.5c1.45 1.1 3.55 1.5 5.5 1.5s4.05-.4 5.5-1.5V6c-1.45-1.1-3.55-1.5-5.5-1.5zM12 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-5.5 9c-1.45 0-2.5-1.05-2.5-2.5s1.05-2.5 2.5-2.5 2.5 1.05 2.5 2.5-1.05 2.5-2.5 2.5zm11 0c-1.45 0-2.5-1.05-2.5-2.5s1.05-2.5 2.5-2.5 2.5 1.05 2.5 2.5-1.05 2.5-2.5 2.5z"
              fill="#4353FF"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "WordPress",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.17 15.5c-1.3-.79-2.44-2.13-2.93-3.5L12 14l3.93 1c-.49 1.37-1.63 2.71-2.93 3.5zm6.17-2.5c-.55-.98-1.1-1.94-1.65-2.89L12 12l-3.35 2.11c-.55.95-1.1 1.91-1.65 2.89C4.5 15.5 2 13.9 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10c0 1.9-2.5 3.5-5.17 3z"
              fill="#21759B"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Figma",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M12 12c0-3.04 2.46-5.5 5.5-5.5S23 8.96 23 12s-2.46 5.5-5.5 5.5S12 15.04 12 12z"
              fill="#F24E1E"
            />
            <path
              d="M12 12c0-3.04-2.46-5.5-5.5-5.5S1 8.96 1 12s2.46 5.5 5.5 5.5S12 15.04 12 12z"
              fill="#A259FF"
            />
            <path
              d="M12 12c0-3.04 2.46-5.5 5.5-5.5S23 8.96 23 12s-2.46 5.5-5.5 5.5S12 15.04 12 12z"
              fill="#FF7262"
            />
            <path
              d="M12 12c0-3.04-2.46-5.5-5.5-5.5S1 8.96 1 12s2.46 5.5 5.5 5.5S12 15.04 12 12z"
              fill="#1ABCFE"
            />
            <path
              d="M12 12c0-3.04 0-5.5 0-5.5S12 8.96 12 12s0 5.5 0 5.5S12 15.04 12 12z"
              fill="#0ACF83"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Framer",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#0055FF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Shopify",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M15.337 23.979c-.35 0-.665-.133-.9-.4l-3.549-3.549c-.267-.235-.4-.55-.4-.9s.133-.665.4-.9l3.549-3.549c.235-.267.55-.4.9-.4s.665.133.9.4l3.549 3.549c.267.235.4.55.4.9s-.133.665-.4.9l-3.549 3.549c-.235.267-.55.4-.9.4z"
              fill="#96BF48"
            />
            <path
              d="M8.663 23.979c-.35 0-.665-.133-.9-.4L4.214 20.03c-.267-.235-.4-.55-.4-.9s.133-.665.4-.9L8.663 14.68c.235-.267.55-.4.9-.4s.665.133.9.4l3.549 3.549c.267.235.4.55.4.9s-.133.665-.4.9l-3.549 3.549c-.235.267-.55.4-.9.4z"
              fill="#95BF47"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "React",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
            <path
              d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
              stroke="#61DAFB"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
              stroke="#61DAFB"
              strokeWidth="1"
              fill="none"
              transform="rotate(60 12 12)"
            />
            <path
              d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
              stroke="#61DAFB"
              strokeWidth="1"
              fill="none"
              transform="rotate(120 12 12)"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Blockchain",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#F7931A"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "AI/ML",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="#8B5CF6"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Node.js",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
              fill="#68A063"
            />
            <path
              d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              fill="#68A063"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "TypeScript",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.646-.319 5.16 5.16 0 0 0-.717-.26 5.48 5.48 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.252 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 8.804 8.804 0 0 1-.807-.436 4.212 4.212 0 0 1-.667-.493 2.892 2.892 0 0 1-.45-.624 1.78 1.78 0 0 1-.16-.75c0-.61.156-1.074.469-1.393.312-.319.748-.594 1.306-.826.558-.232 1.2-.348 1.926-.348zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
              fill="#3178C6"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "MongoDB",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M17.193 9.555c-1.264-5.58-4.314-7.071-4.314-7.071s-.803-1.484-1.879-1.484c-1.076 0-1.879 1.484-1.879 1.484s-3.05 1.491-4.314 7.071c-1.264 5.58 1.879 7.071 1.879 7.071s.803 1.484 1.879 1.484c1.076 0 1.879-1.484 1.879-1.484s3.05-1.491 4.314-7.071z"
              fill="#47A248"
            />
            <path
              d="M12 2c-1.076 0-1.879 1.484-1.879 1.484s-3.05 1.491-4.314 7.071c-1.264 5.58 1.879 7.071 1.879 7.071s.803 1.484 1.879 1.484c1.076 0 1.879-1.484 1.879-1.484s3.05-1.491 4.314-7.071C17.193 9.555 14.05 8.064 14.05 8.064S13.247 6.58 12 6.58z"
              fill="#47A248"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "AWS",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M6.763 14.4c-.108-.108-.108-.216 0-.324l.972-.972c.108-.108.216-.108.324 0l.972.972c.108.108.108.216 0 .324l-.972.972c-.108.108-.216.108-.324 0l-.972-.972z"
              fill="#FF9900"
            />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
              fill="#FF9900"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Docker",
      logo: (
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path
              d="M13.983 10.078h2.119a.186.186 0 0 0 .186-.185V8.774a.186.186 0 0 0-.186-.185h-2.119a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM9.853 10.078h2.119a.186.186 0 0 0 .186-.185V8.774a.186.186 0 0 0-.186-.185H9.853a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM5.723 10.078h2.119a.186.186 0 0 0 .186-.185V8.774a.186.186 0 0 0-.186-.185H5.723a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM9.853 6.948h2.119a.186.186 0 0 0 .186-.185V5.644a.186.186 0 0 0-.186-.185H9.853a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM5.723 6.948h2.119a.186.186 0 0 0 .186-.185V5.644a.186.186 0 0 0-.186-.185H5.723a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM1.593 6.948h2.119a.186.186 0 0 0 .186-.185V5.644a.186.186 0 0 0-.186-.185H1.593a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM9.853 3.818h2.119a.186.186 0 0 0 .186-.185V2.514a.186.186 0 0 0-.186-.185H9.853a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM5.723 3.818h2.119a.186.186 0 0 0 .186-.185V2.514a.186.186 0 0 0-.186-.185H5.723a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185zM1.593 3.818h2.119a.186.186 0 0 0 .186-.185V2.514a.186.186 0 0 0-.186-.185H1.593a.186.186 0 0 0-.186.185v1.119c0 .102.084.185.186.185z"
              fill="#2496ED"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "SEO",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="white"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "CRM",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7">
            <path
              d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.54.37-2.01.99L12 12l-2.99-4.01A2.5 2.5 0 0 0 7 7H5.46a1.5 1.5 0 0 0-1.42 1.37L1.5 16H4v6h2v-6h2.5l2.5 6h2l-2.5-6H14v6h2z"
              fill="white"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "HRM",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="white"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Next.js",
      logo: (
        <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
      ),
    },
    {
      name: "Vue.js",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">V</span>
        </div>
      ),
    },
    {
      name: "Angular",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "Python",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },

    {
      name: "GraphQL",
      logo: (
        <div className="w-12 h-12 bg-pink-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
    },
    {
      name: "Redis",
      logo: (
        <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">R</span>
        </div>
      ),
    },
    {
      name: "PostgreSQL",
      logo: (
        <div className="w-12 h-12 bg-blue-700 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },
    {
      name: "MySQL",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
    },
    {
      name: "Firebase",
      logo: (
        <div className="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
      ),
    },
    {
      name: "Stripe",
      logo: (
        <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "PayPal",
      logo: (
        <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },
    {
      name: "Web3",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">3</span>
        </div>
      ),
    },
    {
      name: "Ethereum",
      logo: (
        <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">Ξ</span>
        </div>
      ),
    },
    {
      name: "Solidity",
      logo: (
        <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "TensorFlow",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
      ),
    },
    {
      name: "PyTorch",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },
    {
      name: "OpenAI",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">AI</span>
        </div>
      ),
    },
    {
      name: "Hugging Face",
      logo: (
        <div className="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
      ),
    },
    {
      name: "Kubernetes",
      logo: (
        <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">K</span>
        </div>
      ),
    },
    {
      name: "Jenkins",
      logo: (
        <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">J</span>
        </div>
      ),
    },
    {
      name: "GitHub",
      logo: (
        <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
    },
    {
      name: "GitLab",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
    },
    {
      name: "Jira",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">J</span>
        </div>
      ),
    },
    {
      name: "Slack",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "Zoom",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">Z</span>
        </div>
      ),
    },
    {
      name: "Notion",
      logo: (
        <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
      ),
    },
    {
      name: "Airtable",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "Zapier",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">Z</span>
        </div>
      ),
    },
    {
      name: "HubSpot",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
      ),
    },
    {
      name: "Salesforce",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },

    {
      name: "Asana",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "Trello",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
      ),
    },
    {
      name: "ClickUp",
      logo: (
        <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "BambooHR",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
      ),
    },
    {
      name: "Workday",
      logo: (
        <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">W</span>
        </div>
      ),
    },
    {
      name: "ADP",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "SAP",
      logo: (
        <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "Oracle",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">O</span>
        </div>
      ),
    },
    {
      name: "Microsoft",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
    },
    {
      name: "Google Cloud",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
    },
    {
      name: "Azure",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "Vercel",
      logo: (
        <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">V</span>
        </div>
      ),
    },
    {
      name: "Netlify",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
      ),
    },
    {
      name: "Cloudflare",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "CDN",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "SSL",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "API",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "REST",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">R</span>
        </div>
      ),
    },
    {
      name: "Microservices",
      logo: (
        <div className="w-12 h-12 bg-indigo-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
    },
    {
      name: "Serverless",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "Lambda",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">λ</span>
        </div>
      ),
    },
    {
      name: "Edge Computing",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">E</span>
        </div>
      ),
    },
    {
      name: "IoT",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">I</span>
        </div>
      ),
    },
    {
      name: "AR/VR",
      logo: (
        <div className="w-12 h-12 bg-pink-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">AR</span>
        </div>
      ),
    },
    {
      name: "Machine Learning",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">ML</span>
        </div>
      ),
    },
    {
      name: "Deep Learning",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">DL</span>
        </div>
      ),
    },
    {
      name: "NLP",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">N</span>
        </div>
      ),
    },
    {
      name: "Computer Vision",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">CV</span>
        </div>
      ),
    },
    {
      name: "Data Science",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">DS</span>
        </div>
      ),
    },
    {
      name: "Analytics",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      ),
    },
    {
      name: "Big Data",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
      ),
    },
    {
      name: "Elasticsearch",
      logo: (
        <div className="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">E</span>
        </div>
      ),
    },
    {
      name: "Kibana",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">K</span>
        </div>
      ),
    },
    {
      name: "Logstash",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
      ),
    },
    {
      name: "Prometheus",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },
    {
      name: "Grafana",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
    },
    {
      name: "Monitoring",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
    },
    {
      name: "Security",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "DevOps",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
      ),
    },
    {
      name: "CI/CD",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "Testing",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
      ),
    },
    {
      name: "QA",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">Q</span>
        </div>
      ),
    },
    {
      name: "Performance",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },
    {
      name: "Optimization",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">O</span>
        </div>
      ),
    },
    {
      name: "Scalability",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "Load Balancing",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
      ),
    },
    {
      name: "Caching",
      logo: (
        <div className="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "CDN",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "Backup",
      logo: (
        <div className="w-12 h-12 bg-gray-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
      ),
    },
    {
      name: "Disaster Recovery",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
      ),
    },
    {
      name: "Compliance",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "GDPR",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
      ),
    },
    {
      name: "HIPAA",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
      ),
    },
    {
      name: "SOC2",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "ISO 27001",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">I</span>
        </div>
      ),
    },
    {
      name: "Penetration Testing",
      logo: (
        <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      ),
    },
    {
      name: "Vulnerability Assessment",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">V</span>
        </div>
      ),
    },
    {
      name: "Code Review",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "Documentation",
      logo: (
        <div className="w-12 h-12 bg-gray-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
      ),
    },
    {
      name: "Training",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
      ),
    },
    {
      name: "Support",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "Maintenance",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
    },
    {
      name: "Updates",
      logo: (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">U</span>
        </div>
      ),
    },
    {
      name: "Migration",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      ),
    },
    {
      name: "Integration",
      logo: (
        <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">I</span>
        </div>
      ),
    },
    {
      name: "Customization",
      logo: (
        <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "Consulting",
      logo: (
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      ),
    },
    {
      name: "Strategy",
      logo: (
        <div className="w-12 h-12 bg-indigo-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      ),
    },
    {
      name: "Innovation",
      logo: (
        <div className="w-12 h-12 bg-pink-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">I</span>
        </div>
      ),
    },
    {
      name: "Future-Proof",
      logo: (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Horizontal Banner Frame - Larger Size */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main Banner Container - Bigger */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 shadow-lg">
            {/* Sliding Banner */}
            <div className="overflow-hidden">
              <motion.div
                className="flex items-center space-x-12"
                animate={{
                  x: [0, -120 * techStack.length],
                }}
                transition={{
                  duration: 600,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Duplicate the array for seamless loop */}
                {[...techStack, ...techStack].map((tech, index) => (
                  <motion.div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0 flex items-center space-x-4 bg-white border-2 border-gray-200 rounded-2xl px-8 py-6 min-w-[200px] hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Logo - Bigger */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 flex items-center justify-center">
                        {tech.logo}
                      </div>
                    </div>

                    {/* Name - Bigger */}
                    <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechBanner;
