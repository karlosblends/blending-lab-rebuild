// Original vector sketches for this prototype; no Icons8 assets are embedded.
const sketches: Record<string, string[]> = {
  website: [
    "M18 26 Q58 22 101 27 L98 87 Q59 91 17 86 Z M19 40 Q58 37 99 41",
    "M26 33 l1 0 M34 32 l1 0 M42 33 l1 0",
    "M37 55 Q46 64 58 75 M58 54 Q47 65 36 77",
    "M70 55 l18 1 M70 64 l13 1 M69 74 l16 0",
    "M9 18 l-5 -7 M104 16 l7 -7 M108 34 l8 -2",
  ],
  offer: [
    "M23 38 L59 20 L96 36 L94 85 L58 103 L22 84 Z",
    "M23 38 L58 55 L96 36 M58 55 L58 102 M40 29 L76 46 L76 60",
    "M37 69 Q43 73 49 73 M34 79 L47 85",
    "M102 21 l4 -8 M110 28 l9 -2 M9 54 l-6 -3",
  ],
  traffic: [
    "M42 57 Q34 35 54 29 Q73 25 78 46 Q80 64 61 68 Q48 69 42 57 Z",
    "M29 99 Q29 77 49 77 L69 77 Q88 79 89 100",
    "M13 35 L29 45 M29 45 L19 45 M29 45 L27 34",
    "M108 36 L91 47 M91 47 L93 35 M91 47 L103 45",
    "M54 42 l1 1 M65 42 l1 0 M54 55 Q61 60 67 53",
    "M59 9 l1 9",
  ],
  ads: [
    "M20 48 L48 40 L83 22 Q78 52 86 79 L49 65 L21 64 Z",
    "M48 40 L49 65 M29 67 L35 92 L48 90 L43 66",
    "M94 34 l12 -7 M96 51 l17 1 M95 68 l11 9",
    "M25 24 Q15 19 10 26 Q7 33 15 37 Q24 40 27 32 Q30 28 25 24 Z",
    "M16 24 L20 35 M13 29 L24 30",
  ],
  analytics: [
    "M20 22 L18 91 Q55 96 96 92 M34 76 L34 59 L47 58 L47 77",
    "M57 77 L57 45 L70 45 L70 77 M80 77 L80 31 L92 31 L92 77",
    "M33 32 Q38 22 49 27 Q58 32 49 39 L44 44 M44 51 l0 1",
    "M9 102 Q57 108 105 101",
  ],
  improvements: [
    "M31 32 Q61 9 88 35 L97 46 M97 46 L97 26 M97 46 L77 43",
    "M91 83 Q57 110 30 83 L20 71 M20 71 L19 92 M20 71 L40 74",
    "M46 57 L56 70 L76 47 M48 58 L56 67",
    "M15 46 l-5 -3 M102 68 l9 2",
  ],
  done: [
    "M20 37 Q58 33 99 37 L97 91 Q59 95 21 90 Z",
    "M21 39 L59 68 L98 38 M21 89 L45 65 M97 89 L73 66",
    "M47 18 L56 26 L74 10",
  ],
};

export default function OfferDoodle({ kind }: { kind: string }) {
  return <svg className="offer-doodle" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {(sketches[kind] ?? sketches.website).map((d, index) => <path key={index} d={d} />)}
  </svg>;
}
