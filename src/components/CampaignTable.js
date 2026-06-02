import { Box, Checkbox, Typography } from "@mui/material";
import { ChevronsUpDown, ChevronUp, ChevronDown, Info, Search } from "lucide-react";

const FONT     = '-apple-system, "system-ui", Arial, sans-serif';
const BORDER   = "1px solid rgba(28,43,51,0.15)";
const TEXT     = "#1c2b33";
const TEXT_MUTED = "rgba(28,43,51,0.6)";
const BLUE     = "#0a78be";   /* exact Delivery-column active-sort blue */

function HeaderCell({ label, sortState = "none", info = false, minWidth, flex, right = false }) {
  /* sortState: "none" | "asc" | "desc" | "active-asc" */
  const isActive = sortState === "active-asc";
  const color = isActive ? BLUE : TEXT_MUTED;

  const SortIcon = sortState === "none"
    ? ChevronsUpDown
    : sortState === "asc" || sortState === "active-asc"
      ? ChevronUp
      : ChevronDown;

  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", gap: "4px",
        minWidth, flex, px: "10px",
        justifyContent: right ? "flex-end" : "flex-start",
        cursor: "pointer", userSelect: "none", height: "100%",
        "&:hover .sort-icon": { opacity: 1 },
      }}
    >
      {info && <Info size={12} color={TEXT_MUTED} style={{ flexShrink: 0 }} />}
      <Typography sx={{
        fontSize: "12px", fontWeight: 600, fontFamily: FONT,
        color, whiteSpace: "nowrap",
      }}>
        {label}
      </Typography>
      <Box
        className="sort-icon"
        sx={{ opacity: sortState === "none" ? 0.4 : 1, display: "flex", alignItems: "center" }}
      >
        <SortIcon size={12} color={color} />
      </Box>
      {/* Column resize dropdown */}
      <Box sx={{
        ml: "2px", display: "flex", alignItems: "center",
        opacity: 0.5, "&:hover": { opacity: 1 },
      }}>
        <ChevronDown size={11} color={TEXT_MUTED} />
      </Box>
    </Box>
  );
}

export default function CampaignTable() {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Table header ── */}
      <Box sx={{
        display: "flex", alignItems: "center",
        height: "40px", backgroundColor: "#fff",
        borderBottom: BORDER, flexShrink: 0,
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}>

        {/* Checkbox col */}
        <Box sx={{
          width: "44px", minWidth: "44px", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRight: BORDER, flexShrink: 0,
        }}>
          <Checkbox size="small" sx={{ p: "2px", color: TEXT_MUTED }} />
        </Box>

        {/* Off/On */}
        <Box sx={{
          width: "90px", minWidth: "90px", px: "10px", height: "100%",
          display: "flex", alignItems: "center", borderRight: BORDER, flexShrink: 0,
        }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 600, fontFamily: FONT, color: TEXT_MUTED }}>
            Off/On
          </Typography>
          <ChevronsUpDown size={12} color={TEXT_MUTED} style={{ marginLeft: "4px", opacity: 0.5 }} />
        </Box>

        {/* Campaign */}
        <Box sx={{
          flex: 2, minWidth: "160px", height: "100%", borderRight: BORDER,
        }}>
          <HeaderCell label="Campaign" sortState="asc" />
        </Box>

        {/* Delivery — active sort blue */}
        <Box sx={{ width: "130px", minWidth: "130px", height: "100%", borderRight: BORDER }}>
          <HeaderCell label="Delivery" sortState="active-asc" />
        </Box>

        {/* Actions */}
        <Box sx={{ flex: 1, minWidth: "110px", height: "100%", borderRight: BORDER }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px", px: "10px", height: "100%" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, fontFamily: FONT, color: TEXT_MUTED }}>
              Actions
            </Typography>
            <ChevronDown size={11} color={TEXT_MUTED} />
          </Box>
        </Box>

        {/* Results */}
        <Box sx={{ width: "110px", minWidth: "110px", height: "100%", borderRight: BORDER }}>
          <HeaderCell label="Results" sortState="none" info />
        </Box>

        {/* Cost per result */}
        <Box sx={{ width: "120px", minWidth: "120px", height: "100%", borderRight: BORDER }}>
          <Box sx={{ display: "flex", flexDirection: "column", px: "10px", justifyContent: "center", height: "100%", gap: "1px" }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, fontFamily: FONT, color: TEXT_MUTED, lineHeight: 1.2 }}>
              Cost per
            </Typography>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, fontFamily: FONT, color: TEXT_MUTED, lineHeight: 1.2 }}>
              result
            </Typography>
          </Box>
        </Box>

        {/* Sort icon col */}
        <Box sx={{
          width: "44px", minWidth: "44px", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRight: BORDER, flexShrink: 0,
        }}>
          <ChevronsUpDown size={12} color={TEXT_MUTED} style={{ opacity: 0.5 }} />
        </Box>

        {/* Budget */}
        <Box sx={{ width: "110px", minWidth: "110px", height: "100%", borderRight: BORDER }}>
          <HeaderCell label="Budget" sortState="asc" />
        </Box>

        {/* Amount spent — no resize dropdown */}
        <Box sx={{ width: "110px", minWidth: "110px", height: "100%", px: "10px", display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 600, fontFamily: FONT, color: TEXT_MUTED }}>
            Amount spent
          </Typography>
        </Box>
      </Box>

      {/* ── Empty State ── */}
      <Box sx={{
        flex: 1, backgroundColor: "#F0F2F5",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        py: "60px", gap: "12px",
      }}>
        {/* Magnifier illustration */}
        <Box sx={{ mb: "8px" }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="16" stroke="#BEC3C9" strokeWidth="3" fill="none" />
            <circle cx="24" cy="24" r="11" stroke="#D8DBDF" strokeWidth="2" fill="none" />
            <line x1="35.5" y1="35.5" x2="48" y2="48" stroke="#BEC3C9" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </Box>

        <Typography sx={{
          fontSize: "16px", fontWeight: 700, fontFamily: FONT, color: TEXT,
        }}>
          Get set up to run ads
        </Typography>

        <Typography sx={{
          fontSize: "13px", fontFamily: FONT, color: TEXT_MUTED,
          textAlign: "center", maxWidth: "440px", lineHeight: 1.5,
        }}>
          Confirm a few details in Account overview so that you can publish your first ad campaign.
        </Typography>

        <Box sx={{
          mt: "8px", px: "16px", height: "36px",
          border: "1px solid #CED0D4", borderRadius: "6px",
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "#fff", cursor: "pointer",
          "&:hover": { backgroundColor: "#F0F2F5" },
        }}>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, fontFamily: FONT, color: TEXT }}>
            Go to Account overview
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
