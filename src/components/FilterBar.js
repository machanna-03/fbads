import { Box, InputBase, Typography } from "@mui/material";
import { Search, LayoutGrid, ChevronDown, Plus, SlidersHorizontal } from "lucide-react";

/* ─── EXACT Meta computed CSS tokens ─── */
const FONT   = '-apple-system, "system-ui", Arial, sans-serif';
const BORDER = "1px solid rgba(28,43,51,0.2)";
const TEXT   = "#1c2b33";
const MUTED  = "rgba(28,43,51,0.6)";
const BLUE   = "#1877f2";

function Txt({ children, sx = {} }) {
  return (
    <Typography
      sx={{ fontSize: "13px", fontWeight: 400, fontFamily: FONT, lineHeight: "16px", color: TEXT, ...sx }}
    >
      {children}
    </Typography>
  );
}

function OutlinedBtn({ children, sx = {} }) {
  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: "5px",
      height: "30px", px: "10px", border: BORDER, borderRadius: "4px",
      backgroundColor: "#fff", cursor: "pointer", userSelect: "none",
      flexShrink: 0,
      "&:hover": { backgroundColor: "rgba(0,0,0,0.03)" },
      ...sx,
    }}>
      {children}
    </Box>
  );
}

export default function FilterBar() {
  return (
    <Box sx={{ backgroundColor: "#fff", borderBottom: BORDER }}>

      {/* ── Row 1 : All ads pill | + See more | → Create a view | ⚙ ── */}
      <Box sx={{
        display: "flex", alignItems: "center",
        px: "12px", minHeight: "44px", gap: "4px",
      }}>

        {/* Active "All ads" filled blue pill */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: "6px",
          px: "10px", height: "30px", borderRadius: "4px",
          backgroundColor: BLUE, cursor: "pointer", userSelect: "none",
          flexShrink: 0,
          "&:hover": { backgroundColor: "#166fe5" },
        }}>
          <LayoutGrid size={13} color="#fff" />
          <Txt sx={{ color: "#fff", fontWeight: 600 }}>All ads</Txt>
          <ChevronDown size={13} color="#fff" />
        </Box>

        {/* "+ See more" */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: "4px",
          px: "8px", height: "30px", borderRadius: "4px",
          cursor: "pointer", userSelect: "none",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
        }}>
          <Plus size={13} color={TEXT} />
          <Txt>See more</Txt>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Create a view */}
        <OutlinedBtn><Txt>Create a view</Txt></OutlinedBtn>

        {/* Sliders icon */}
        <OutlinedBtn sx={{ width: "30px", px: 0, justifyContent: "center" }}>
          <SlidersHorizontal size={14} color={TEXT} />
        </OutlinedBtn>
      </Box>

      {/* ── Row 2 : Search bar ── */}
      <Box sx={{ px: "12px", pb: "8px" }}>
        <Box sx={{
          display: "flex", alignItems: "center", gap: "8px",
          border: BORDER, borderRadius: "4px",
          px: "10px", height: "34px", backgroundColor: "#fff",
          "&:focus-within": {
            borderColor: BLUE,
            boxShadow: "0 0 0 2px rgba(24,119,242,0.15)",
          },
        }}>
          <Search size={14} color={MUTED} />
          <InputBase
            placeholder="Search to filter by: name, ID or metrics"
            fullWidth
            sx={{
              fontSize: "13px",
              fontFamily: FONT,
              color: TEXT,
              "& input::placeholder": { color: MUTED, opacity: 1 },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
