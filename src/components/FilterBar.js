import { useState } from "react";
import { Box, InputBase, Typography, Paper } from "@mui/material";
import { ChevronDown, Plus } from "lucide-react";
import { ReactComponent as FolderIcon } from "../assets/icons/folder-icon.svg";
import { ReactComponent as MailIcon } from "../assets/icons/message-icon.svg";
import { ReactComponent as ActionsIcon } from "../assets/icons/upward-arrow-icon.svg";
import { ReactComponent as SendIcon } from "../assets/icons/share-icon.svg";
import { ReactComponent as SlidersIcon } from "../assets/icons/filter-lines-icon.svg";

const FONT = '"Optimistic 95", system-ui, sans-serif';
const BORDER = "1px solid #c6c8caff";
const TEXT = "#000000";
const MUTED = "#424345";
const BLUE = "rgb(10, 120, 190)";



/* ── Filter pill items config ── */
const filterItems = [
  { id: "allads", icon: FolderIcon, label: "All ads" },
  { id: "actions", icon: ActionsIcon, label: "Actions" },
  { id: "delivery", icon: MailIcon, label: "Had delivery" },
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
            px: "14px", height: "38px", border: BORDER, borderRadius: "4px",
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
