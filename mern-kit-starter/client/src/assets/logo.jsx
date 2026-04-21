export default <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-16 h-16"
>
    <defs>
        <linearGradient id="darkLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#6EE7B7", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="messageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#F472B6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#8B5CF6", stopOpacity: 1 }} />
        </linearGradient>
    </defs>
    <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="16"
        ry="16"
        fill="url(#darkLightGradient)"
        stroke="#E5E7EB"
        strokeWidth="1"
    />
    <path
        d="M45 38a4 4 0 0 1-4 4H20l-6 6V22a4 4 0 0 1 4-4h27a4 4 0 0 1 4 4z"
        fill="white"
    />
    <line
        x1="24"
        y1="30"
        x2="40"
        y2="30"
        stroke="url(#messageGradient)"
        strokeWidth="3"
        strokeLinecap="round"
    />
    <line
        x1="24"
        y1="38"
        x2="34"
        y2="38"
        stroke="url(#messageGradient)"
        strokeWidth="3"
        strokeLinecap="round"
    />
</svg>