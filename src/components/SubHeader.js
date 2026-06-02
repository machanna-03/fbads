import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Plus, Copy, Pencil, Sparkles, FlaskConical,
  ChevronDown, Columns3, AlignJustify, BarChart2,
  Download, Maximize2, CalendarDays,
} from "lucide-react";

const FONT     = '-apple-system, "system-ui", Arial, sans-serif';
const BORDER   = "1px solid rgba(28,43,51,0.2)";
const BORDER_BTN = "1px solid rgba(28,43,51,0.3)";
const TEXT     = "#1c2b33";
const TEXT_MUTED = "rgba(28,43,51,0.6)";
const BLUE     = "#1877f2";
const GREEN    = "#006b4e";  /* exact Meta Create-button green */

function Txt({ children, sx = {} }) {
  return (
    <Typography sx={{ fontSize: "13px", fontFamily: FONT, lineHeight: 1, color: TEXT, ...sx }}>
      {children}
    </Typography>
  );
}

/* Outlined button used in action toolbar */
function ActionBtn({ icon: Icon, label, iconSize = 14, split = false, sx = {} }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "32px", flexShrink: 0, ...sx }}>
      <Box sx={{
        display: "flex", alignItems: "center", gap: "5px",
        height: "100%", px: label ? "10px" : "8px",
        border: BORDER_BTN, borderRadius: split ? "6px 0 0 6px" : "6px",
        backgroundColor: "#fff", cursor: "pointer",
        "&:hover": { backgroundColor: "#F0F2F5" },
        borderRight: split ? "none" : BORDER_BTN,
      }}>
        {Icon && <Icon size={iconSize} color={TEXT_MUTED} />}
        {label && <Txt sx={{ color: TEXT_MUTED }}>{label}</Txt>}
      </Box>
      {split && (
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "24px", height: "100%", border: BORDER_BTN, borderRadius: "0 6px 6px 0",
          backgroundColor: "#fff", cursor: "pointer",
          "&:hover": { backgroundColor: "#F0F2F5" },
        }}>
          <ChevronDown size={12} color={TEXT_MUTED} />
        </Box>
      )}
    </Box>
  );
}

/* Tab item for Campaigns / Ad sets / Ads */
function TabItem({ icon: Icon, label, active, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex", alignItems: "center", gap: "6px",
        px: "16px", height: "100%", cursor: "pointer",
        borderBottom: active ? `2px solid ${BLUE}` : "2px solid transparent",
        color: active ? BLUE : TEXT_MUTED,
        "&:hover": { backgroundColor: "#F0F2F5" },
        userSelect: "none", flexShrink: 0,
      }}
    >
      {Icon && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Icon size={15} color={active ? BLUE : TEXT_MUTED} />
        </Box>
      )}
      <Txt sx={{ fontWeight: active ? 600 : 400, color: active ? BLUE : TEXT_MUTED, fontSize: "14px" }}>
        {label}
      </Txt>
    </Box>
  );
}

/* Tab icon: small grid square */
const GridIcon = ({ color = TEXT_MUTED }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="1" width="5.5" height="5.5" rx="0.8" stroke={color} strokeWidth="1.3" />
    <rect x="8.5" y="1" width="5.5" height="5.5" rx="0.8" stroke={color} strokeWidth="1.3" />
    <rect x="1" y="8.5" width="5.5" height="5.5" rx="0.8" stroke={color} strokeWidth="1.3" />
    <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.8" stroke={color} strokeWidth="1.3" />
  </svg>
);
const SquareIcon = ({ color = TEXT_MUTED }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" stroke={color} strokeWidth="1.3" />
  </svg>
);

export default function SubHeader({ activeView = "campaigns", onViewChange }) {
  const [activeTab, setActiveTab] = useState(activeView);

  const handleTab = (tab) => {
    setActiveTab(tab);
    onViewChange && onViewChange(tab);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", borderBottom: BORDER }}>

      {/* ── Tab Row ── */}
      <Box sx={{ display: "flex", alignItems: "center", height: "44px", borderBottom: BORDER }}>
        <TabItem
          label="Campaigns"
          icon={() => <GridIcon color={activeTab === "campaigns" ? BLUE : TEXT_MUTED} />}
          active={activeTab === "campaigns"}
          onClick={() => handleTab("campaigns")}
        />
        <TabItem
          label="Ad sets"
          icon={() => <GridIcon color={TEXT_MUTED} />}
          active={activeTab === "adsets"}
          onClick={() => handleTab("adsets")}
        />
        <TabItem
          label="Ads"
          icon={() => <SquareIcon color={TEXT_MUTED} />}
          active={activeTab === "ads"}
          onClick={() => handleTab("ads")}
        />

        <Box sx={{ flex: 1 }} />

        {/* Date range picker */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: "6px",
          px: "12px", height: "30px", border: BORDER_BTN,
          borderRadius: "6px", cursor: "pointer", mr: "12px", flexShrink: 0,
          "&:hover": { backgroundColor: "#F0F2F5" },
        }}>
          <CalendarDays size={14} color={TEXT_MUTED} />
          <Txt sx={{ color: TEXT_MUTED, fontSize: "12px" }}>
            Last 30 days: 2 May 2026 - 31 May 2026
          </Txt>
          <ChevronDown size={12} color={TEXT_MUTED} />
        </Box>
      </Box>

      {/* ── Action Toolbar Row ── */}
      <Box sx={{
        display: "flex", alignItems: "center",
        px: "12px", height: "48px", gap: "6px",
      }}>

        {/* Create button (green) */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: "5px",
          height: "32px", px: "12px", borderRadius: "6px",
          backgroundColor: GREEN, cursor: "pointer", flexShrink: 0,
          "&:hover": { backgroundColor: "#009200" },
        }}>
          <Plus size={14} color="#fff" />
          <Txt sx={{ color: "#fff", fontWeight: 600 }}>Create</Txt>
        </Box>

        {/* Duplicate */}
        <ActionBtn icon={Copy} label="Duplicate" />

        {/* Edit */}
        <ActionBtn icon={Pencil} label="Edit" />

        {/* Analyse icon-only */}
        <ActionBtn icon={Sparkles} iconSize={14} />

        {/* A/B test icon-only */}
        <ActionBtn icon={FlaskConical} iconSize={14} />

        {/* More */}
        <Box sx={{
          display: "flex", alignItems: "center", gap: "4px",
          height: "32px", px: "10px", border: BORDER_BTN,
          borderRadius: "6px", cursor: "pointer", flexShrink: 0,
          "&:hover": { backgroundColor: "#F0F2F5" },
        }}>
          <Txt sx={{ color: TEXT_MUTED }}>More</Txt>
          <ChevronDown size={12} color={TEXT_MUTED} />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Right: Table controls */}
        <ActionBtn icon={Columns3} label="Columns: Performance" split />
        <ActionBtn icon={AlignJustify} label="Breakdown" split />
        <ActionBtn icon={BarChart2} split />
        <ActionBtn icon={Download} split />
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "32px", height: "32px", border: BORDER_BTN,
          borderRadius: "6px", cursor: "pointer", flexShrink: 0,
          "&:hover": { backgroundColor: "#F0F2F5" },
        }}>
          <Maximize2 size={14} color={TEXT_MUTED} />
        </Box>
      </Box>
    </Box>
  );
}