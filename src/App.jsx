import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// ==========================================
// 1. IMAGE HANDLING
// ==========================================
const imageModules = import.meta.glob('./assets/images/*.{png,jpg,jpeg,svg}', { eager: true });
const allPhotos = Object.values(imageModules).map((module) => module.default);
const placeholder = "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif";
const photoList = allPhotos.length > 0 ? allPhotos : [placeholder];

// Try to find specific images
const abhinavPic = allPhotos.find(src => src.includes('avatar')) || photoList[0];
const devPic = allPhotos.find(src => src.includes('dev')) || placeholder; 

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- DARK MODE THEME ---
  const theme = {
    bg: isDarkMode ? "bg-[#1a1a1a]" : "bg-[#f0f0f0]",
    navBg: isDarkMode ? "bg-[#252525]/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md",
    cardBg: isDarkMode ? "bg-[#252525]" : "bg-white",
    text: isDarkMode ? "text-gray-300" : "text-black",
    highlight: isDarkMode ? "text-gray-100" : "text-blue-600",
    border: isDarkMode ? "border-gray-600" : "border-black",
    shadow: isDarkMode ? "shadow-none" : "hard-shadow", 
    heroSection: isDarkMode ? "bg-[#1a1a1a]" : "bg-yellow-300",
    vaultSection: isDarkMode ? "bg-[#202020]" : "bg-pink-400",
    noteSection: isDarkMode ? "bg-[#1a1a1a]" : "bg-blue-500",
    accent: isDarkMode ? "bg-gray-600 text-white" : "bg-blue-500 text-white",
    button: isDarkMode ? "bg-gray-100 text-black" : "bg-black text-white",
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const navTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0,0);
  };

  return (
    <div className={`${theme.bg} ${theme.text} font-sans min-h-screen transition-colors duration-500`}>
      
      {/* === NAVBAR === */}
      <nav className={`fixed top-0 w-full z-50 ${theme.navBg} border-b-4 ${theme.border} px-6 py-4 flex justify-between items-center transition-colors duration-500`}>
        <div className="font-black text-xl tracking-tighter cursor-pointer" onClick={() => navTo('home')}>
          HBD.v2
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 font-bold font-mono">
          <button onClick={() => navTo('home')} className="hover:opacity-50 transition">HOME</button>
          <button onClick={() => navTo('boy')} className="hover:opacity-50 transition">THE SUS</button>
          <button onClick={() => navTo('dev')} className="hover:opacity-50 transition">GIGU</button>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center">
          <button onClick={toggleTheme} className="text-xl hover:scale-110 transition">
            {isDarkMode ? "🌙" : "☀️"}
          </button>
          <button className="md:hidden font-black text-xl border-2 px-2 py-1 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className={`fixed top-16 left-0 w-full ${theme.navBg} border-b-4 ${theme.border} z-40 p-6 flex flex-col gap-4 font-mono font-bold md:hidden`}>
          <button onClick={() => navTo('home')} className="text-left py-2 border-b border-gray-500">HOME</button>
          <button onClick={() => navTo('boy')} className="text-left py-2 border-b border-gray-500">THE SUS</button>
          <button onClick={() => navTo('dev')} className="text-left py-2 border-b border-gray-500">GIGU</button>
        </div>
      )}

      {/* === PAGE CONTENT === */}
      <div className="w-full">
        {currentPage === 'home' && <HomePage theme={theme} photoList={photoList} />}
        {currentPage === 'boy' && <BirthdayBoyPage theme={theme} pic={abhinavPic} />}
        {currentPage === 'dev' && <DeveloperPage theme={theme} pic={devPic} />}
      </div>

      <footer className={`${isDarkMode ? "bg-[#111]" : "bg-black"} text-white py-12 text-center font-mono border-t-8 border-gray-700`}>
        <p className="text-sm opacity-50">NAVIGATE USING THE MENU TOP RIGHT</p>
        <p className="text-xl mt-2 animate-pulse">CODED WITH 💀 BY GEETESH</p>
      </footer>

    </div>
  );
}

// ====================================================================
// PAGE 1: HOME PAGE
// ====================================================================
const HomePage = ({ theme, photoList }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photoList[0]);
  const [currentCaption, setCurrentCaption] = useState("THE ARCHIVES");
  const [timeKnown, setTimeKnown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const blastConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const generateMemory = () => {
    const randomIndex = Math.floor(Math.random() * photoList.length);
    setCurrentPhoto(photoList[randomIndex]);
    const captions = [
      "Bro thinks he is the main character 💀", "Rare footage of you actually working", 
      "This is why we are single", "Looking like a failed test case ❌", "Moments before disaster", 
      "Sleep deprivation: 100%", "POV: You just saw the question paper", "Who allowed this??",
      "Engineering was a mistake", "Deleting this in 24 hours ⏳"
    ];
    setCurrentCaption(captions[Math.floor(Math.random() * captions.length)]);
  };

  useEffect(() => {
    const startDate = new Date("2023-08-01"); 
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;
      setTimeKnown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={`min-h-screen pt-20 flex flex-col items-center justify-center relative border-b-8 ${theme.border} ${theme.heroSection} transition-colors duration-500`}>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          
          <div className={`${theme.cardBg} ${theme.border} border-4 px-6 py-2 inline-block mb-6 ${theme.shadow} -rotate-2`}>
            <span className="font-black tracking-widest text-xl">⚠️ LEVEL 21 UNLOCKED</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black leading-[0.9] mb-8 glitch-text" data-text="HBD ABHINAV">
            HBD<br/>ABHINAV
          </h1>

          <div className={`${theme.cardBg} ${theme.border} border-4 p-6 ${theme.shadow} rotate-1 max-w-xl w-[90%] mb-10`}>
            <p className={`font-black text-center mb-4 border-b-4 ${theme.border} pb-2`}>TIME TOLERATED:</p>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <TimeBox val={timeKnown.days} label="DAYS" theme={theme} />
              <TimeBox val={timeKnown.hours} label="HRS" theme={theme} />
              <TimeBox val={timeKnown.minutes} label="MIN" theme={theme} />
              <TimeBox val={timeKnown.seconds} label="SEC" theme={theme} />
            </div>
          </div>

          <button 
            onClick={blastConfetti}
            className={`${theme.button} ${theme.border} border-4 px-12 py-5 text-2xl font-black ${theme.shadow} hover:scale-105 transition-all active:scale-95 animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.5)]`}
          >
            🚀 LAUNCH PARTY
          </button>
        </div>
      </section>

      {/* 2. VAULT SECTION */}
      <section className={`py-24 ${theme.vaultSection} border-b-8 ${theme.border} transition-colors duration-500`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12">
          
          <div className={`${theme.cardBg} p-4 border-8 ${theme.border} ${theme.shadow} rotate-[-3deg] max-w-md w-full relative z-10`}>
            <div className={`h-80 md:h-96 bg-black overflow-hidden border-4 ${theme.border}`}>
              <img src={currentPhoto} className="w-full h-full object-cover" />
            </div>
            <h2 className={`text-xl font-black text-center mt-4 uppercase italic border-2 ${theme.border} -rotate-1 px-2 py-1 ${theme.cardBg}`}>
              {currentCaption}
            </h2>
          </div>

          <div className={`${theme.cardBg} border-4 ${theme.border} p-6 ${theme.shadow} max-w-xs w-full`}>
            <p className="font-mono font-bold mb-4">
              > TARGET: ABHINAV<br/>
              > PHOTOS: {photoList.length} FOUND
            </p>
            <button onClick={generateMemory} className={`w-full ${theme.accent} border-4 ${theme.border} py-3 font-black text-xl hover:translate-x-1 hover:translate-y-1 transition-all`}>
              🔄 SHUFFLE
            </button>
          </div>
        </div>
      </section>

      {/* 3. OPEN LETTER (HINGLISH) */}
      <section className={`py-24 ${theme.noteSection} flex justify-center px-4 transition-colors duration-500`}>
        <div className={`${theme.cardBg} border-8 ${theme.border} p-8 md:p-16 max-w-3xl relative ${theme.shadow} rotate-1`}>
          
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-24 ${theme.navBg} border-4 ${theme.border} rounded-full z-10`}></div>
          
          <h2 className={`text-4xl md:text-5xl font-black mb-8 border-b-8 ${theme.border} inline-block`}>OPEN LETTER</h2>
          
          <div className="font-mono text-base md:text-lg space-y-6 font-bold leading-relaxed whitespace-pre-line">
            <p>
              TO: <span className={`${theme.accent} px-2 border-2 ${theme.border} inline-block`}>ABHINAV</span>
            </p>
            
            <p className="opacity-90">
              Happy Birthday, Homie! 
              <br/><br/>
              Honestly, ye photos dekh ke aur ye code likhte time realize hua ki 1st year se ab tak kitni crazy memories stack ho gayi hain.
              <br/><br/>
              Pata h aajkal vibe thodi off h. Me bahut overthink kr rha hu aur vo purane din miss krta hu jab kuch bhi bol deta tha bina soche.
              <br/><br/>
              Ab realize hota h me kitna stupid tha 1st year me... yaad h vo movie wala scene jab tera syllabus bacha tha? My bad yrr. I genuinely regret those moments jaha mene mess up kiya.
              <br/><br/>
              I don't want ki hum door ho jaye. Ye website bas ye batane ka tareeka h ki tu important h mere liye. 
              <br/><br/>
              <strong>Puri Sem break baith ke Web Dev seekhi h bas ye banane ke liye.</strong> (Haan, utni mehnat ki h tere liye, so appreciate it).
              <br/><br/>
              Let's reset the vibe this year. No more drama, only good times and placements.
            </p>
          </div>

          <div className="mt-12 flex justify-end">
            <div className="relative">
              <p className={`font-black border-t-4 ${theme.border} pt-2 w-48 text-center mt-4 uppercase tracking-widest`}>
                SIGNED, GEETESH
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ====================================================================
// PAGE 2: BIRTHDAY BOY (THE SUSPECT)
// ====================================================================
const BirthdayBoyPage = ({ theme, pic }) => (
  <section className={`min-h-screen pt-20 ${theme.bg} p-6 flex items-center justify-center transition-colors duration-500`}>
    <div className={`${theme.cardBg} border-4 ${theme.border} p-8 max-w-4xl w-full relative ${theme.shadow}`}>
      <h2 className={`text-4xl md:text-6xl font-black mb-8 border-b-4 ${theme.border} inline-block`}>THE SUSPECT</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
           <img src={pic} className={`w-full h-auto border-4 ${theme.border} grayscale hover:grayscale-0 transition duration-500`} />
           <p className="font-mono mt-2 text-xs opacity-50">ID: #001-LENDI</p>
        </div>
        
        <div className="w-full md:w-2/3 font-mono space-y-4 text-lg">
          <div className={`flex justify-between border-b ${theme.border} py-2`}>
            <span>NAME:</span> <span className="font-bold">Abhinav</span>
          </div>
          <div className={`flex justify-between border-b ${theme.border} py-2`}>
            <span>ALIAS:</span> <span className="font-bold">Cutie, Hawasi</span>
          </div>
          
          <div className="mt-6">
            <p className={`font-black ${theme.highlight} mb-2`}>SPECIAL SKILLS:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base opacity-90">
                <li>Rage Baiting (Expert Level)</li>
                <li>Blocking the Developer 🚫</li>
                <li>Being a Morning Person (Psychopath behavior)</li>
                <li>Tennis Player Baddiee 🎾</li>
            </ul>
          </div>

          <div className={`mt-6 p-4 border-2 border-dashed ${theme.border} bg-opacity-20`}>
             <p className="uppercase font-bold mb-2">KNOWN EXPERIENCES:</p>
             <ul className="text-sm leading-relaxed space-y-2">
               <li>1. Blackmailing (Professional)</li>
               <li>2. Ghosting (Seen but no reply)</li>
               <li>3. Sometimes Helping (Rare event)</li>
               <li>4. Disciplined (Surprisingly)</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ====================================================================
// PAGE 3: THE DEVELOPER (GIGU)
// ====================================================================
const DeveloperPage = ({ theme, pic }) => (
  <section className={`min-h-screen pt-20 ${theme.bg} p-6 flex items-center justify-center`}>
    <div className={`${theme.cardBg} border-4 ${theme.border} p-8 max-w-3xl w-full relative ${theme.shadow}`}>
      
      <div className="absolute -top-6 -right-6 text-6xl animate-pulse">👨‍💻</div>
      
      <h2 className="text-5xl md:text-7xl font-black mb-2">GIGU</h2>
      <p className="font-mono opacity-60 mb-8">"Padhai-likhai toh hoti rahegi, Bakchodi rukni nahi chahiye."</p>

      <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
         <div className={`w-48 h-48 rounded-full border-4 ${theme.border} overflow-hidden`}>
            <img src={pic} className="w-full h-full object-cover" />
         </div>

         <div className="flex-1 space-y-4">
            <p className="text-xl font-bold leading-relaxed">
              Hey, I'm <span className={`${theme.highlight} px-1`}>Geetesh</span>.
            </p>
            
            <div className={`p-4 border-l-4 ${theme.border} bg-opacity-10 bg-gray-500`}>
               <p className="italic text-lg font-bold">"Full Stack Developer (Sirf Bio me likhne ke liye)."</p>
            </div>

            <p className="opacity-90 leading-relaxed font-medium">
              Bhai sach batau puri <strong>Sem Break</strong> barbaad kr di mene webd seekhne me. 
              Log skills pr dhyaan de rahe the, aur me yaha baith ke tere liye ye website bana rha tha.
              <br/><br/>
              Bas ye maan le, jitni mehnat isme lagi h na, utni agar codeforces pr ki hoti toh 1300+ rating hoti 🤧.
              Ab chup chaap achi si party de dena.
            </p>
            
            <div className="mt-6 space-y-3 font-mono text-sm border-t border-gray-500 pt-4">
               <div className="flex justify-between">
                 <span>📉 ROI:</span>
                 <span className="font-bold">Tera Reaction ❤️</span>
               </div>
               <div className="flex justify-between">
                 <span>⏳ Time Spent:</span>
                 <span className="font-bold">Puri Chuttiyan (Literally)</span>
               </div>
               <div className="flex justify-between">
                 <span>🍔 Treat:</span>
                 <span className="font-bold">DB Mall chalna padega ab.</span>
               </div>
            </div>
         </div>
      </div>

      <div className={`mt-8 pt-6 border-t-4 ${theme.border} text-center`}>
        <p className="font-mono text-xs uppercase tracking-widest opacity-50">
          © 2026 GEETESH PRODUCTIONS. 
        </p>
      </div>
    </div>
  </section>
);

// Helper for Timer
const TimeBox = ({ val, label, theme }) => (
  <div className={`border-2 ${theme.border} p-2 ${theme.cardBg} flex flex-col justify-center`}>
    <span className={`text-2xl md:text-4xl font-black leading-none ${theme.highlight}`}>{String(val).padStart(2, '0')}</span>
    <span className="text-xs font-bold opacity-60">{label}</span>
  </div>
);

export default App;