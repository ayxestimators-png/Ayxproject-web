import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-blue-950 overflow-hidden">
            <div className="blueprint-bg absolute inset-0"></div>
            <div className="absolute top-4 left-4 z-20 bg-blue-900 bg-opacity-80 px-3 py-2 rounded-lg border border-blue-600">
                <p className="text-xs text-gray-300">
                    <strong>© 2026 AyXTool</strong>
                </p>
                <p className="text-xs text-gray-400">
                    AyX Estimator Stack – Joshua Mares
                </p>
            </div>
            <div className="relative z-10 text-center max-w-2xl px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    AyXTool – Home repair estimating made simple
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                    Take a photo of any problem in your home. AyXTool shows you what it will cost, DIY vs Pro.
                </p>
                <a href="/app" className="inline-block bg-white text-blue-900 px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-shadow">
                    Open AyXTool Web App
                </a>
            </div>
        </div>
    );
}