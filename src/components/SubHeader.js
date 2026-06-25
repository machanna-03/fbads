import { useState } from "react";
import DateRangePicker, { PRESETS, formatDateShort, getPresetRange } from "./DateRangePicker";
import { Box, Typography, Paper } from "@mui/material";
import {
  Plus, Copy, Pencil, FlaskConical, ChevronDown,
  Columns3, AlignJustify, BarChart2, Download, Maximize2, CalendarDays, LineChart
} from "lucide-react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ReactComponent as CampaignIcon } from "../assets/icons/campaign-folder-icon.svg";
import { ReactComponent as AdSetsIcon } from "../assets/icons/menu-icon.svg";
import { ReactComponent as AdsIcon } from "../assets/icons/date-icon.svg";
import { ReactComponent as CopyIcon } from "../assets/icons/copy-icon.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit-icon.svg";
import { ReactComponent as FilterIcon } from "../assets/icons/filter-icon.svg";
import { ReactComponent as DownArrowDotIcon } from "../assets/icons/down-arrow-dot-icon.svg";
import { ReactComponent as ColumnIcon } from "../assets/icons/column-icon.svg";
import { ReactComponent as DownloadIcon } from "../assets/icons/download-icon.svg";
import { ReactComponent as GraphIcon } from "../assets/icons/graph-icon.svg";

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
          <DownArrowDotIcon width={16} height={16} color={color} />
        </Box>
      )}

    </Box>
  );
}


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
      {Icon && <Icon color={active ? "rgb(10, 120, 190)" : "rgb(28, 43, 51)"} />}
      <Txt sx={{ fontFamily: '"Optimistic 95", system-ui, sans-serif', fontSize: "16px", fontWeight: 700, lineHeight: "20px", color: active ? "rgb(10, 120, 190)" : "rgb(28, 43, 51)", whiteSpace: "nowrap", textAlign: "left" }}>
        {label}
      </Txt>
    </Paper>
  );
}

export default function SubHeader({ activeView = "campaigns", onViewChange }) {
  const [activeTab, setActiveTab] = useState(activeView);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [preset, setPreset] = useState("today");
  const [dateRange, setDateRange] = useState(() => {
    const range = getPresetRange("today");
    return range || { start: new Date(), end: new Date() };
  });

  const handleTab = (tab) => {
    setActiveTab(tab);
    onViewChange && onViewChange(tab);
  };

  const isSingleDay = dateRange.start && dateRange.end &&
    dateRange.start.getFullYear() === dateRange.end.getFullYear() &&
    dateRange.start.getMonth() === dateRange.end.getMonth() &&
    dateRange.start.getDate() === dateRange.end.getDate();

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
            icon={({ color }) => <CampaignIcon color={color} width={22} height={22} />}
            active={activeTab === "campaigns"}
            onClick={() => handleTab("campaigns")}
          />


          <TabItem
            label="Ad sets"
            icon={() => <AdSetsIcon width={22} height={22} />}
            active={activeTab === "adsets"}
            onClick={() => handleTab("adsets")}
          />

          <TabItem
            label="Ads"
            icon={({ color }) => <AdsIcon color={color} width={22} height={22} />}
            active={activeTab === "ads"}
            onClick={() => handleTab("ads")}
          />

          <Box sx={{ flex: 1 }} />

          {/* Date range picker */}
          <Box
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              setDatePickerOpen(true);
            }}
            sx={{
              display: "flex", alignItems: "center", gap: "6px",
              px: "10px", height: "39px", border: BORDER, borderRadius: "4px",
              backgroundColor: "transparent",
              cursor: "pointer", flexShrink: 0,

              "&:hover": { backgroundColor: "#F0F2F5" },
            }}
          >
            <CalendarDays size={18} color="#1c1c1cff" />
            <Txt sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", color: "rgb(28, 43, 51)", whiteSpace: "nowrap" }}>
              {PRESETS.find(p => p.id === preset)?.label || "Custom"}: {formatDateShort(dateRange.start)}{!isSingleDay && ` - ${formatDateShort(dateRange.end)}`}
            </Txt>
            <ArrowDropDownIcon sx={{ fontSize: "28px", color: "rgb(28, 43, 51)" }} />
          </Box>

          <DateRangePicker
            open={datePickerOpen}
            anchorEl={anchorEl}
            onClose={() => {
              setDatePickerOpen(false);
              setAnchorEl(null);
            }}
            initialStartDate={dateRange.start}
            initialEndDate={dateRange.end}
            initialPreset={preset}
            onApply={(range) => {
              setDateRange({ start: range.start, end: range.end });
              setPreset(range.preset);
            }}
          />
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

          <ActionBtn icon={CopyIcon} label="Duplicate" color="rgba(28, 43, 51, 0.6)" />
          <ActionBtn icon={EditIcon} label="Edit" color="rgba(28, 43, 51, 0.6)" />

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
            <FilterIcon size={14} color="rgb(28, 43, 51)" />
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
            <DownArrowDotIcon size={14} color="rgb(28, 43, 51)" />
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* Right Controls */}
          <ActionBtn icon={ColumnIcon} label="Columns" split />
          <ActionBtn icon={AlignJustify} fontWeight={800} label="Breakdown" split />
          <ActionBtn icon={CopyIcon} split />
          <ActionBtn icon={DownloadIcon} split />
          <Box
            sx={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "32px", height: "36px", border: BORDER, borderRadius: "6px",
              cursor: "pointer", flexShrink: 0,
              "&:hover": { backgroundColor: "#F0F2F5" },
            }}
          >
            <GraphIcon color={TEXT} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}