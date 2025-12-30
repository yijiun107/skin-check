"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Q1. 最近照鏡子或拍照時，覺得臉部線條如何？",
    options: [
      { text: "覺得臉部浮腫，輪廓線不見了", type: "A" },
      { text: "眼神看起來很累，有黑眼圈/眼袋", type: "B" },
      { text: "氣色暗沉，感覺臉部肌肉很僵硬", type: "C" },
      { text: "以上皆是，整個人看起來很顯老", type: "D" },
    ],
  },
  {
    id: 2,
    question: "Q2. 每天使用手機、電腦的時間大概多長？",
    options: [
      { text: "使用時間還好，比較在意臉部保養", type: "A" },
      { text: "幾乎整天盯著螢幕，眼睛超痠澀", type: "B" },
      { text: "看螢幕時姿勢不良，容易聳肩", type: "C" },
      { text: "重度使用者，眼壓高頭也跟著痛", type: "D" },
    ],
  },
  {
    id: 3,
    question: "Q3. 按壓一下您的肩膀和頸部，感覺如何？",
    options: [
      { text: "軟軟的還好，沒有特別痠痛", type: "B" }, 
      { text: "只有一點點緊，還能接受", type: "A" },
      { text: "非常頂叩叩！像兩塊石頭一樣", type: "C" },
      { text: "痠痛感已經延伸到後腦勺或太陽穴", type: "D" },
    ],
  },
  {
    id: 4,
    question: "Q4. 最近的睡眠品質如何？",
    options: [
      { text: "睡得很好，一覺到天亮", type: "A" },
      { text: "睡前容易想太多，眼腦無法放鬆", type: "B" },
      { text: "翻來覆去，覺得肩膀位置怎麼擺都不對", type: "C" },
      { text: "淺眠多夢，睡醒還是覺得很累", type: "D" },
    ],
  },
  {
    id: 5,
    question: "Q5. 這次來做撥筋，您最希望達到的效果是？",
    options: [
      { text: "快速消水腫，恢復V型小臉", type: "A" },
      { text: "改善眼周循環，想要眼睛亮晶晶", type: "B" },
      { text: "放鬆緊繃的斜方肌，改善體態", type: "C" },
      { text: "不管了！我需要一次徹底的深層大修復", type: "D" },
    ],
  },
];

type ResultType = {
  title: string;
  tagline: string;
  desc: string;
  course: string;
  price: string;
};

const results: Record<"A" | "B" | "C" | "D", ResultType> = {
  A: {
    title: "V顏緊緻・小顏術",
    tagline: "適合：臉部浮腫 / 輪廓線模糊 / 想快速變美",
    desc: "針對臉部經絡進行深層疏通，快速排出多餘水分，恢復肌膚彈性與立體輪廓。",
    course: "✨ 推薦：經典V臉經絡撥筋 (純臉部)",
    price: "體驗價 $888 (原價 $1500)",
  },
  B: {
    title: "晶亮明眸・亮眼術",
    tagline: "適合：3C重度使用者 / 黑眼圈 / 眼壓過高",
    desc: "除了全臉撥筋，特別加強眼周穴位釋壓，改善眼周循環，讓雙眼瞬間明亮有神。",
    course: "👀 推薦：睛亮有神V顏撥筋 (臉+眼部)",
    price: "體驗價 $1,080 (原價 $1800)",
  },
  C: {
    title: "舒壓解勞・美頸術",
    tagline: "適合：肩頸僵硬 / 厚背 / 壓力大",
    desc: "疏通臉部氣結，並向下延伸至肩頸淋巴，釋放累積已久的斜方肌壓力，改善頭部供氧。",
    course: "💆‍♀️ 推薦：舒壓好眠輕齡撥筋 (臉+肩頸)",
    price: "體驗價 $1,280 (原價 $2200)",
  },
  D: {
    title: "極致煥顏・全效術",
    tagline: "適合：極度疲勞 / 淺眠頭痛 / 追求極致享受",
    desc: "小孩才做選擇！從眼周釋壓、全臉提拉到肩頸深層鬆筋，給您最完整的頂級修復時光。",
    course: "👑 推薦：頂級全效煥顏撥筋 (臉+眼+肩頸)",
    price: "體驗價 $1,680 (原價 $3000)",
  },
};

export default function BeautyConsultApp() {
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [finalType, setFinalType] = useState<"A" | "B" | "C" | "D">("A");

  const handleAnswer = (type: string) => {
    const safeType = type as "A" | "B" | "C" | "D";
    const newScores = { ...scores, [safeType]: scores[safeType] + 1 };
    setScores(newScores);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      const winner = Object.keys(newScores).reduce((a, b) => 
        newScores[a as "A"|"B"|"C"|"D"] > newScores[b as "A"|"B"|"C"|"D"] ? a : b
      ) as "A" | "B" | "C" | "D";
      setFinalType(winner);
      setStep(99); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4 font-sans text-stone-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 min-h-[600px] flex flex-col">
        {step > 0 && step <= questions.length && (
          <div className="h-1.5 bg-stone-100 w-full">
            <motion.div 
              className="h-full bg-stone-800"
              initial={{ width: 0 }}
              animate={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
                  <Star size={36} fill="currentColor" className="text-amber-200" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-wider text-stone-900">專屬撥筋調理診斷</h1>
                  <p className="text-stone-500 mt-3 leading-relaxed text-sm">
                    臉部氣結、眼壓過高還是肩頸僵硬？<br/>
                    回答 5 個問題，找出最適合您的療程。
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium hover:bg-stone-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-stone-200"
                >
                  開始檢測 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
              </motion.div>
            )}

            {step > 0 && step <= questions.length && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="inline-block text-xs font-bold text-stone-400 tracking-widest uppercase bg-stone-100 px-3 py-1 rounded-full mb-4">
                    QUESTION {step} / {questions.length}
                  </span>
                  <h2 className="text-xl font-bold text-stone-800 leading-snug">
                    {questions[step - 1].question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {questions[step - 1].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full text-left p-4 rounded-xl border-2 border-stone-100 hover:border-stone-900 hover:bg-stone-50 transition-all text-stone-600 hover:text-stone-900 font-medium active:scale-[0.98] text-sm sm:text-base"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 99 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-5"
              >
                <div className="text-xs font-bold text-stone-400 tracking-widest uppercase">DIAGNOSIS RESULT</div>
                <div className="p-6 rounded-2xl bg-[#D3BBA8] text-stone-900 shadow-inner">
                  <div className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-bold mb-3 tracking-wide">
                    您的命定療程
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{results[finalType].title}</h2>
                  <p className="text-sm font-medium opacity-80 mb-4 border-b border-black/10 pb-4">
                    {results[finalType].tagline}
                  </p>
                  <p className="text-sm leading-relaxed opacity-90 mb-6 text-left font-medium">
                    {results[finalType].desc}
                  </p>
                  <div className="bg-white/90 p-4 rounded-xl shadow-sm">
                    <p className="font-bold text-stone-900 text-lg">{results[finalType].course}</p>
                    <p className="text-sm text-stone-600 mt-1 font-mono font-bold">
                      {results[finalType].price}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => window.open("https://lin.ee/iikRX71", "_blank")}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-2"
                  >
                    立即預約體驗 <Sparkles size={18} />
                  </button>
                  <button 
                    onClick={() => { setStep(0); setScores({A:0, B:0, C:0, D:0}); }}
                    className="text-stone-400 text-sm hover:text-stone-600 py-2"
                  >
                    重新檢測
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}