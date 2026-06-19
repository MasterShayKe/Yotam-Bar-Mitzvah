/* ============================================================
   🎨  לוגואים של יצרני רכב — מצוירים ב-SVG (בלי תלות באינטרנט)
   כל לוגו הוא פונקציה שמחזירה קוד SVG פשוט ומזוהה.
   ============================================================ */

const LOGOS = {
  // BMW — עיגול כחול-לבן מחולק לרבעים
  bmw: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#111"/>
    <circle cx="50" cy="50" r="38" fill="#fff"/>
    <path d="M50 12 A38 38 0 0 1 88 50 L50 50 Z" fill="#0d6efd"/>
    <path d="M50 88 A38 38 0 0 1 12 50 L50 50 Z" fill="#0d6efd"/>
    <path d="M50 12 A38 38 0 0 0 12 50 L50 50 Z" fill="#fff"/>
    <path d="M50 88 A38 38 0 0 0 88 50 L50 50 Z" fill="#fff"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="#111" stroke-width="2"/>
  </svg>`,

  // Mercedes-Benz — כוכב משולש
  mercedes: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="none" stroke="#222" stroke-width="4"/>
    <g stroke="#222" stroke-width="6" stroke-linecap="round">
      <line x1="50" y1="50" x2="50" y2="8"/>
      <line x1="50" y1="50" x2="14" y2="72"/>
      <line x1="50" y1="50" x2="86" y2="72"/>
    </g>
  </svg>`,

  // Audi — ארבע טבעות
  audi: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#222" stroke-width="6">
      <circle cx="35" cy="50" r="26"/>
      <circle cx="75" cy="50" r="26"/>
      <circle cx="115" cy="50" r="26"/>
      <circle cx="155" cy="50" r="26"/>
    </g>
  </svg>`,

  // Volkswagen — V מעל W בעיגול
  volkswagen: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#0d6efd"/>
    <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" stroke-width="4"/>
    <g fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round">
      <path d="M30 26 L42 54 L50 36 L58 54 L70 26"/>
      <path d="M30 26 L50 74 L70 26" opacity="0"/>
      <path d="M50 36 L50 74"/>
      <path d="M30 26 L40 26 M70 26 L60 26"/>
    </g>
    <path d="M28 24 L42 56 L50 38 L58 56 L72 24 L64 24 L57 42 L50 26 L43 42 L36 24 Z" fill="#fff"/>
  </svg>`,

  // Toyota — שלוש אליפסות
  toyota: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#d00" stroke-width="6">
      <ellipse cx="60" cy="50" rx="52" ry="32"/>
      <ellipse cx="60" cy="38" rx="28" ry="13"/>
      <ellipse cx="60" cy="56" rx="13" ry="24"/>
    </g>
  </svg>`,

  // Tesla — האות T הסטיילית
  tesla: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 12 C35 12 22 16 16 20 L20 30 C26 27 32 26 34 32 L34 32 C40 30 46 30 50 30 C54 30 60 30 66 32 C68 26 74 27 80 30 L84 20 C78 16 65 12 50 12 Z" fill="#e31937"/>
    <rect x="46" y="34" width="8" height="54" fill="#e31937"/>
  </svg>`,

  // Ferrari — מגן צהוב עם סוס (מופשט)
  ferrari: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 14 L80 14 L80 70 Q80 86 50 92 Q20 86 20 70 Z" fill="#ffcc00" stroke="#111" stroke-width="3"/>
    <rect x="20" y="14" width="60" height="8" fill="#008c45"/>
    <g fill="#111">
      <path d="M50 30 q-8 0 -12 8 q-2 6 2 10 l-4 14 l6 -2 l3 -10 q3 4 8 4 q6 0 8 -8 q2 -10 -4 -16 q-3 -2 -7 -0 z"/>
      <rect x="44" y="22" width="3" height="8"/>
    </g>
    <text x="50" y="80" font-size="9" font-weight="bold" text-anchor="middle" fill="#111">SF</text>
  </svg>`,

  // Porsche — מגן (מופשט)
  porsche: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 14 L78 14 L78 60 Q78 84 50 92 Q22 84 22 60 Z" fill="#c8a951"/>
    <path d="M22 14 L78 14 L78 60 Q78 84 50 92 Q22 84 22 60 Z" fill="none" stroke="#111" stroke-width="3"/>
    <line x1="50" y1="14" x2="50" y2="92" stroke="#111" stroke-width="2"/>
    <line x1="22" y1="40" x2="78" y2="40" stroke="#111" stroke-width="2"/>
    <text x="50" y="30" font-size="11" font-weight="bold" text-anchor="middle" fill="#111">PORSCHE</text>
  </svg>`,

  // Nissan — עיגול עם פס אופקי
  nissan: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="50" r="34" fill="none" stroke="#c3002f" stroke-width="6"/>
    <rect x="14" y="42" width="92" height="16" fill="#222"/>
    <text x="60" y="56" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">NISSAN</text>
  </svg>`,

  // Honda — H בתוך מסגרת
  honda: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 24 L78 24 L70 76 L30 76 Z" fill="none" stroke="#c00" stroke-width="6"/>
    <path d="M40 34 L40 66 M62 34 L62 66 M40 50 L62 50" stroke="#c00" stroke-width="7" fill="none"/>
  </svg>`,

  // Lamborghini — מגן שחור עם שור (מופשט)
  lamborghini: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12 L76 12 L76 62 Q76 86 50 94 Q24 86 24 62 Z" fill="#111" stroke="#ffcc00" stroke-width="3"/>
    <g fill="#ffcc00">
      <path d="M50 34 L40 26 Q36 24 38 30 L44 38 Q40 44 44 52 Q48 58 50 58 Q52 58 56 52 Q60 44 56 38 L62 30 Q64 24 60 26 Z"/>
    </g>
    <text x="50" y="80" font-size="7" font-weight="bold" text-anchor="middle" fill="#ffcc00">LAMBO</text>
  </svg>`,

  // Mazda — כנפיים בתוך אובל
  mazda: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="50" rx="50" ry="34" fill="none" stroke="#1a1a4b" stroke-width="5"/>
    <path d="M60 38 L34 60 Q50 44 60 52 Q70 44 86 60 Z" fill="#1a1a4b"/>
  </svg>`,

  // Subaru — שש כוכבים בסגלגל
  subaru: `<svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="70" cy="50" rx="62" ry="34" fill="#1b3a8c"/>
    <g fill="#fff">
      <path d="M40 50 l3 -7 l3 7 l-3 -2 z"/>
      <circle cx="72" cy="34" r="3"/><circle cx="90" cy="40" r="3"/>
      <circle cx="100" cy="52" r="3"/><circle cx="88" cy="60" r="3"/>
      <circle cx="74" cy="64" r="3"/>
    </g>
    <circle cx="58" cy="50" r="5" fill="#fff"/>
  </svg>`,

  // Ford — אליפסה כחולה עם הכיתוב
  ford: `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="50" rx="74" ry="38" fill="#1c3f94"/>
    <ellipse cx="80" cy="50" rx="68" ry="32" fill="none" stroke="#fff" stroke-width="2"/>
    <text x="80" y="62" font-size="30" font-style="italic" font-family="Georgia, serif" text-anchor="middle" fill="#fff">Ford</text>
  </svg>`,

  // Chevrolet — צלב הזהב (bowtie)
  chevrolet: `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 42 L55 42 L70 28 L100 28 L100 42 L150 42 L150 60 L100 60 L100 74 L70 74 L55 60 L10 60 Z" fill="#d4af37" stroke="#111" stroke-width="2"/>
  </svg>`,
};
