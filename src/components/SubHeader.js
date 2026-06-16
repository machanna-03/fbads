import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Plus, Copy, Pencil, FlaskConical, ChevronDown,
  Columns3, AlignJustify, BarChart2, Download, Maximize2, CalendarDays, LineChart
} from "lucide-react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FONT = '"Optimistic 95", system-ui, sans-serif';
// eslint-disable-next-line no-unused-vars
const FONT_ROBOTO = 'Roboto, Arial, sans-serif';
const BORDER = "1px solid #a6aab0ff";
const TEXT = "#1c2b33";
const MUTED = "#4a4c50ff";
const BLUE = "#0b78be";
const GREEN = "#006b4e";

function Txt({ children, sx = {} }) {
  return (
    <Typography sx={{ fontSize: "13px", fontFamily: FONT, color: TEXT, ...sx }}>
      {children}
    </Typography>
  );
}

const SolidArrowDown = ({ color = "#1c2b33" }) => (
  <svg width="9" height="6" viewBox="0 0 7 5" fill={color} style={{ marginLeft: "4px" }}>
    <path d="M0 0h7L3.5 5z" />
  </svg>
);

function ActionBtn({ icon: Icon, label, split = false, iconSize = 14, color = "rgb(28, 43, 51)" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "36px", flexShrink: 0 }}>
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: "10px",
          height: "100%", px: label ? "10px" : "9px",
          border: BORDER,

          borderRadius: split ? "6px 0 0 6px" : "6px",
          borderRight: split ? "none" : BORDER,
          backgroundColor: "#fff", cursor: "pointer",
          transition: "background-color 0.15s",
          "&:hover": { backgroundColor: "#F0F2F5" },
        }}
      >
        {Icon && <Icon size={iconSize} color={color} />}
        {label && (
          <Txt
            sx={{
              color: color,
              fontWeight: 500,
              fontSize: "14px",
              fontStyle: "normal",
              lineHeight: "20px",
            }}
          >
            {label}
          </Txt>
        )}
      </Box>
      {split && (
        <Box
          sx={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "24px", height: "100%", border: BORDER, borderRadius: "0 6px 6px 0",
            backgroundColor: "#fff", cursor: "pointer",
            "&:hover": { backgroundColor: "#F0F2F5" },
          }}
        >
          <SolidArrowDown size={12} color={color} />
        </Box>
      )}
    </Box>
  );
}

/* ── Campaign / Ad sets / Ads tab icons ── */
/* Campaigns: folder with triangle flag inside */
const CampaignIcon = ({ color = "#0b78be" }) => (
  <svg width="20" height="24" viewBox="0 0 18 18" fill="none">
    <path
      d="M2 7C2 6.17 2.67 5.5 3.5 5.5H7.5L9 7H15.5C16.33 7 17 7.67 17 8.5v6c0 .83-.67 1.5-1.5 1.5h-13C2.67 16 2 15.33 2 14.5V7z"
      fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.3"
    />
    <path d="M7 10.5l2.5-2 2.5 2" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Ad sets: 2×2 grid */
const AdSetsIcon = ({ color = "#1c2b33" }) => (
  <svg width="20" height="24" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.35" />
    <rect x="9" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.35" />
    <rect x="1" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.35" />
    <rect x="9" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.35" />
  </svg>
);

/* Ads: browser/window frame icon */
const AdsIcon = ({ color = "#1c2b33" }) => (
  <svg width="20" height="24" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke={color} strokeWidth="1.35" />
    <path d="M1.5 6H14.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <rect x="3.5" y="3.5" width="2" height="1.5" rx="0.5" fill={color} />
  </svg>
);

function TabItem({ icon: Icon, label, active, onClick }) {
  return (
    <Paper
      onClick={onClick}
      elevation={active ? 3 : 0}
      sx={{
        display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px",
        px: "20px",
        minWidth: "180px",
        height: "calc(100% + 1px)",
        cursor: "pointer",
        position: "relative",
        backgroundColor: active ? "#fff" : "transparent",
        borderRadius: "8px 8px 0 0",
        borderBottom: active ? '1px solid #c1c5ccff' : 'none',
        marginBottom: active ? "-1px" : "0",
        boxShadow: "0px -2px 8px rgba(0,0,0,0.10), 2px 0 4px rgba(0,0,0,0.06), -2px 0 4px rgba(0,0,0,0.06)",
        "&:hover": {
          backgroundColor: active ? "#fff" : "rgba(0,0,0,0.04)",
        },
        userSelect: "none", flexShrink: 0,
      }}
    >
      {Icon && <Icon color={active ? BLUE : "#1c2b33"} />}
      <Txt sx={{ fontWeight: 700, color: active ? BLUE : "#1c2b33", fontSize: "16px", whiteSpace: "nowrap", textAlign: "left" }}>
        {label}
      </Txt>
    </Paper>
  );
}

export default function SubHeader({ activeView = "campaigns", onViewChange }) {
  const [activeTab, setActiveTab] = useState(activeView);

  const handleTab = (tab) => {
    setActiveTab(tab);
    onViewChange && onViewChange(tab);
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#f4f8f9ff", flexShrink: 0, pt: 1 }}>

        {/* ── Tab Row ── */}
        <Box
          sx={{
            display: "flex", alignItems: "flex-end",
            height: "42px",

            backgroundColor: "#f3f6f9ff",
            px: "24px",
            gap: "10px",

          }}
        >
          <TabItem
            label="Campaigns"
            icon={({ color }) => <CampaignIcon color={color} />}
            active={activeTab === "campaigns"}
            onClick={() => handleTab("campaigns")}
          />


          <TabItem
            label="Ad sets"
            icon={({ color }) => <AdSetsIcon color={color} />}
            active={activeTab === "adsets"}
            onClick={() => handleTab("adsets")}
          />

          <TabItem
            label="Ads"
            icon={({ color }) => <AdsIcon color={color} />}
            active={activeTab === "ads"}
            onClick={() => handleTab("ads")}
          />

          <Box sx={{ flex: 1 }} />

          {/* Date range picker */}
          <Box
            sx={{
              display: "flex", alignItems: "center", gap: "6px",
              px: "10px", height: "39px", border: BORDER, borderRadius: "4px",
              backgroundColor: "transparent",
              cursor: "pointer", flexShrink: 0,

              "&:hover": { backgroundColor: "#F0F2F5" },
            }}
          >
            <CalendarDays size={20} color={MUTED} />
            <Txt sx={{ color: TEXT, fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>
              Last 30 days: 3 May 2026 - 1 Jun 2026
            </Txt>
            <ArrowDropDownIcon size={11} color={MUTED} />
          </Box>
        </Box>

      </Box>
      {/* ── Action Toolbar Row ── */}
      <Box sx={{ backgroundColor: "#f3f6f8", }}>
        <Paper
          elevation={1}
          sx={{
            display: "flex", alignItems: "center",
            mx: "6px", height: "48px", gap: "6px",
            px: '10px',
            backgroundColor: "#fff",
            borderRadius: '4px',
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* Create (green) */}
          <Box
            sx={{
              display: "flex", alignItems: "center", gap: "6px",
              height: "36px", px: "14px", borderRadius: "4px",
              backgroundColor: GREEN, cursor: "pointer", flexShrink: 0,
              transition: "background-color 0.15s",
              "&:hover": { backgroundColor: "#005c40" },
            }}
          >
            <Plus size={14} color="#fff" strokeWidth={2.5} />
            <Txt sx={{ color: "#fff", fontWeight: 500, fontSize: "14px", fontStyle: "normal", lineHeight: "20px" }}>Create</Txt>
          </Box>

          <ActionBtn icon={Copy} label="Duplicate" color="rgba(28, 43, 51, 0.6)" />
          <ActionBtn icon={Pencil} label="Edit" color="rgba(28, 43, 51, 0.6)" />

          <ActionBtn icon={LineChart} label="Analyse" />

          {/* A/B test */}
          <Box
            sx={{
              display: "flex", alignItems: "center", gap: "6px",
              height: "32px", px: "10px", border: BORDER, borderRadius: "6px",
              backgroundColor: "#fff", cursor: "pointer", flexShrink: 0,
              "&:hover": { backgroundColor: "#F0F2F5" },
            }}
          >
            <FlaskConical size={14} color="rgb(28, 43, 51)" />
            <Txt sx={{ color: "rgb(28, 43, 51)", fontWeight: 500, fontSize: "14px", fontStyle: "normal", lineHeight: "20px" }}>A/B test</Txt>
          </Box>

          {/* More */}
          <Box
            sx={{
              display: "flex", alignItems: "center", gap: "3px",
              height: "32px", px: "10px", border: BORDER, borderRadius: "6px",
              cursor: "pointer", flexShrink: 0,
              "&:hover": { backgroundColor: "#F0F2F5" },
            }}
          >
            <Txt sx={{ color: "rgb(28, 43, 51)", fontWeight: 500, fontSize: "14px", fontStyle: "normal", lineHeight: "20px" }}>More</Txt>
            <SolidArrowDown size={14} color="rgb(28, 43, 51)" />
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* Right Controls */}
          <ActionBtn icon={Columns3} label="Columns: Performance" split />
          <ActionBtn icon={AlignJustify} label="Breakdown" split />
          <ActionBtn icon={BarChart2} split />
          <ActionBtn icon={Download} split />
          <Box
            sx={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "32px", height: "36px", border: BORDER, borderRadius: "6px",
              cursor: "pointer", flexShrink: 0,
              "&:hover": { backgroundColor: "#F0F2F5" },
            }}
          >
            <Maximize2 size={14} color={TEXT} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}