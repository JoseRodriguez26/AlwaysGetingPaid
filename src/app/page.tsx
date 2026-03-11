// Agent data for character cards
const agents = [
  {
    id: "aria7",
    name: "ARIA-7",
    type: "Fan DM Agent",
    bio: "Replies to fans 24/7 in your voice",
    color: "#ff3388",
    stats: ["24/7 Active", "~2s Reply", "GPT-4 Voice"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_aria" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#3d0020" />
            <stop offset="100%" stopColor="#0a0008" />
          </radialGradient>
          <radialGradient id="glow_aria" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#ff3388" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff3388" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_aria" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde8d8" />
            <stop offset="100%" stopColor="#f5c4a8" />
          </linearGradient>
          <linearGradient id="hair_aria" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff3388" />
            <stop offset="100%" stopColor="#aa1155" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_aria)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_aria)" />
        {/* Hair back */}
        <ellipse cx="60" cy="68" rx="34" ry="38" fill="url(#hair_aria)" />
        {/* Long side hair strands */}
        <path d="M28 72 Q20 110 26 140" stroke="#ff3388" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M92 72 Q100 110 94 140" stroke="#ff3388" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* Top spiky hair */}
        <path d="M38 52 Q45 28 52 45 Q55 22 60 42 Q65 20 68 45 Q75 26 82 50" fill="url(#hair_aria)" stroke="#ff6699" strokeWidth="1" />
        {/* Face */}
        <ellipse cx="60" cy="82" rx="26" ry="30" fill="url(#skin_aria)" />
        {/* Eyes */}
        <ellipse cx="48" cy="78" rx="8" ry="9" fill="#1a0012" />
        <ellipse cx="72" cy="78" rx="8" ry="9" fill="#1a0012" />
        <ellipse cx="48" cy="78" rx="6" ry="7" fill="#ff3388" opacity="0.9" />
        <ellipse cx="72" cy="78" rx="6" ry="7" fill="#ff3388" opacity="0.9" />
        <circle cx="48" cy="77" r="3" fill="#220011" />
        <circle cx="72" cy="77" r="3" fill="#220011" />
        <circle cx="50" cy="75" r="1.5" fill="white" opacity="0.9" />
        <circle cx="74" cy="75" r="1.5" fill="white" opacity="0.9" />
        {/* Eyelashes */}
        <path d="M41 72 Q44 68 48 70" stroke="#ff3388" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M65 72 Q68 68 72 70" stroke="#ff3388" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Eyebrows */}
        <path d="M40 70 Q48 64 56 68" stroke="#cc1166" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M64 68 Q72 64 80 70" stroke="#cc1166" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M57 86 Q60 90 63 86" stroke="#e0a898" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Mouth */}
        <path d="M52 96 Q60 102 68 96" stroke="#ff6699" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="42" cy="88" rx="7" ry="4" fill="#ff3388" opacity="0.2" />
        <ellipse cx="78" cy="88" rx="7" ry="4" fill="#ff3388" opacity="0.2" />
        {/* Neck */}
        <rect x="53" y="110" width="14" height="16" rx="4" fill="url(#skin_aria)" />
        {/* Shoulders/outfit */}
        <path d="M26 140 Q40 120 60 118 Q80 120 94 140 L120 160 L0 160 Z" fill="#220033" />
        <path d="M45 120 Q60 128 75 120" stroke="#ff3388" strokeWidth="2" fill="none" />
        {/* Holographic earrings */}
        <circle cx="34" cy="84" r="4" fill="none" stroke="#ff3388" strokeWidth="1.5" />
        <circle cx="86" cy="84" r="4" fill="none" stroke="#ff3388" strokeWidth="1.5" />
        <circle cx="34" cy="84" r="2" fill="#ff3388" opacity="0.6" />
        <circle cx="86" cy="84" r="2" fill="#ff3388" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "shieldx",
    name: "SHIELD-X",
    type: "Content Guard",
    bio: "Blocks leaks, deepfakes & policy violations",
    color: "#00ffcc",
    stats: ["Real-time Scan", "99.9% Accuracy", "DMCA Auto"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_shield" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#001a14" />
            <stop offset="100%" stopColor="#030d0a" />
          </radialGradient>
          <radialGradient id="glow_shield" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_shield" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8d5c0" />
            <stop offset="100%" stopColor="#d4b898" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_shield)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_shield)" />
        {/* Short angular cyber hair */}
        <path d="M30 60 L32 40 L45 30 L60 26 L75 30 L88 40 L90 60 L85 58 L80 38 L60 32 L40 38 L35 58 Z" fill="#00ffcc" opacity="0.9" />
        <path d="M30 60 L28 55 L32 35 L35 58 Z" fill="#009977" />
        <path d="M90 60 L92 55 L88 35 L85 58 Z" fill="#009977" />
        {/* Undercut shading */}
        <path d="M30 62 Q32 75 34 78 L34 65 Z" fill="#00ccaa" opacity="0.5" />
        <path d="M90 62 Q88 75 86 78 L86 65 Z" fill="#00ccaa" opacity="0.5" />
        {/* Face */}
        <ellipse cx="60" cy="80" rx="26" ry="28" fill="url(#skin_shield)" />
        {/* Cybernetic eye implant - left */}
        <ellipse cx="47" cy="76" rx="9" ry="8" fill="#001a14" />
        <ellipse cx="47" cy="76" rx="7" ry="6" fill="#00ffcc" opacity="0.15" />
        <circle cx="47" cy="76" r="4" fill="#00ffcc" opacity="0.9" />
        <circle cx="47" cy="76" r="2" fill="white" />
        <path d="M38 76 L42 76" stroke="#00ffcc" strokeWidth="1" />
        <path d="M52 76 L56 76" stroke="#00ffcc" strokeWidth="1" />
        {/* Right normal eye */}
        <ellipse cx="73" cy="76" rx="9" ry="8" fill="#1a1a2e" />
        <ellipse cx="73" cy="76" rx="7" ry="6" fill="#004d3d" />
        <circle cx="73" cy="76" r="4" fill="#001a14" />
        <circle cx="73" cy="76" r="2" fill="#00ffcc" opacity="0.8" />
        <circle cx="75" cy="74" r="1.5" fill="white" opacity="0.8" />
        {/* Eyebrows - sharp angular */}
        <path d="M38 67 L56 65" stroke="#003322" strokeWidth="2.5" fill="none" strokeLinecap="square" />
        <path d="M64 65 L82 67" stroke="#003322" strokeWidth="2.5" fill="none" strokeLinecap="square" />
        {/* Nose */}
        <path d="M57 84 Q60 88 63 84" stroke="#b89878" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Mouth - neutral/serious */}
        <path d="M52 95 L68 95" stroke="#cc9977" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="53" y="106" width="14" height="18" rx="3" fill="url(#skin_shield)" />
        {/* Circuit line on cheek */}
        <path d="M34 80 L40 80 L40 76 L43 76" stroke="#00ffcc" strokeWidth="0.8" fill="none" opacity="0.7" />
        {/* Outfit - tactical */}
        <path d="M24 140 Q35 116 60 114 Q85 116 96 140 L120 160 L0 160 Z" fill="#0a1a14" />
        <path d="M48 116 L60 124 L72 116" stroke="#00ffcc" strokeWidth="1.5" fill="none" />
        <rect x="56" y="118" width="8" height="10" rx="2" fill="#00ffcc" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "muse3",
    name: "MUSE-3",
    type: "Post Scheduler",
    bio: "Posts at peak times across every platform",
    color: "#aa55ff",
    stats: ["30+ Platforms", "Peak-time AI", "Auto-caption"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_muse" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#1a0033" />
            <stop offset="100%" stopColor="#080012" />
          </radialGradient>
          <radialGradient id="glow_muse" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#aa55ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#aa55ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hair_muse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cc88ff" />
            <stop offset="50%" stopColor="#aa55ff" />
            <stop offset="100%" stopColor="#7722cc" />
          </linearGradient>
          <linearGradient id="skin_muse" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe8e0" />
            <stop offset="100%" stopColor="#ffd0c0" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_muse)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_muse)" />
        {/* Long flowing hair */}
        <path d="M26 70 Q18 100 22 145 Q32 130 34 110 Q38 95 36 80 Z" fill="url(#hair_muse)" />
        <path d="M94 70 Q102 100 98 145 Q88 130 86 110 Q82 95 84 80 Z" fill="url(#hair_muse)" />
        {/* Hair body */}
        <ellipse cx="60" cy="66" rx="34" ry="36" fill="url(#hair_muse)" />
        {/* Wavy hair top */}
        <path d="M28 54 Q35 36 44 46 Q50 30 60 44 Q70 28 76 46 Q85 34 92 54" fill="url(#hair_muse)" stroke="none" />
        {/* Face */}
        <ellipse cx="60" cy="82" rx="25" ry="28" fill="url(#skin_muse)" />
        {/* Eyes - large dreamy */}
        <ellipse cx="48" cy="78" rx="9" ry="10" fill="#2a0044" />
        <ellipse cx="72" cy="78" rx="9" ry="10" fill="#2a0044" />
        <ellipse cx="48" cy="78" rx="7" ry="8" fill="#aa55ff" opacity="0.85" />
        <ellipse cx="72" cy="78" rx="7" ry="8" fill="#aa55ff" opacity="0.85" />
        <circle cx="48" cy="78" r="3.5" fill="#1a0033" />
        <circle cx="72" cy="78" r="3.5" fill="#1a0033" />
        <circle cx="50" cy="75" r="2" fill="white" opacity="0.9" />
        <circle cx="74" cy="75" r="2" fill="white" opacity="0.9" />
        {/* Star sparkles in eyes */}
        <path d="M46 82 L47 80 L48 82 L49 80 L50 82" stroke="#cc88ff" strokeWidth="0.8" fill="none" />
        <path d="M70 82 L71 80 L72 82 L73 80 L74 82" stroke="#cc88ff" strokeWidth="0.8" fill="none" />
        {/* Eyelashes */}
        <path d="M39 73 Q44 68 49 71" stroke="#7722cc" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M63 71 Q68 68 81 73" stroke="#7722cc" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Eyebrows - curved */}
        <path d="M39 69 Q48 63 57 67" stroke="#8833bb" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M63 67 Q72 63 81 69" stroke="#8833bb" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M57 87 Q60 91 63 87" stroke="#e8b0a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Smile */}
        <path d="M51 97 Q60 104 69 97" stroke="#ff88aa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Blush stars */}
        <path d="M36 87 L37 85 L38 87 L36 88 L38 89 L37 91 L36 89 L34 88 Z" fill="#aa55ff" opacity="0.4" />
        <path d="M82 87 L83 85 L84 87 L82 88 L84 89 L83 91 L82 89 L80 88 Z" fill="#aa55ff" opacity="0.4" />
        {/* Neck */}
        <rect x="53" y="108" width="14" height="16" rx="4" fill="url(#skin_muse)" />
        {/* Outfit */}
        <path d="M22 140 Q38 118 60 116 Q82 118 98 140 L120 160 L0 160 Z" fill="#1a0033" />
        <path d="M45 118 Q60 126 75 118" stroke="#aa55ff" strokeWidth="2" fill="none" />
        {/* Floating music notes around */}
        <text x="18" y="60" fill="#aa55ff" opacity="0.5" fontSize="10">♪</text>
        <text x="95" y="55" fill="#aa55ff" opacity="0.5" fontSize="10">♫</text>
      </svg>
    ),
  },
  {
    id: "prism",
    name: "PRISM",
    type: "Revenue Brain",
    bio: "Tracks your money and finds growth gaps",
    color: "#3388ff",
    stats: ["Live Analytics", "ROI Reports", "Trend Alerts"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_prism" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#001033" />
            <stop offset="100%" stopColor="#000810" />
          </radialGradient>
          <radialGradient id="glow_prism" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#3388ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3388ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_prism" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c8d8e8" />
            <stop offset="100%" stopColor="#a8b8cc" />
          </linearGradient>
          <linearGradient id="hair_prism" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#001155" />
            <stop offset="50%" stopColor="#1144cc" />
            <stop offset="100%" stopColor="#3388ff" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_prism)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_prism)" />
        {/* Slicked back hair */}
        <path d="M30 56 Q32 34 60 28 Q88 34 90 56 L88 60 Q80 44 60 38 Q40 44 32 60 Z" fill="url(#hair_prism)" />
        {/* Hair sides */}
        <path d="M30 56 L32 60 L32 72 L30 70 Z" fill="#1144cc" />
        <path d="M90 56 L88 60 L88 72 L90 70 Z" fill="#1144cc" />
        {/* Face - angular/sharp */}
        <path d="M34 72 Q34 100 40 112 Q50 122 60 122 Q70 122 80 112 Q86 100 86 72 Q80 64 60 62 Q40 64 34 72 Z" fill="url(#skin_prism)" />
        {/* Eyes - sharp analytical */}
        <path d="M38 78 L58 76" stroke="#3388ff" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M62 76 L82 78" stroke="#3388ff" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="48" cy="77" rx="6" ry="6" fill="#001033" />
        <ellipse cx="72" cy="77" rx="6" ry="6" fill="#001033" />
        <circle cx="48" cy="77" r="3" fill="#3388ff" opacity="0.9" />
        <circle cx="72" cy="77" r="3" fill="#3388ff" opacity="0.9" />
        <circle cx="50" cy="75" r="1.5" fill="white" opacity="0.8" />
        <circle cx="74" cy="75" r="1.5" fill="white" opacity="0.8" />
        {/* HUD lines from eyes */}
        <path d="M34 77 L42 77" stroke="#3388ff" strokeWidth="0.8" opacity="0.6" />
        <path d="M78 77 L86 77" stroke="#3388ff" strokeWidth="0.8" opacity="0.6" />
        {/* Eyebrows - flat/serious */}
        <rect x="38" y="68" width="20" height="3" rx="1.5" fill="#0033aa" />
        <rect x="62" y="68" width="20" height="3" rx="1.5" fill="#0033aa" />
        {/* Nose */}
        <path d="M57 86 Q60 90 63 86" stroke="#8899aa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Mouth - slight smirk */}
        <path d="M50 98 Q58 102 68 99" stroke="#99aabb" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Data visualization on forehead */}
        <path d="M46 62 L50 55 L54 60 L58 52 L62 58 L66 54 L70 60 L74 56" stroke="#3388ff" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        {/* Neck */}
        <rect x="53" y="108" width="14" height="18" rx="3" fill="url(#skin_prism)" />
        {/* Suit/outfit */}
        <path d="M22 140 Q36 116 60 114 Q84 116 98 140 L120 160 L0 160 Z" fill="#001033" />
        <path d="M60 114 L60 160" stroke="#3388ff" strokeWidth="1" opacity="0.4" />
        <path d="M48 120 Q60 128 72 120" stroke="#3388ff" strokeWidth="1.5" fill="none" />
        {/* Tie */}
        <path d="M57 116 L60 132 L63 116 L60 114 Z" fill="#3388ff" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "echov",
    name: "ECHO-V",
    type: "Voice Clone",
    bio: "Sends personalized voice messages to fans",
    color: "#ffaa00",
    stats: ["Voice Match", "50+ Langs", "Emotion AI"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_echo" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#1a1000" />
            <stop offset="100%" stopColor="#0a0800" />
          </radialGradient>
          <radialGradient id="glow_echo" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_echo" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe4c0" />
            <stop offset="100%" stopColor="#f8c888" />
          </linearGradient>
          <linearGradient id="hair_echo" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffdd44" />
            <stop offset="50%" stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#cc7700" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_echo)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_echo)" />
        {/* Messy medium hair */}
        <path d="M28 64 Q26 44 34 34 Q44 22 60 20 Q76 22 86 34 Q94 44 92 64 L88 62 L84 40 Q76 30 60 28 Q44 30 36 40 L32 62 Z" fill="url(#hair_echo)" />
        {/* Random hair strands */}
        <path d="M52 22 Q48 14 50 20" stroke="#ffdd44" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 20 Q58 10 62 18" stroke="#ffaa00" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M68 22 Q72 12 70 20" stroke="#ffcc22" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Face */}
        <ellipse cx="60" cy="82" rx="26" ry="29" fill="url(#skin_echo)" />
        {/* Eyes - warm/friendly */}
        <ellipse cx="47" cy="78" rx="8.5" ry="9" fill="#2a1800" />
        <ellipse cx="73" cy="78" rx="8.5" ry="9" fill="#2a1800" />
        <ellipse cx="47" cy="78" rx="6.5" ry="7" fill="#cc8800" opacity="0.9" />
        <ellipse cx="73" cy="78" rx="6.5" ry="7" fill="#cc8800" opacity="0.9" />
        <circle cx="47" cy="78" r="3" fill="#1a0c00" />
        <circle cx="73" cy="78" r="3" fill="#1a0c00" />
        <circle cx="49" cy="76" r="2" fill="white" opacity="0.9" />
        <circle cx="75" cy="76" r="2" fill="white" opacity="0.9" />
        {/* Eyelashes - thick */}
        <path d="M39 72 Q43 67 48 70" stroke="#cc7700" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M64 70 Q69 67 81 72" stroke="#cc7700" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Eyebrows */}
        <path d="M39 69 Q47 63 56 67" stroke="#aa6600" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M64 67 Q73 63 81 69" stroke="#aa6600" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M57 88 Q60 92 63 88" stroke="#d4a060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Warm smile */}
        <path d="M50 98 Q60 108 70 98" stroke="#ff8833" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="40" cy="88" rx="8" ry="5" fill="#ffaa00" opacity="0.2" />
        <ellipse cx="80" cy="88" rx="8" ry="5" fill="#ffaa00" opacity="0.2" />
        {/* Sound waves from mouth */}
        <path d="M72 105 Q78 101 78 105 Q78 109 72 105" stroke="#ffaa00" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M76 103 Q84 98 84 103 Q84 108 76 103" stroke="#ffaa00" strokeWidth="1" fill="none" opacity="0.4" />
        {/* Headphones */}
        <path d="M32 74 Q28 60 32 52 Q40 38 60 36 Q80 38 88 52 Q92 60 88 74" stroke="#ffaa00" strokeWidth="3" fill="none" />
        <rect x="28" y="72" width="8" height="14" rx="4" fill="#ffaa00" opacity="0.8" />
        <rect x="84" y="72" width="8" height="14" rx="4" fill="#ffaa00" opacity="0.8" />
        {/* Neck */}
        <rect x="53" y="109" width="14" height="16" rx="4" fill="url(#skin_echo)" />
        {/* Outfit */}
        <path d="M24 140 Q38 118 60 116 Q82 118 96 140 L120 160 L0 160 Z" fill="#1a1000" />
        <path d="M46 118 Q60 126 74 118" stroke="#ffaa00" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    id: "pixelq",
    name: "PIXEL-Q",
    type: "Media Gen",
    bio: "Creates thumbnails and promo content",
    color: "#ff3388",
    stats: ["1080p Output", "Brand Match", "Auto-crop"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_pixel" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#280018" />
            <stop offset="100%" stopColor="#0e0008" />
          </radialGradient>
          <radialGradient id="glow_pixel" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#ff3388" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff3388" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_pixel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c8b0d8" />
            <stop offset="100%" stopColor="#b095c0" />
          </linearGradient>
          <linearGradient id="hair_pixel" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff3388" />
            <stop offset="40%" stopColor="#ff66aa" />
            <stop offset="70%" stopColor="#ffaacc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_pixel)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_pixel)" />
        {/* Short bob with bangs */}
        <path d="M28 68 Q28 44 40 32 Q50 22 60 20 Q70 22 80 32 Q92 44 92 68 L88 70 L88 58 Q82 38 60 34 Q38 38 32 58 L32 70 Z" fill="url(#hair_pixel)" />
        {/* Bangs */}
        <path d="M32 66 Q36 52 48 56 L48 66" fill="url(#hair_pixel)" />
        <path d="M88 66 Q84 52 72 56 L72 66" fill="url(#hair_pixel)" />
        <path d="M38 66 Q45 54 60 56 Q75 54 82 66 L78 64 Q72 50 60 52 Q48 50 42 64 Z" fill="url(#hair_pixel)" />
        {/* Decorative hairpin - pixel style */}
        <rect x="72" y="48" width="10" height="4" rx="2" fill="#ff3388" />
        <rect x="74" y="44" width="6" height="6" rx="1" fill="#ffaacc" />
        {/* Face */}
        <ellipse cx="60" cy="84" rx="24" ry="26" fill="url(#skin_pixel)" />
        {/* Eyes - artistic/expressive */}
        <ellipse cx="48" cy="80" rx="8" ry="9" fill="#1a0010" />
        <ellipse cx="72" cy="80" rx="8" ry="9" fill="#1a0010" />
        <ellipse cx="48" cy="80" rx="6" ry="7" fill="#cc2266" opacity="0.9" />
        <ellipse cx="72" cy="80" rx="6" ry="7" fill="#cc2266" opacity="0.9" />
        <circle cx="48" cy="80" r="3" fill="#0d0008" />
        <circle cx="72" cy="80" r="3" fill="#0d0008" />
        <circle cx="50" cy="77" r="1.8" fill="white" opacity="0.9" />
        <circle cx="74" cy="77" r="1.8" fill="white" opacity="0.9" />
        {/* Artistic eye marks */}
        <path d="M40 84 L44 86 L44 82 Z" fill="#ff3388" opacity="0.6" />
        <path d="M80 84 L76 86 L76 82 Z" fill="#ff3388" opacity="0.6" />
        {/* Eyebrows */}
        <path d="M40 71 Q48 65 56 69" stroke="#aa1155" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M64 69 Q72 65 80 71" stroke="#aa1155" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M57 88 Q60 92 63 88" stroke="#9080a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Playful smile */}
        <path d="M52 98 Q60 106 68 98" stroke="#ff3388" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="53" y="108" width="14" height="18" rx="4" fill="url(#skin_pixel)" />
        {/* Artist outfit */}
        <path d="M24 140 Q38 118 60 116 Q82 118 96 140 L120 160 L0 160 Z" fill="#200010" />
        <path d="M46 118 Q60 126 74 118" stroke="#ff3388" strokeWidth="2" fill="none" />
        {/* Pixel squares decoration */}
        <rect x="30" y="50" width="4" height="4" fill="#ff3388" opacity="0.4" />
        <rect x="86" y="46" width="4" height="4" fill="#ff3388" opacity="0.4" />
        <rect x="26" y="56" width="3" height="3" fill="#ff6699" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "flux",
    name: "FLUX",
    type: "Price Optimizer",
    bio: "A/B tests pricing to maximize revenue",
    color: "#00ffcc",
    stats: ["A/B Testing", "+32% Avg Rev", "Smart Tiers"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_flux" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#001a1a" />
            <stop offset="100%" stopColor="#000d0d" />
          </radialGradient>
          <radialGradient id="glow_flux" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_flux" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4ede8" />
            <stop offset="100%" stopColor="#b8d8d0" />
          </linearGradient>
          <linearGradient id="hair_flux" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffcc" />
            <stop offset="50%" stopColor="#00ccaa" />
            <stop offset="100%" stopColor="#007766" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_flux)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_flux)" />
        {/* Short side-part hair */}
        <path d="M30 62 Q28 40 38 30 Q48 22 60 22 Q74 22 82 32 Q92 44 90 62 L88 60 L84 38 Q76 28 60 28 Q44 28 36 38 L32 60 Z" fill="url(#hair_flux)" />
        {/* Side part detail */}
        <path d="M32 62 Q38 52 50 56 L52 70" stroke="#007766" strokeWidth="3" fill="none" />
        {/* Face */}
        <ellipse cx="60" cy="82" rx="26" ry="28" fill="url(#skin_flux)" />
        {/* Eyes - cool/calculating */}
        <ellipse cx="47" cy="78" rx="8" ry="8.5" fill="#001a1a" />
        <ellipse cx="73" cy="78" rx="8" ry="8.5" fill="#001a1a" />
        <ellipse cx="47" cy="78" rx="6" ry="6.5" fill="#00ccaa" opacity="0.9" />
        <ellipse cx="73" cy="78" rx="6" ry="6.5" fill="#00ccaa" opacity="0.9" />
        <circle cx="47" cy="78" r="3" fill="#001212" />
        <circle cx="73" cy="78" r="3" fill="#001212" />
        <circle cx="49" cy="76" r="1.8" fill="white" opacity="0.8" />
        <circle cx="75" cy="76" r="1.8" fill="white" opacity="0.8" />
        {/* Eyelashes */}
        <path d="M39 72 Q43 67 47 70" stroke="#009977" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M63 70 Q67 67 81 72" stroke="#009977" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Eyebrows */}
        <path d="M39 69 Q47 63 56 67" stroke="#006655" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M64 67 Q73 63 81 69" stroke="#006655" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M57 87 Q60 91 63 87" stroke="#90b8b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Confident smile */}
        <path d="M52 97 Q60 103 68 97" stroke="#00ffcc" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Chart/graph on temple */}
        <path d="M28 80 L32 74 L36 78 L38 71 L40 75" stroke="#00ffcc" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        {/* Neck */}
        <rect x="53" y="108" width="14" height="18" rx="4" fill="url(#skin_flux)" />
        {/* Outfit */}
        <path d="M24 140 Q38 118 60 116 Q82 118 96 140 L120 160 L0 160 Z" fill="#001a1a" />
        <path d="M46 118 Q60 126 74 118" stroke="#00ffcc" strokeWidth="2" fill="none" />
        {/* Small $ signs floating */}
        <text x="24" y="52" fill="#00ffcc" opacity="0.4" fontSize="9" fontWeight="bold">$</text>
        <text x="93" y="58" fill="#00ffcc" opacity="0.4" fontSize="9" fontWeight="bold">$</text>
      </svg>
    ),
  },
  {
    id: "guard2",
    name: "GUARD-2",
    type: "DMCA Hunter",
    bio: "Finds pirated content and files takedowns",
    color: "#aa55ff",
    stats: ["Web Crawler", "Auto-DMCA", "48hr Process"],
    portrait: (
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg_guard" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#150022" />
            <stop offset="100%" stopColor="#070010" />
          </radialGradient>
          <radialGradient id="glow_guard" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#aa55ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#aa55ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skin_guard" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c8c0d8" />
            <stop offset="100%" stopColor="#a898c0" />
          </linearGradient>
          <linearGradient id="hair_guard" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#220044" />
            <stop offset="100%" stopColor="#110022" />
          </linearGradient>
        </defs>
        <rect width="120" height="160" fill="url(#bg_guard)" />
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#glow_guard)" />
        {/* Helmet/hood */}
        <path d="M26 68 Q24 44 36 30 Q46 18 60 16 Q74 18 84 30 Q96 44 94 68 L90 66 L88 46 Q80 26 60 22 Q40 26 32 46 L30 66 Z" fill="url(#hair_guard)" />
        {/* Visor on forehead */}
        <path d="M34 56 Q40 46 60 44 Q80 46 86 56 L84 58 Q78 50 60 48 Q42 50 36 58 Z" fill="#aa55ff" opacity="0.4" />
        {/* Face */}
        <ellipse cx="60" cy="82" rx="25" ry="27" fill="url(#skin_guard)" />
        {/* Eyes - intense purple */}
        <ellipse cx="47" cy="78" rx="8" ry="9" fill="#150022" />
        <ellipse cx="73" cy="78" rx="8" ry="9" fill="#150022" />
        <ellipse cx="47" cy="78" rx="6" ry="7" fill="#aa55ff" opacity="0.85" />
        <ellipse cx="73" cy="78" rx="6" ry="7" fill="#aa55ff" opacity="0.85" />
        <circle cx="47" cy="78" r="3" fill="#0a0015" />
        <circle cx="73" cy="78" r="3" fill="#0a0015" />
        <circle cx="49" cy="76" r="2" fill="white" opacity="0.9" />
        <circle cx="75" cy="76" r="2" fill="white" opacity="0.9" />
        {/* Glowing scan lines */}
        <path d="M34 78 L38 78" stroke="#aa55ff" strokeWidth="1.5" opacity="0.7" />
        <path d="M82 78 L86 78" stroke="#aa55ff" strokeWidth="1.5" opacity="0.7" />
        {/* Eyebrows - stern */}
        <path d="M38 68 Q47 62 56 66" stroke="#440088" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M64 66 Q73 62 82 68" stroke="#440088" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M57 87 Q60 91 63 87" stroke="#8878a8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Stern expression */}
        <path d="M50 97 Q60 100 70 97" stroke="#9988bb" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Neck */}
        <rect x="53" y="107" width="14" height="18" rx="3" fill="url(#skin_guard)" />
        {/* Tactical outfit */}
        <path d="M22 140 Q36 116 60 114 Q84 116 98 140 L120 160 L0 160 Z" fill="#150022" />
        <path d="M46 116 Q60 124 74 116" stroke="#aa55ff" strokeWidth="2" fill="none" />
        {/* Shield emblem */}
        <path d="M56 118 L60 115 L64 118 L64 126 Q60 130 56 126 Z" fill="#aa55ff" opacity="0.5" />
        {/* Scanning reticles */}
        <circle cx="24" cy="44" r="6" fill="none" stroke="#aa55ff" strokeWidth="0.8" opacity="0.4" />
        <path d="M18 44 L20 44 M28 44 L30 44 M24 38 L24 40 M24 48 L24 50" stroke="#aa55ff" strokeWidth="0.8" opacity="0.4" />
        <circle cx="96" cy="48" r="6" fill="none" stroke="#aa55ff" strokeWidth="0.8" opacity="0.4" />
        <path d="M90 48 L92 48 M100 48 L102 48 M96 42 L96 44 M96 52 L96 54" stroke="#aa55ff" strokeWidth="0.8" opacity="0.4" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "#08070e", minHeight: "100vh", color: "#e5e5e5", overflow: "hidden" }}>

      {/* ── HERO SECTION ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Animated dot grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(0,255,204,0.18) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "dotPulse 6s ease-in-out infinite",
        }} />
        {/* Neon gradient overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 70% at 50% 10%, rgba(170,85,255,0.15) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,51,136,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 70%, rgba(0,255,204,0.08) 0%, transparent 60%)",
        }} />
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,255,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "80px 24px 40px", maxWidth: "900px", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,255,204,0.08)", border: "1px solid rgba(0,255,204,0.3)",
            borderRadius: "999px", padding: "6px 16px", marginBottom: "32px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ffcc", display: "inline-block", animation: "pulse 2s ease-in-out infinite", boxShadow: "0 0 8px #00ffcc" }} />
            <span style={{ color: "#00ffcc", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI Agent Platform for Creators</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            marginBottom: "8px",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e0ff 40%, #aa55ff 70%, #ff3388 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}>
            Your AI Crew.
          </h1>
          <h1 style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            marginBottom: "32px",
            background: "linear-gradient(135deg, #00ffcc 0%, #00ddaa 50%, #aa55ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}>
            Always Working.
          </h1>

          {/* Subtext */}
          <p style={{ color: "#9999cc", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", maxWidth: "560px", margin: "0 auto 48px", lineHeight: 1.7 }}>
            8 specialized AI agents that handle your DMs, schedule posts, protect your content, and grow your revenue — 24/7 on autopilot.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/sign-up" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #00ffcc, #00ddaa)",
              color: "#08070e", fontWeight: 700, fontSize: "15px",
              padding: "14px 32px", borderRadius: "12px", textDecoration: "none",
              boxShadow: "0 0 30px rgba(0,255,204,0.3), 0 8px 24px rgba(0,0,0,0.4)",
              transition: "all 0.3s",
            }}>
              <span>🤖</span> Deploy Your First Agent
            </a>
            <a href="/agents" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "transparent",
              color: "#aa55ff", fontWeight: 600, fontSize: "15px",
              padding: "14px 32px", borderRadius: "12px", textDecoration: "none",
              border: "1px solid rgba(170,85,255,0.5)",
              transition: "all 0.3s",
            }}>
              See All Agents →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
          <span style={{ color: "#9999cc", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #9999cc, transparent)" }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        padding: "24px 24px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "24px" }}>
          {[
            { value: "500+", label: "Creators" },
            { value: "2.4M", label: "DMs Handled" },
            { value: "99.97%", label: "Uptime" },
            { value: "$1.2M", label: "Revenue Generated" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#00ffcc", letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: "#666688", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AGENT CHARACTER CARDS ── */}
      <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(170,85,255,0.08)", border: "1px solid rgba(170,85,255,0.3)",
            borderRadius: "999px", padding: "6px 16px", marginBottom: "20px",
          }}>
            <span style={{ color: "#aa55ff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Meet Your Crew</span>
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800,
            background: "linear-gradient(135deg, #ffffff 0%, #ccccff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: "16px", lineHeight: 1.1,
          }}>
            8 AI Agents. One Empire.
          </h2>
          <p style={{ color: "#666688", fontSize: "16px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Each agent is a specialist. Together they automate everything that&apos;s eating your time.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
        }}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(${agent.color === "#ff3388" ? "255,51,136" : agent.color === "#00ffcc" ? "0,255,204" : agent.color === "#aa55ff" ? "170,85,255" : agent.color === "#3388ff" ? "51,136,255" : "255,170,0"},0.06) 100%)`,
                border: `1px solid ${agent.color}44`,
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              {/* Glow top border */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)`,
              }} />

              {/* Portrait area */}
              <div style={{
                width: "100%",
                height: "180px",
                position: "relative",
                overflow: "hidden",
                background: `radial-gradient(ellipse at 50% 80%, ${agent.color}22 0%, transparent 70%)`,
              }}>
                <div style={{ width: "120px", height: "160px", margin: "10px auto 0" }}>
                  {agent.portrait}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "16px 20px 20px" }}>
                {/* Name + type */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: agent.color, letterSpacing: "0.05em", margin: 0 }}>
                      {agent.name}
                    </h3>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, color: agent.color,
                      border: `1px solid ${agent.color}55`, borderRadius: "4px",
                      padding: "2px 6px", letterSpacing: "0.08em", textTransform: "uppercase",
                      background: `${agent.color}11`,
                    }}>
                      {agent.type}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#8888aa", lineHeight: 1.5, margin: 0 }}>{agent.bio}</p>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {agent.stats.map((stat) => (
                    <span key={stat} style={{
                      fontSize: "10px", color: "#aaaacc",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px", padding: "3px 8px",
                    }}>
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <a href="/agents" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            color: "#aa55ff", fontSize: "14px", fontWeight: 600,
            textDecoration: "none", border: "1px solid rgba(170,85,255,0.4)",
            padding: "12px 28px", borderRadius: "10px",
            background: "rgba(170,85,255,0.06)",
          }}>
            Explore All Agents & Features →
          </a>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: "100px 24px",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 0%, #ccccff 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "12px",
            }}>
              Up and Running in Minutes
            </h2>
            <p style={{ color: "#666688", fontSize: "15px" }}>Three steps to a fully automated creator business</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
            {[
              {
                step: "01",
                icon: "✦",
                title: "Sign Up",
                desc: "Create your account in 30 seconds. No credit card required to start.",
                color: "#00ffcc",
              },
              {
                step: "02",
                icon: "◈",
                title: "Pick Your Agents",
                desc: "Select which AI agents to deploy. Configure each one with your voice, content rules, and goals.",
                color: "#aa55ff",
              },
              {
                step: "03",
                icon: "◉",
                title: "They Work While You Sleep",
                desc: "Your agents reply to fans, post content, hunt leaks, and optimize revenue — automatically.",
                color: "#ff3388",
              },
            ].map((item) => (
              <div key={item.step} style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "32px",
                position: "relative",
              }}>
                <div style={{
                  fontSize: "11px", fontWeight: 700, color: item.color,
                  letterSpacing: "0.2em", marginBottom: "20px", opacity: 0.8,
                }}>
                  STEP {item.step}
                </div>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: `${item.color}15`, border: `1px solid ${item.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", color: item.color, marginBottom: "20px",
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>{item.title}</h3>
                <p style={{ color: "#666688", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{
          maxWidth: "700px", margin: "0 auto", textAlign: "center",
          background: "linear-gradient(135deg, rgba(170,85,255,0.1) 0%, rgba(0,255,204,0.06) 100%)",
          border: "1px solid rgba(170,85,255,0.25)",
          borderRadius: "28px",
          padding: "64px 40px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(170,85,255,0.15) 0%, transparent 70%)",
          }} />
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800,
            color: "#ffffff", marginBottom: "16px", position: "relative",
          }}>
            Ready to automate your empire?
          </h2>
          <p style={{ color: "#8888aa", fontSize: "16px", marginBottom: "40px", lineHeight: 1.7, position: "relative" }}>
            Join 500+ creators who&apos;ve deployed their AI crew. Start with 2 agents free — no card needed.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <a href="/sign-up" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #aa55ff, #cc77ff)",
              color: "#ffffff", fontWeight: 700, fontSize: "15px",
              padding: "14px 36px", borderRadius: "12px", textDecoration: "none",
              boxShadow: "0 0 30px rgba(170,85,255,0.35), 0 8px 24px rgba(0,0,0,0.4)",
            }}>
              🚀 Start Free Today
            </a>
            <a href="/pricing" style={{
              display: "inline-flex", alignItems: "center",
              background: "transparent",
              color: "#9999cc", fontWeight: 600, fontSize: "15px",
              padding: "14px 28px", borderRadius: "12px", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Animation keyframes */}
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
