import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const coreUtility = [
  {
    number: "01",
    title: "Reduce costs",
    description:
      "Use ZERA across eligible ZephiPay services to access lower fees and more efficient ways to participate.",
    benefit: "Save",
  },
  {
    number: "02",
    title: "Earn rewards",
    description:
      "Receive ecosystem rewards for meaningful activity, reliable participation, and contributions that strengthen the network.",
    benefit: "Earn",
  },
  {
    number: "03",
    title: "Stake for access",
    description:
      "Stake ZERA to unlock eligible platform benefits, premium capabilities, and deeper ecosystem participation.",
    benefit: "Stake",
  },
  {
    number: "04",
    title: "Support creators",
    description:
      "Power creator memberships, community rewards, audience participation, tips, and new forms of direct support.",
    benefit: "Create",
  },
  {
    number: "05",
    title: "Power intelligent agents",
    description:
      "Give trusted AI agents access to advanced financial assistance, automation, insights, and intelligent commerce.",
    benefit: "Automate",
  },
  {
    number: "06",
    title: "Unlock more",
    description:
      "Access advanced tools, premium experiences, and future participation opportunities throughout the Zephyon ecosystem.",
    benefit: "Unlock",
  },
];

const participantUtility = [
  {
    audience: "Personal",
    eyebrow: "For everyday users",
    headline: "Make participation more rewarding.",
    description:
      "ZERA is designed to help people save on eligible services, earn through ecosystem activity, and unlock more from the platform over time.",
    features: [
      "Eligible transaction fee reductions",
      "Participation-based ecosystem rewards",
      "Premium experiences and services",
      "Benefits that grow with continued activity",
    ],
  },
  {
    audience: "Creators",
    eyebrow: "For independent builders",
    headline: "Create more. Keep more.",
    description:
      "Creators can use ZERA to reduce eligible costs, strengthen audience participation, and access intelligent tools that make earning easier to manage.",
    features: [
      "Creator and community incentives",
      "Membership and supporter rewards",
      "Lower eligible payout and payment costs",
      "Subscription-or-Stake premium access",
      "AI-assisted financial organization",
    ],
  },
  {
    audience: "AI agents",
    eyebrow: "For intelligent assistance",
    headline: "Useful intelligence, grounded in real activity.",
    description:
      "ZERA can unlock advanced AI-assisted workflows built on verified payments, organized records, deterministic receipts, and clear user-defined controls.",
    features: [
      "AI-assisted tax organization",
      "Receipt and expense categorization",
      "Invoice tracking and reconciliation",
      "Financial insights and automated workflows",
    ],
  },
  {
    audience: "Businesses",
    eyebrow: "For modern commerce",
    headline: "Reduce friction across operations.",
    description:
      "Businesses can use ZERA to access eligible fee benefits, premium commerce capabilities, and intelligent tools for managing payment activity.",
    features: [
      "Eligible processing fee reductions",
      "Subscription-or-Stake premium access",
      "Advanced commerce and reporting tools",
      "Customer and ecosystem reward programs",
    ],
  },
];

const subscriptionOrStake = [
  {
    title: "Creators",
    description:
      "Unlock premium creator tools by paying a recurring subscription or staking ZERA while remaining aligned with the ecosystem.",
  },
  {
    title: "Businesses",
    description:
      "Reduce recurring operating costs by choosing Subscription-or-Stake for eligible premium commerce capabilities.",
  },
  {
    title: "Developers",
    description:
      "Access eligible advanced SDK capabilities, premium infrastructure, and ecosystem tools through Subscription-or-Stake.",
  },
  {
    title: "AI services",
    description:
      "Unlock intelligent financial assistance and advanced automation through Subscription-or-Stake enabled services.",
  },
];

const aiWorkflows = [
  {
    title: "Tax organization",
    description:
      "Organize verified receipts, categorized income, and eligible expenses into clearer records prepared for review at tax time.",
  },
  {
    title: "Invoice reconciliation",
    description:
      "Connect an invoice to its completed payment so records can update without relying on manual matching.",
  },
  {
    title: "Natural-language insights",
    description:
      "Ask questions such as how much was earned, what remains unpaid, or where expenses changed across a selected period.",
  },
  {
    title: "Financial automation",
    description:
      "Apply user-defined policies to recurring tasks, reminders, categorization, reporting, and other approved financial workflows.",
  },
];

const allocations = [
  {
    label: "Treasury",
    percentage: "30%",
    amount: "60M",
    purpose: "Long-term ecosystem development and resilience",
  },
  {
    label: "Ecosystem",
    percentage: "20%",
    amount: "40M",
    purpose: "Adoption, participation, grants, and incentives",
  },
  {
    label: "Utility",
    percentage: "15%",
    amount: "30M",
    purpose: "Platform utility and user participation",
  },
  {
    label: "Liquidity",
    percentage: "15%",
    amount: "30M",
    purpose: "Market access and ecosystem liquidity",
  },
  {
    label: "Team",
    percentage: "15%",
    amount: "30M",
    purpose: "Long-term contributor alignment",
  },
  {
    label: "Reserve",
    percentage: "5%",
    amount: "10M",
    purpose: "Strategic ecosystem reserve",
  },
];

const flywheel = [
  "People participate",
  "Creators build",
  "Businesses transact",
  "AI agents assist",
  "Ecosystem activity grows",
  "ZERA becomes more useful",
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}


const zeraUtilityNodes = [
  {
    label: "SAVE",
    x: 260,
    y: 63,
    accent: "#38bdf8",
  },
  {
    label: "EARN",
    x: 431,
    y: 161,
    accent: "#22d3ee",
  },
  {
    label: "UNLOCK",
    x: 431,
    y: 359,
    accent: "#60a5fa",
  },
  {
    label: "AI",
    x: 260,
    y: 457,
    accent: "#818cf8",
  },
  {
    label: "CREATE",
    x: 89,
    y: 359,
    accent: "#2dd4bf",
  },
  {
    label: "STAKE",
    x: 89,
    y: 161,
    accent: "#3b82f6",
  },
];

const zeraCircuitPaths = [
  "M260 99 L260 132 L287 159",
  "M394 177 L359 177 L330 206",
  "M394 343 L359 343 L330 314",
  "M260 421 L260 388 L287 361",
  "M126 343 L161 343 L190 314",
  "M126 177 L161 177 L190 206",
];

const zeraSecondaryRails = [
  "M260 114 L260 143 L280 163",
  "M379 186 L351 186 L326 211",
  "M379 334 L351 334 L326 309",
  "M260 406 L260 377 L280 357",
  "M141 334 L169 334 L194 309",
  "M141 186 L169 186 L194 211",
];

function ZeraUtilityVisual() {
  const hexPoints = (x: number, y: number, radius: number) =>
    Array.from({ length: 6 }, (_, index) => {
      const angle = (Math.PI / 3) * index - Math.PI / 2;

      return `${x + radius * Math.cos(angle)},${
        y + radius * Math.sin(angle)
      }`;
    }).join(" ");

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center overflow-visible p-1 sm:p-3">
      <svg
        viewBox="0 0 520 520"
        role="img"
        aria-labelledby="zera-utility-title zera-utility-description"
        className="relative h-full w-full overflow-visible drop-shadow-[0_18px_32px_rgba(2,9,20,0.14)]"
      >
        <title id="zera-utility-title">
          ZERA utility ecosystem
        </title>

        <desc id="zera-utility-description">
          A dimensional ZERA token connected to six utility categories
          through a powered hexagonal ecosystem network.
        </desc>

        <defs>
          <linearGradient
            id="zera-token-metal"
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8ed9ff" />
            <stop offset="24%" stopColor="#137bff" />
            <stop offset="52%" stopColor="#06b6ed" />
            <stop offset="76%" stopColor="#1267ef" />
            <stop offset="100%" stopColor="#8ed9ff" />
          </linearGradient>

          <linearGradient
            id="zera-token-rim-dark"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#26394c" />
            <stop offset="35%" stopColor="#0a1320" />
            <stop offset="70%" stopColor="#1d3145" />
            <stop offset="100%" stopColor="#060b12" />
          </linearGradient>

          <linearGradient
            id="zera-token-face"
            x1="18%"
            y1="8%"
            x2="82%"
            y2="92%"
          >
            <stop offset="0%" stopColor="#10243a" />
            <stop offset="42%" stopColor="#061426" />
            <stop offset="100%" stopColor="#020914" />
          </linearGradient>

          <linearGradient
            id="zera-circuit-line"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3fc8ff" stopOpacity="0.2" />
            <stop offset="48%" stopColor="#2588ff" stopOpacity="0.76" />
            <stop offset="100%" stopColor="#72dcff" stopOpacity="0.24" />
          </linearGradient>

          <linearGradient
            id="zera-energy-pulse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#84e7ff" stopOpacity="0" />
            <stop offset="48%" stopColor="#84e7ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#2588ff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="zera-token-highlight">
            <stop offset="0%" stopColor="#40c8ff" stopOpacity="0.16" />
            <stop offset="65%" stopColor="#1677ff" stopOpacity="0.035" />
            <stop offset="100%" stopColor="#1677ff" stopOpacity="0" />
          </radialGradient>

          <filter
            id="zera-controlled-glow"
            x="-45%"
            y="-45%"
            width="190%"
            height="190%"
          >
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0.10
                0 0 0 0 0.54
                0 0 0 0 1
                0 0 0 0.24 0
              "
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="zera-line-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1.15"
              result="lineBlur"
            />
            <feColorMatrix
              in="lineBlur"
              type="matrix"
              values="
                0 0 0 0 0.05
                0 0 0 0 0.55
                0 0 0 0 1
                0 0 0 0.24 0
              "
              result="softBlue"
            />
            <feMerge>
              <feMergeNode in="softBlue" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="zera-token-shadow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="8"
              floodColor="#00172f"
              floodOpacity="0.42"
            />
          </filter>

          <clipPath id="zera-token-face-clip">
            <circle cx="260" cy="260" r="89" />
          </clipPath>
        </defs>

        {/* Outer hexagonal frame */}
        <polygon
          points={hexPoints(260, 260, 208)}
          fill="none"
          stroke="#0a1b2b"
          strokeWidth="6"
          opacity="0.56"
        />

        <polygon
          points={hexPoints(260, 260, 208)}
          fill="none"
          stroke="#1677ff"
          strokeWidth="2.8"
          opacity="0.82"
          filter="url(#zera-line-glow)"
        />

        <polygon
          points={hexPoints(260, 260, 208)}
          fill="none"
          stroke="#72dcff"
          strokeWidth="0.9"
          opacity="0.68"
        />

        <polygon
          points={hexPoints(260, 260, 190)}
          fill="none"
          stroke="#0a1b2b"
          strokeWidth="5"
          opacity="0.46"
        />

        <polygon
          points={hexPoints(260, 260, 190)}
          fill="none"
          stroke="#1677ff"
          strokeWidth="2.4"
          opacity="0.7"
          filter="url(#zera-line-glow)"
        />

        <polygon
          points={hexPoints(260, 260, 190)}
          fill="none"
          stroke="#72dcff"
          strokeWidth="0.8"
          opacity="0.52"
        />

        {/* Innermost decorative hexagon removed for a cleaner silhouette */}

        {/* Architectural corner rails */}
        {zeraCircuitPaths.map((pathValue, index) => (
          <g key={`circuit-${index}`}>
            <path
              d={pathValue}
              fill="none"
              stroke="#081827"
              strokeWidth="7"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.62"
            />

            <path
              d={pathValue}
              fill="none"
              stroke="#1677ff"
              strokeWidth="2.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.86"
              filter="url(#zera-line-glow)"
            />

            <path
              d={pathValue}
              fill="none"
              stroke="#72dcff"
              strokeWidth="0.9"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.76"
            />

            <path
              d={pathValue}
              fill="none"
              stroke="url(#zera-energy-pulse)"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeDasharray="18 116"
              opacity="0.74"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="132;0"
                dur={`${4.8 + index * 0.32}s`}
                begin={`${index * -0.55}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}

        {/* Parallel Tron rails */}
        {zeraSecondaryRails.map((pathValue, index) => (
          <g key={`rail-${index}`}>
            <path
              d={pathValue}
              fill="none"
              stroke="#081827"
              strokeWidth="4.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.42"
            />

            <path
              d={pathValue}
              fill="none"
              stroke="#1677ff"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.66"
              filter="url(#zera-line-glow)"
            />

            <path
              d={pathValue}
              fill="none"
              stroke="#72dcff"
              strokeWidth="0.65"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.52"
            />
          </g>
        ))}

        {/* Inner circuit bus removed for a cleaner token silhouette */}

        {/* Circuit junction points */}
        {[
          [260, 132],
          [371, 196],
          [371, 324],
          [260, 388],
          [149, 324],
          [149, 196],
        ].map(([x, y], index) => (
          <g key={`junction-${x}-${y}`}>
            <rect
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              rx="1"
              className="fill-background stroke-brand-secondary/65"
              strokeWidth="1"
            />

            <circle
              cx={x}
              cy={y}
              r="2"
              className="fill-brand-secondary"
            >
              <animate
                attributeName="opacity"
                values="0.35;1;0.35"
                dur={`${2.4 + index * 0.23}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Utility nodes */}
        {zeraUtilityNodes.map((node, index) => (
          <g
            key={node.label}
            transform={`translate(${node.x} ${node.y})`}
          >
            {/* Theme-aware hardware body */}
            <polygon
              points={hexPoints(0, 0, 34)}
              className="fill-[#f4f8fc] dark:fill-[#050d16]"
              stroke="#102438"
              strokeWidth="4.5"
              opacity="0.96"
            />

            {/* Individual utility color */}
            <polygon
              points={hexPoints(0, 0, 32)}
              fill={node.accent}
              fillOpacity="0.19"
              stroke={node.accent}
              strokeWidth="2"
              strokeOpacity="1"
              filter="url(#zera-line-glow)"
            />

            <polygon
              points={hexPoints(0, 0, 27)}
              fill={node.accent}
              fillOpacity="0.085"
              stroke={node.accent}
              strokeWidth="1"
              strokeOpacity="0.72"
            />

            {/* Small engineered corner traces */}
            <path
              d="M-15 -18 H5 L15 -8"
              fill="none"
              stroke={node.accent}
              strokeWidth="1.1"
              strokeOpacity="0.5"
            />

            <path
              d="M15 18 H-5 L-15 8"
              fill="none"
              stroke={node.accent}
              strokeWidth="1.1"
              strokeOpacity="0.4"
            />

            <circle
              cx="0"
              cy="0"
              r="22"
              fill={node.accent}
              fillOpacity="0.06"
            />

            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={node.accent}
              className="text-[9px] font-semibold tracking-[0.1em] [paint-order:stroke] stroke-background/45 stroke-[0.35px]"
            >
              {node.label}
            </text>

            <polygon
              points={hexPoints(0, 0, 36)}
              fill="none"
              stroke={node.accent}
              strokeWidth="1.15"
              strokeOpacity="0.58"
              filter="url(#zera-line-glow)"
            >
              <animate
                attributeName="opacity"
                values="0.18;0.52;0.18"
                dur={`${3.4 + index * 0.28}s`}
                repeatCount="indefinite"
              />
            </polygon>
          </g>
        ))}

        {/* Restrained compass references */}
        {[
          { label: "N", x: 260, y: 116 },
          { label: "E", x: 405, y: 263 },
          { label: "S", x: 260, y: 410 },
          { label: "W", x: 115, y: 263 },
        ].map((point) => (
          <text
            key={point.label}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            fill="#55c9f5"
            className="text-[7px] font-medium tracking-[0.18em]"
            opacity="0.38"
          >
            {point.label}
          </text>
        ))}

        {[
          { d: "M260 121 l-3 6 h6 Z" },
          { d: "M399 260 l-6 -3 v6 Z" },
          { d: "M260 399 l-3 -6 h6 Z" },
          { d: "M121 260 l6 -3 v6 Z" },
        ].map((marker, index) => (
          <path
            key={`compass-marker-${index}`}
            d={marker.d}
            fill="#55c9f5"
            opacity="0.28"
          />
        ))}

        {/* Structural bridges mounting the token to the network */}
        <g aria-hidden="true">
          {[
            {
              base: "M260 132 L260 151",
              core: "M260 134 L260 151",
              plateX: 255,
              plateY: 146,
            },
            {
              base: "M371 196 L354 206",
              core: "M369 197 L353 207",
              plateX: 348,
              plateY: 202,
            },
            {
              base: "M371 324 L354 314",
              core: "M369 323 L353 313",
              plateX: 348,
              plateY: 308,
            },
            {
              base: "M260 388 L260 369",
              core: "M260 386 L260 369",
              plateX: 255,
              plateY: 364,
            },
            {
              base: "M149 324 L166 314",
              core: "M151 323 L167 313",
              plateX: 162,
              plateY: 308,
            },
            {
              base: "M149 196 L166 206",
              core: "M151 197 L167 207",
              plateX: 162,
              plateY: 202,
            },
          ].map((bridge, index) => (
            <g key={`token-bridge-${index}`}>
              <path
                d={bridge.base}
                fill="none"
                stroke="#071421"
                strokeWidth="8"
                strokeLinecap="square"
                strokeLinejoin="miter"
                opacity="0.72"
              />

              <path
                d={bridge.base}
                fill="none"
                stroke="#244967"
                strokeWidth="5"
                strokeLinecap="square"
                strokeLinejoin="miter"
                opacity="0.72"
              />

              <path
                d={bridge.core}
                fill="none"
                stroke="#2698ff"
                strokeWidth="2.2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                opacity="0.92"
              />

              <path
                d={bridge.core}
                fill="none"
                stroke="#74ddff"
                strokeWidth="0.8"
                strokeLinecap="square"
                strokeLinejoin="miter"
                opacity="0.88"
              />

              <rect
                x={bridge.plateX}
                y={bridge.plateY}
                width="10"
                height="10"
                rx="1.5"
                fill="#071421"
                stroke="#2f789f"
                strokeWidth="1.2"
                opacity="0.96"
              />

              <rect
                x={bridge.plateX + 3}
                y={bridge.plateY + 3}
                width="4"
                height="4"
                rx="0.7"
                fill="#58d4ff"
                opacity="0.88"
              />
            </g>
          ))}
        </g>

        {/* Mechanical contact points around the token cradle */}
        {[
          [260, 128],
          [374, 194],
          [374, 326],
          [260, 392],
          [146, 326],
          [146, 194],
        ].map(([x, y], index) => (
          <g key={`cradle-contact-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="5.5"
              fill="#071421"
              stroke="#2e708f"
              strokeWidth="1.2"
              opacity="0.96"
            />

            <circle
              cx={x}
              cy={y}
              r="2"
              fill="#58d4ff"
              opacity="0.82"
            />
          </g>
        ))}

        {/* Token ambient field */}
        <circle
          cx="260"
          cy="260"
          r="140"
          fill="url(#zera-token-highlight)"
        />

        {/* Token depth shadow */}
        <ellipse
          cx="260"
          cy="273"
          rx="121"
          ry="117"
          fill="#010812"
          opacity="0.34"
          filter="url(#zera-token-shadow)"
        />

        {/* Token outer body */}
        <circle
          cx="260"
          cy="260"
          r="122"
          fill="url(#zera-token-rim-dark)"
          className="stroke-border-default"
          strokeWidth="2.4"
          filter="url(#zera-token-shadow)"
        />

        <circle
          cx="260"
          cy="260"
          r="115"
          fill="none"
          stroke="url(#zera-token-metal)"
          strokeWidth="3.2"
        />

        <circle
          cx="260"
          cy="260"
          r="109"
          fill="#030b15"
          className="stroke-brand-secondary/25"
          strokeWidth="1.5"
        />

        {/* Outer cardinal hardware marks */}
        {[
          { x1: 260, y1: 130, x2: 260, y2: 151 },
          { x1: 369, y1: 260, x2: 390, y2: 260 },
          { x1: 260, y1: 369, x2: 260, y2: 390 },
          { x1: 130, y1: 260, x2: 151, y2: 260 },
        ].map((mark, index) => (
          <g key={`cardinal-${index}`}>
            <line
              {...mark}
              stroke="#4ed3ff"
              strokeWidth="5"
              strokeLinecap="square"
            />

            <line
              {...mark}
              stroke="#1677ff"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
          </g>
        ))}

        {/* Segmented blue utility rings */}
        <circle
          cx="260"
          cy="260"
          r="103"
          fill="none"
          stroke="#0b6cff"
          strokeWidth="7"
          strokeDasharray="307 16 307 16"
          strokeDashoffset="0"
          strokeLinecap="butt"
          transform="rotate(-38 260 260)"
        />

        <circle
          cx="260"
          cy="260"
          r="93"
          fill="none"
          stroke="#13baf2"
          strokeWidth="5"
          strokeDasharray="279 13 279 13"
          strokeDashoffset="0"
          strokeLinecap="butt"
          transform="rotate(18 260 260)"
          opacity="0.92"
        />

        {/* Technical index ring */}
        {Array.from({ length: 48 }, (_, index) => {
          const angle = (Math.PI * 2 * index) / 48 - Math.PI / 2;
          const major = index % 12 === 0;
          const inner = major ? 96 : 98;
          const outer = major ? 105 : 103;

          return (
            <line
              key={`tick-${index}`}
              x1={260 + inner * Math.cos(angle)}
              y1={260 + inner * Math.sin(angle)}
              x2={260 + outer * Math.cos(angle)}
              y2={260 + outer * Math.sin(angle)}
              stroke={major ? "#58d4ff" : "#1687f7"}
              strokeWidth={major ? 2.2 : 1}
              opacity={major ? 1 : 0.75}
            />
          );
        })}

        {/* Recessed token face */}
        <circle
          cx="260"
          cy="260"
          r="87"
          fill="url(#zera-token-face)"
          stroke="#20466a"
          strokeWidth="1.5"
        />

        <g clipPath="url(#zera-token-face-clip)">
          <path
            d="M185 225 C230 194 298 190 343 212"
            fill="none"
            stroke="#8cdbff"
            strokeWidth="1.2"
            opacity="0.12"
          />

          <path
            d="M178 289 C228 318 306 323 350 292"
            fill="none"
            stroke="#0e78ff"
            strokeWidth="1"
            opacity="0.13"
          />

          <ellipse
            cx="232"
            cy="216"
            rx="63"
            ry="29"
            fill="#89dcff"
            opacity="0.035"
            transform="rotate(-15 232 216)"
          />
        </g>

        <text
          x="260"
          y="190"
          textAnchor="middle"
          fill="#57d6ff"
          className="text-[13px] font-semibold tracking-[0.42em]"
        >
          ZERA
        </text>

        <image
          href="/brand/logo-z.svg"
          x="169"
          y="212"
          width="182"
          height="92"
          preserveAspectRatio="xMidYMid meet"
        />

        <text
          x="260"
          y="335"
          textAnchor="middle"
          fill="#55c9f5"
          className="text-[7px] font-medium tracking-[0.14em]"
        >
          FAST · SECURE · BORDERLESS
        </text>

        {/* Moving token power traces */}
        <circle
          cx="260"
          cy="260"
          r="118"
          fill="none"
          stroke="#66dcff"
          strokeWidth="1.8"
          strokeDasharray="30 655"
          strokeLinecap="square"
          filter="url(#zera-controlled-glow)"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 260 260"
            to="360 260 260"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="260"
          cy="260"
          r="97"
          fill="none"
          stroke="#147dff"
          strokeWidth="1.2"
          strokeDasharray="16 537"
          strokeLinecap="square"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 260 260"
            to="0 260 260"
            dur="16s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <p className="absolute inset-x-0 bottom-1 text-center text-[0.6rem] font-medium uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.66rem]">
        Fixed supply · Ecosystem utility · Built for participation
      </p>
    </div>
  );
}

export default function ZeraPage() {
  return (
    <>
      <AmbientBackground />
      <SiteHeader />

      <main className="relative overflow-hidden">
        <Section
          spacing="none"
          className="flex min-h-[90vh] items-center pt-32 sm:pt-36"
        >
          <Container>
            <div className="grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-secondary">
                  ZERA ecosystem
                </p>

                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Utility designed around real participation.
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground-secondary sm:text-xl">
                  ZERA reduces eligible costs, rewards meaningful activity,
                  powers intelligent services, and unlocks more across the
                  Zephyon ecosystem.
                </p>

                <p className="mt-5 max-w-2xl leading-7 text-foreground-muted">
                  ZephiPay remains useful without ZERA. ZERA makes
                  participation more rewarding, capable, and connected.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="#utility"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                  >
                    Explore utility
                  </Button>

                  <Button
                    href="#tokenomics"
                    variant="outline"
                    size="lg"
                  >
                    View tokenomics
                  </Button>
                </div>
              </div>

              <ZeraUtilityVisual />
            </div>
          </Container>
        </Section>

        <Section
          id="utility"
          className="scroll-mt-28"
        >
          <Container>
            <div className="border-t border-border-subtle pt-20">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Why hold ZERA?
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  A token built to do more than sit in a wallet.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Every utility is designed to connect ZERA to real activity
                  across ZephiPay and the wider Zephyon ecosystem.
                </p>
              </div>

              <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
                {coreUtility.map((item) => (
                  <article
                    key={item.number}
                    className="group min-h-[21rem] bg-background p-7 transition-colors duration-200 hover:bg-surface-secondary"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                        {item.number}
                      </p>

                      <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-foreground-muted transition-all duration-200 group-hover:border-brand-primary/35 group-hover:text-brand-secondary">
                        {item.benefit}
                      </span>
                    </div>

                    <h3 className="mt-14 text-2xl font-semibold tracking-[-0.035em]">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-foreground-secondary">
                      {item.description}
                    </p>

                    <div className="mt-8 h-px w-12 bg-brand-primary/50 transition-all duration-300 group-hover:w-24" />
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="border-t border-border-subtle pt-20">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  Built for participation
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Created with people, creators, businesses, and AI in mind.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Different participants need different benefits. ZERA brings
                  those needs together through one connected utility layer.
                </p>
              </div>

              <div className="mt-14 grid gap-5 lg:grid-cols-2">
                {participantUtility.map((participant) => (
                  <article
                    key={participant.audience}
                    className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-9"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                      {participant.eyebrow}
                    </p>

                    <div className="mt-5 flex items-baseline justify-between gap-6">
                      <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                        {participant.audience}
                      </h3>

                      <span className="text-xs uppercase tracking-[0.16em] text-foreground-muted">
                        ZERA utility
                      </span>
                    </div>

                    <p className="mt-5 text-xl font-medium tracking-[-0.025em]">
                      {participant.headline}
                    </p>

                    <p className="mt-4 leading-7 text-foreground-secondary">
                      {participant.description}
                    </p>

                    <div className="mt-7 grid gap-3">
                      {participant.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-background/55 px-4 py-3"
                        >
                          <span className="text-brand-secondary">
                            <CheckIcon />
                          </span>

                          <span className="text-sm text-foreground-secondary">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-10 lg:p-14">
              <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-primary/10 blur-[90px]" />

              <div className="relative">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                      Subscription-or-Stake
                    </p>

                    <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                      Choose how you unlock more.
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                      Eligible premium capabilities can be accessed in one of
                      two ways: pay a recurring subscription or stake ZERA.
                    </p>

                    <p className="mt-5 leading-7 text-foreground-muted">
                      The model gives participants a familiar monthly option
                      while allowing committed ecosystem members to reduce
                      recurring operating costs through long-term alignment.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border-subtle bg-background/55 p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                          Subscribe
                        </p>

                        <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                          Pay a recurring fee for eligible premium tools and
                          services.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/5 p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                          Stake ZERA
                        </p>

                        <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                          Commit ZERA to unlock eligible capabilities while
                          reducing recurring costs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {subscriptionOrStake.map((item, index) => (
                      <article
                        key={item.title}
                        className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                            0{index + 1}
                          </span>

                          <span className="rounded-full border border-border-default px-3 py-1 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-foreground-muted">
                            Premium access
                          </span>
                        </div>

                        <h3 className="mt-8 text-xl font-semibold">
                          {item.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-12 rounded-[2.5rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  AI agent utility
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Spend less time organizing. More time moving forward.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Deterministic receipts provide a dependable financial
                  foundation. ZERA can unlock advanced AI-assisted tools that
                  help people and creators turn those records into useful
                  organization, insights, and automation.
                </p>

                <p className="mt-5 leading-7 text-foreground-muted">
                  The receipt remains a core ZephiPay capability. ZERA expands
                  what intelligent agents can do with that trusted record.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {aiWorkflows.map((workflow, index) => (
                  <article
                    key={workflow.title}
                    className="rounded-[1.7rem] border border-border-subtle bg-background/60 p-6"
                  >
                    <span className="text-xs font-medium tracking-[0.18em] text-brand-secondary">
                      0{index + 1}
                    </span>

                    <h3 className="mt-7 text-xl font-semibold">
                      {workflow.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                      {workflow.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="border-t border-border-subtle pt-20">
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="max-w-xl">
                  <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                    Ecosystem growth
                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                    Utility grows through participation.
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                    ZERA is not designed to create an ecosystem by itself. It
                    is designed to reward and strengthen the activity already
                    happening within one.
                  </p>
                </div>

                <div className="grid gap-3">
                  {flywheel.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-5 rounded-2xl border border-border-subtle bg-surface-glass px-5 py-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-xs font-semibold text-brand-secondary">
                        {index + 1}
                      </span>

                      <span className="text-base font-medium">
                        {step}
                      </span>

                      {index < flywheel.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="ml-auto text-foreground-muted"
                        >
                          ↓
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section
          id="tokenomics"
          className="scroll-mt-28"
        >
          <Container>
            <div className="border-t border-border-subtle pt-20">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                    Tokenomics
                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                    A fixed supply designed for the long term.
                  </h2>

                  <div className="mt-10 rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                      200M
                    </p>

                    <p className="mt-4 text-sm uppercase tracking-[0.18em] text-foreground-muted">
                      Maximum ZERA supply
                    </p>

                    <div className="mt-8 border-t border-border-subtle pt-7">
                      <p className="text-xl font-semibold">
                        Fixed forever.
                      </p>

                      <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                        No future minting beyond the established maximum
                        supply.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-border-default bg-border-subtle">
                  {allocations.map((allocation) => (
                    <div
                      key={allocation.label}
                      className="grid gap-4 bg-background p-6 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:px-7"
                    >
                      <div>
                        <p className="font-semibold">
                          {allocation.label}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                          {allocation.purpose}
                        </p>
                      </div>

                      <p className="text-sm font-medium text-foreground-secondary">
                        {allocation.amount}
                      </p>

                      <p className="text-2xl font-semibold tracking-[-0.035em] text-brand-secondary">
                        {allocation.percentage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border-default bg-surface-glass p-8 text-center shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-x-[15%] top-0 h-40 rounded-full bg-brand-primary/10 blur-[70px]" />

              <div className="relative mx-auto max-w-3xl">
                <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
                  The ZERA ecosystem
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  Real utility. Connected to real participation.
                </h2>

                <p className="mt-6 text-lg leading-8 text-foreground-secondary">
                  Every person rewarded, every creator supported, every
                  business served, and every intelligent transaction expands
                  what ZERA can make possible.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    href={siteConfig.betaUrl}
                    external
                    size="lg"
                  >
                    Join the beta
                  </Button>

                  <Button
                    href="/creators"
                    variant="outline"
                    size="lg"
                  >
                    Explore ZephiPay
                  </Button>

                  <Button
                    href="/developers"
                    variant="outline"
                    size="lg"
                  >
                    Build on Zephyon
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
