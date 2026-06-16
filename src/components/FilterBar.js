import { useState } from "react";
import { Box, InputBase, Typography, Paper } from "@mui/material";
import { ChevronDown, Plus } from "lucide-react";

const FONT = '"Optimistic 95", system-ui, sans-serif';
const BORDER = "1px solid #DADDE1";
const TEXT = "#000000";
const MUTED = "#424345";
const BLUE = "rgb(10, 120, 190)";

/* ── Inline SVG icons matching the screenshot exactly ── */

const FolderIcon = ({ color = BLUE }) => (
  <svg width="16" height="18" viewBox="0 0 20 20" fill="none">
    <path
      d="M2 6.5C2 5.67 2.67 5 3.5 5H8l2 2h6.5C17.33 7 18 7.67 18 8.5v7c0 .83-.67 1.5-1.5 1.5h-13C2.67 17 2 16.33 2 15.5v-9z"
      fill={color} fillOpacity="0.9"
    />
  </svg>
);

const MailIcon = ({ color = TEXT }) => (
  <svg width="14" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="1.5" stroke={color} strokeWidth="1.4" />
    <path d="M2 7l8 5.5L18 7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ActionsIcon = ({ color = TEXT }) => (
  <svg width="14" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.4" />
    <path d="M8 7.5l5 2.5-5 2.5V7.5z" fill={color} />
  </svg>
);

const SendIcon = ({ color = TEXT }) => (
  <svg width="14" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M4 16V8l6-4 6 4v8" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 10h12" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="10" cy="5" r="1.5" fill={color} />
  </svg>
);

const SlidersIcon = ({ color = MUTED }) => (
  <svg width="18" height="20" viewBox="0 0 20 20" fill="none">
    <line x1="3" y1="6" x2="17" y2="6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="7" cy="6" r="2" fill="#fff" stroke={color} strokeWidth="1.4" />
    <line x1="3" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="13" cy="14" r="2" fill="#fff" stroke={color} strokeWidth="1.4" />
  </svg>
);

/* ── Filter pill items config ── */
const filterItems = [
  { id: "allads", icon: FolderIcon, label: "All ads" },
  { id: "delivery", icon: MailIcon, label: "Had delivery" },
  { id: "actions", icon: ActionsIcon, label: "Actions" },
  { id: "activeads", icon: SendIcon, label: "Active ads" },
];

/* ── Single clickable filter pill ── */
function FilterPill({ icon: IconComp, label, isActive, onClick }) {
  const textColor = isActive ? BLUE : "rgb(28, 43, 51)";
  const borderColor = isActive ? BLUE : "#DADDE1";
  const fontWeight = isActive ? 700 : 400;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex", alignItems: "center", gap: "10px",
        px: "12px", height: "36px", borderRadius: "4px",
        backgroundColor: "#fff",
        border: `1.5px solid ${borderColor}`,
        cursor: "pointer", flexShrink: 0, userSelect: "none",
        transition: "border-color 0.15s ease, background-color 0.15s ease",
        "&:hover": { backgroundColor: "#a8c4f5ff" },
      }}
    >
      <IconComp color={textColor} />
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: fontWeight,
          fontFamily: FONT,
          color: textColor,
          lineHeight: "20px",
          whiteSpace: "nowrap",
          transition: "color 0.15s ease, font-weight 0.15s ease",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function FilterBar() {
  const [searchVal, setSearchVal] = useState("");
  // "All ads" (id: "allads") is active by default
  const [activeFilter, setActiveFilter] = useState("allads");

  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  return (
    <Box sx={{ backgroundColor: "#f1f4f7", flexShrink: 0, py: 0.5 }}>
      {/* ── Row 1: Filter pills ── */}
      <Box sx={{ display: "flex", alignItems: "center", px: "16px", height: "44px", gap: "6px" }}>

        {filterItems.map((item) => (
          <FilterPill
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeFilter === item.id}
            onClick={() => handleFilterClick(item.id)}
          />
        ))}

        {/* See more */}
        <Box
          sx={{
            display: "flex", alignItems: "center", gap: "4px",
            px: "8px", height: "32px", borderRadius: "6px",
            cursor: "pointer", flexShrink: 0,
            "&:hover": { backgroundColor: "#F0F2F5" },
          }}
        >
          <Plus size={14} color="rgb(28, 43, 51)" />
          <Typography sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", fontFamily: FONT, color: "rgb(28, 43, 51)" }}>See more</Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Create a view */}
        <Box
          sx={{
            display: "flex", alignItems: "center", gap: "10px",
            px: "12px", height: "36px", border: BORDER, borderRadius: "4px",
            backgroundColor: "#F0F2F5", cursor: "pointer", flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", fontFamily: FONT, color: "rgb(28, 43, 51)" }}>Create a view</Typography>
        </Box>

        {/* Sliders icon button */}
        <Box
          sx={{
            width: "38px", height: "38px", border: BORDER, borderRadius: "6px",
            backgroundColor: "transparent", cursor: "pointer", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            "&:hover": { backgroundColor: "#F0F2F5" },
          }}
        >
          <SlidersIcon />
        </Box>
      </Box>

      {/* ── Row 2: Full-width search bar ── */}
      <Box sx={{ px: "16px", py: 0.5 }}>
        <Paper
          elevation={2}
          sx={{
            display: "flex", alignItems: "center",
            borderRadius: "6px",
            px: "12px", height: "36px", backgroundColor: "#fff",
            width: "100%",
            /* shadow starts from right half: large positive x-offset */
            boxShadow: "18px 2px 20px 0px #fcf0f0",
            "&:focus-within": {
              boxShadow: "18px 2px 24px 2px #fcf0f0",
            },
          }}
        >
          <InputBase
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Describe what you're looking for"
            fullWidth
            sx={{
              fontSize: "14px", fontWeight: 400, lineHeight: "28px", fontFamily: "Roboto, Arial, sans-serif", color: "rgb(8, 8, 9)",
              "& input::placeholder": { color: MUTED, opacity: 1, fontSize: "14px", fontWeight: 400, lineHeight: "28px", fontFamily: "Roboto, Arial, sans-serif" },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
