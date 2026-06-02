import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";

/* ─── SVG Icon Components (matching Meta Ads Manager exactly) ─── */

// Meta logo (∞ symbol)
const MetaLogo = () => (
  <svg width="28" height="28" viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.878 18c0 3.355.733 5.926 1.705 7.37C8.795 27.072 9.978 28 11.25 28c1.627 0 3.117-.676 5.97-4.735 2.298-3.257 5.003-7.836 6.827-10.699l3.088-4.744C29.358 4.664 31.61 2 34.5 2c2.648 0 5.17 1.56 7.108 4.498C43.62 9.07 44.75 13.002 44.75 18c0 3.057-.6 5.348-1.62 7.108C42.11 26.846 40.587 28 38.75 28c-1.903 0-3.85-.945-6.27-4.605-1.325-1.993-2.68-4.434-3.885-6.63l-.588-1.078c-1.19-2.179-2.354-4.277-3.472-5.934C22.72 7.11 20.878 5 18.75 5c-2.346 0-4.346 1.694-5.96 4.258C11.273 11.684 10.5 14.855 10.5 18H5.878zm27.125-4.055c1.005 1.85 2.039 3.79 2.927 5.205C37.882 21.94 39.28 24.5 40.875 24.5c.987 0 1.875-.73 2.5-2.078.472-1.016.875-2.484.875-4.422 0-4.437-.957-7.877-2.367-10.005C40.658 5.997 39.22 5 37.75 5c-1.69 0-3.283 1.39-5.04 4.468-.432.75-.873 1.591-1.32 2.487l1.613 2.99z"
      fill="#0082FB"
    />
    <path
      d="M13.5 18c0 2.75.45 4.856 1.075 6.143C15.24 25.598 16.03 26.5 17 26.5c1.182 0 2.334-.573 4.654-3.93 1.95-2.83 4.07-6.6 6.096-9.875l.322-.526C26 10.084 23.93 7 21 7c-1.66 0-3.205 1.092-4.528 3.16C14.928 12.44 13.5 15.053 13.5 18z"
      fill="#0082FB"
      opacity="0.4"
    />
  </svg>
);

// Account / Overview icon
const HomeIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M2.5 7.5L10 2.5L17.5 7.5V17.5H12.5V12.5H7.5V17.5H2.5V7.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// Campaigns / Grid icon
const CampaignsIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="11" y="2.5" width="6.5" height="6.5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="2.5" y="11" width="6.5" height="6.5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="11" y="11" width="6.5" height="6.5" rx="1" stroke={color} strokeWidth="1.5" />
  </svg>
);

// Ad Library / image icon
const AdLibraryIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke={color} strokeWidth="1.5" />
    <circle cx="7" cy="8.5" r="1.5" stroke={color} strokeWidth="1.3" />
    <path d="M2.5 13L6 10L8.5 12.5L12 9L17.5 14" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

// Audiences icon
const AudiencesIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="7.5" cy="7" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M1.5 16.5C1.5 13.5 4 11.5 7.5 11.5C11 11.5 13.5 13.5 13.5 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 5.5C14.933 5.5 16.5 7 16.5 9C16.5 11 15 12.5 13.5 12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 12.5C16 13 18 14.5 18.5 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Insights / Analytics icon
const InsightsIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="11" width="3" height="6.5" rx="0.75" stroke={color} strokeWidth="1.5" />
    <rect x="8.5" y="6.5" width="3" height="11" rx="0.75" stroke={color} strokeWidth="1.5" />
    <rect x="14.5" y="2.5" width="3" height="15" rx="0.75" stroke={color} strokeWidth="1.5" />
  </svg>
);

// Billing icon
const BillingIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="5" width="15" height="11" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M2.5 8.5H17.5" stroke={color} strokeWidth="1.5" />
    <rect x="5" y="11" width="3.5" height="2" rx="0.5" fill={color} />
  </svg>
);

// Pages / Business icon
const PagesIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="8" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M4 17C4 13.686 6.686 11 10 11C13.314 11 16 13.686 16 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// More / hamburger
const MoreIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M3 5H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 15H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Sparkle / AI icon (purple)
const SparkleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" fill="#9b59b6" />
    <path d="M16 2L16.8 4.2L19 5L16.8 5.8L16 8L15.2 5.8L13 5L15.2 4.2L16 2Z" fill="#9b59b6" opacity="0.7" />
  </svg>
);

// Help icon
const HelpIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke={color} strokeWidth="1.5" />
    <path d="M7.5 7.5C7.5 6.12 8.62 5 10 5C11.38 5 12.5 6.12 12.5 7.5C12.5 8.88 11.5 9.5 10.5 10C10.2 10.2 10 10.5 10 11V11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14" r="0.75" fill={color} />
  </svg>
);

// Notes / Drafts icon
const NotesIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="4" y="2.5" width="12" height="15" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M7 7H13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M7 10H13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M7 13H10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// Settings icon
const SettingsIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M10 2.5V4.5M10 15.5V17.5M2.5 10H4.5M15.5 10H17.5M4.4 4.4L5.8 5.8M14.2 14.2L15.6 15.6M4.4 15.6L5.8 14.2M14.2 5.8L15.6 4.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Search icon
const SearchIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="8.5" cy="8.5" r="5.5" stroke={color} strokeWidth="1.5" />
    <path d="M12.5 12.5L17 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Pixel / Bug icon
const PixelIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="5.5" y="6" width="9" height="9" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M7.5 6V4.5C7.5 3.67 8.17 3 9 3H11C11.83 3 12.5 3.67 12.5 4.5V6" stroke={color} strokeWidth="1.3" />
    <path d="M5.5 9H3.5M14.5 9H16.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5.5 12.5H3.5M14.5 12.5H16.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M7.5 15L6 17M12.5 15L14 17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/* ─── Sidebar Items Config ─── */
const topItems = [
  { id: "home",      icon: HomeIcon,      label: "Account overview",  tab: null },
  { id: "campaigns", icon: CampaignsIcon, label: "Campaigns",         tab: "campaigns" },
  { id: "adlibrary", icon: AdLibraryIcon, label: "Ad Library",        tab: null },
  { id: "audiences", icon: AudiencesIcon, label: "Audiences",         tab: null },
  { id: "insights",  icon: InsightsIcon,  label: "Insights",          tab: null },
  { id: "billing",   icon: BillingIcon,   label: "Billing & payments", tab: "billing" },
  { id: "pages",     icon: PagesIcon,     label: "Business settings", tab: null },
  { id: "more",      icon: MoreIcon,      label: "All tools",         tab: null },
];

const bottomItems = [
  { id: "sparkle",  icon: SparkleIcon,  label: "Meta AI",     tab: null, special: "purple" },
  { id: "help",     icon: HelpIcon,     label: "Help",        tab: null },
  { id: "notes",    icon: NotesIcon,    label: "Drafts",      tab: null },
  { id: "settings", icon: SettingsIcon, label: "Settings",    tab: null },
  { id: "search",   icon: SearchIcon,   label: "Search",      tab: null },
  { id: "pixel",    icon: PixelIcon,    label: "Events Manager", tab: null },
];

/* ─── Single Nav Item ─── */
function NavItem({ item, isExpanded, isActive, onClick }) {
  const Icon = item.icon;
  const activeColor = "#1877f2";
  const defaultColor = "#1c2b33";
  const iconColor = item.special === "purple"
    ? undefined               // SparkleIcon handles its own fill
    : isActive
      ? activeColor
      : defaultColor;

  return (
    <Tooltip
      title={isExpanded ? "" : item.label}
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: "12px",
            bgcolor: "#1c2b33",
            color: "#fff",
            borderRadius: "4px",
            py: "4px",
            px: "8px",
          },
        },
      }}
    >
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          px: "14px",
          py: "10px",
          cursor: "pointer",
          borderRadius: "6px",
          mx: "4px",
          position: "relative",
          backgroundColor: isActive ? "rgba(24,119,242,0.08)" : "transparent",
          color: isActive ? activeColor : defaultColor,
          transition: "background-color 0.15s ease, color 0.15s ease",
          whiteSpace: "nowrap",
          overflow: "hidden",
          "&:hover": {
            backgroundColor: isActive
              ? "rgba(24,119,242,0.12)"
              : "rgba(0,0,0,0.04)",
          },
          // Active left border indicator
          "&::before": isActive
            ? {
                content: '""',
                position: "absolute",
                left: "-4px",
                top: "6px",
                bottom: "6px",
                width: "3px",
                backgroundColor: activeColor,
                borderRadius: "0 2px 2px 0",
              }
            : {},
        }}
      >
        {/* Icon */}
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          {item.special === "purple" ? (
            <SparkleIcon size={20} />
          ) : (
            <Icon size={20} color={iconColor} />
          )}
        </Box>

        {/* Label — only visible when expanded */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: isActive ? 600 : 400,
            fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
            color: isActive ? activeColor : defaultColor,
            lineHeight: "18px",
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            transition: "opacity 0.2s ease, width 0.2s ease",
            overflow: "hidden",
          }}
        >
          {item.label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/* ─── Main Sidebar Component ─── */
export default function Sidebar({ activeTab, setActiveTab }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (tab) => {
    if (tab) setActiveTab(tab);
  };

  return (
    <Box
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={{
        width: isExpanded ? 220 : 56,
        minWidth: isExpanded ? 220 : 56,
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #cbd2d9",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowX: "hidden",
        overflowY: "auto",
        zIndex: 100,
        flexShrink: 0,
        // Hide scrollbar
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* ── Meta Logo ── */}
      <Box
        sx={{
          height: 44,
          display: "flex",
          alignItems: "center",
          px: "14px",
          flexShrink: 0,
          borderBottom: "1px solid #cbd2d9",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <MetaLogo />
        </Box>
        {/* "Meta Ads" label when expanded */}
        <Typography
          sx={{
            ml: "10px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
            color: "#1c2b33",
            whiteSpace: "nowrap",
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            transition: "opacity 0.2s ease",
            overflow: "hidden",
          }}
        >
          Meta Ads
        </Typography>
      </Box>

      {/* ── Top Nav Items ── */}
      <Box sx={{ pt: "8px", flex: 1 }}>
        {topItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isExpanded={isExpanded}
            isActive={item.tab === activeTab}
            onClick={() => handleClick(item.tab)}
          />
        ))}
      </Box>

      {/* ── Divider ── */}
      <Box
        sx={{
          height: "1px",
          backgroundColor: "#cbd2d9",
          mx: "8px",
          my: "8px",
          flexShrink: 0,
        }}
      />

      {/* ── Bottom Nav Items ── */}
      <Box sx={{ pb: "8px" }}>
        {bottomItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isExpanded={isExpanded}
            isActive={false}
            onClick={() => {}}
          />
        ))}
      </Box>
    </Box>
  );
}
