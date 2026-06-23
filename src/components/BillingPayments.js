import { useState, useEffect, useRef } from "react";
import { Box, Typography, Select, MenuItem, TextField, IconButton, Paper, Button, InputAdornment, Checkbox, Radio } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CreditCard, Activity, Info, X, ChevronDown,
  LayoutGrid, Edit3, HelpCircle, Settings2,
  MinusCircle, PlusCircle, Settings, Search,
  Plus, Trash2, CalendarDays
} from "lucide-react";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import LockIcon from "@mui/icons-material/Lock";
import Person from "@mui/icons-material/Person";
import Facebook from "@mui/icons-material/Facebook";
import img1 from "../assets/Vis.png";
import img2 from "../assets/Visa1.png";
import img3 from "../assets/UPI.png";
import img4 from "../assets/Gpay.png";
import img5 from "../assets/PhonePay.png";
import img6 from "../assets/Paytm.png";
import img7 from "../assets/NetBanking.png";
import AvailableFundsIcon from '../assets/icons/available-funds-icons.webp'
const paymentOptions = [
  { label: "Debit or credit card", value: "card", icons: [img1, img2] },
  { label: "UPI", value: "upi", icons: [img3, img4, img5, img6] },
  { label: "Net Banking", value: "netbanking", icons: [img7] },
];
const budgetOptions = [
  { label: "2,000 x 3 Days", value: "2000" },
  { label: "5,000 x 3 Days", value: "5000" },
  { label: "10,000 x 3 Days", value: "10000" },
];

/* ─── EXACT Design Tokens from live Meta computed CSS ─── */
const FONT = '"Optimistic 95", system-ui, sans-serif';
// eslint-disable-next-line no-unused-vars
const FONT_ROBOTO = 'Roboto, Arial, sans-serif';
const TEXT = " rgb(28,43,51)";        // — all body text
const MUTED = "rgba(28,43,51,0.65)"; // subtext
const BLUE = "#0a78be";           // rgb(10,120,190) — links & active
const WHITE = "rgb(255,255,255)";
const RADIUS = "4px";              // card border-radius from Meta

const theme = createTheme({
  typography: {
    fontFamily: FONT,
    allVariants: {
      fontFamily: FONT,
      color: TEXT,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: FONT,
          color: TEXT,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: FONT,
          textTransform: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: FONT,
          color: TEXT,
        },
        input: {
          fontFamily: FONT,
          color: TEXT,
          "&::placeholder": {
            fontFamily: FONT,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: FONT,
          color: TEXT,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: FONT,
          color: TEXT,
        },
      },
    },
  },
});

/* ─── Meta exact page background gradient ─── */
const PAGE_BG = `
  radial-gradient(103.89% 81.75% at 95.41% 106.34%, #EAF8EF 6%, rgba(234,248,239,0) 79.68%),
  radial-gradient(297.85% 151.83% at -21.39% 8.81%, #FAF1F1 0%, #FAF1F1 15.29%, #F3EDF5 21.39%, #E5F0FA 40.79%)
`.trim();

/* ─── Typography helpers ─── */
// Meta heading: 20px / 700 / #1c2b33
const H_PAGE = { fontSize: "20px", fontWeight: 650, lineHeight: "24px", color: TEXT, };
// Meta section heading: 18px / 700
const H_SEC = { fontSize: 18, fontWeight: 700, lineHeight: "22px", color: TEXT };
// Banner title: 15px / 700
const H_CARD = { fontSize: "15px", fontWeight: 700, lineHeight: "20px", color: TEXT };
// Body text: 14px / 400
const T_BODY = { fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: TEXT };
// Label (Business name etc): 15px / 700
const T_LABEL = { fontSize: "16px", fontWeight: 700, lineHeight: "20px", color: TEXT };
// Subtext / muted: 12px / 400
const T_MUTED = { fontSize: "12px", fontWeight: 400, lineHeight: "16px", color: MUTED };
// Balance: 32px / 300
const T_BAL = { fontSize: "32px", fontWeight: 300, lineHeight: "40px", color: TEXT };
// Link: 14px / 400 / blue
const T_LINK = {
  fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: BLUE, cursor: "pointer",
  "&:hover": { textDecoration: "underline" }
};
// Nav active label: 16px / 700 / blue
const T_NAV_A = { fontSize: "16px", fontWeight: 700, lineHeight: "20px", color: BLUE };
// Nav label: 14px / 400
const T_NAV = { fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: TEXT };

/* ─── Primitives ─── */
function T({ children, sx = {}, ...props }) {
  return <Typography sx={{ fontFamily: FONT, color: TEXT, ...sx }} {...props}>{children}</Typography>;
}

// Card: white, 4px radius, NO border, NO shadow (exact Meta style)
function Card({ children, sx = {} }) {
  return (
    <Box sx={{
      backgroundColor: WHITE,
      borderRadius: RADIUS,
      ...sx,
    }}>
      {children}
    </Box>
  );
}

function OutlineBtn({ children, onClick, sx = {} }) {
  return (
    <Box onClick={onClick} sx={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      px: "12px", height: "30px",
      border: "1px solid rgba(28,43,51,0.3)",
      borderRadius: RADIUS,
      cursor: "pointer", backgroundColor: WHITE,
      "&:hover": { backgroundColor: "#f5f6fa" },
      ...sx,
    }}>
      <T sx={{
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px",
        color: "rgb(28, 43, 51)",
        fontStyle: "normal",
      }}>{children}</T>
    </Box>
  );
}

/* ─── Custom Icons for Navigation ─── */
function TiltedCardIcon({ size = 20, color = "#0a78be" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" style={{ transform: "rotate(-40deg)", transformOrigin: "center" }}>
      <rect x="2" y="5" width="20" height="14" rx="3" fill={color} />
      <line x1="2" y1="9" x2="22" y2="9" stroke="#ffffff" strokeWidth="2" />
      <rect x="5" y="13" width="4" height="3" rx="1" fill="#ffffff" opacity="0.8" />
      <circle cx="16" cy="14.5" r="1.5" fill="#ffffff" opacity="0.8" />
      <circle cx="19" cy="14.5" r="1.5" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}

function LayoutToggleIcon({ size = 16, color = "#65676B", style = {} }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer", ...style }}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="6" y1="7" x2="6" y2="7" strokeWidth="2.5" />
      <line x1="6" y1="12" x2="6" y2="12" strokeWidth="2.5" />
      <line x1="6" y1="17" x2="6" y2="17" strokeWidth="2.5" />
      <path d="M16 10l-2 2 2 2" fill="none" />
    </svg>
  );
}

/* ─── Secondary Nav Panel ─── */
function SecondaryNav({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { id: "payment-settings", icon: TiltedCardIcon, label: "Payment settings" },
    { id: "payment-activity", icon: Activity, label: "Payment activity" },
  ];
  return (
    <Card sx={{
      width: collapsed ? "60px" : "233px",
      transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      flexShrink: 0,
      alignSelf: "flex-start", py: "8px", px: collapsed ? "4px" : "0px",
      display: "flex", flexDirection: "column", gap: "8px",
      overflow: "hidden"
    }}>
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = id === active;
        return (
          <Box
            key={id}
            onClick={() => setActive(id)}
            sx={{
              display: "flex", alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? "0px" : "8px",
              mx: collapsed ? "0px" : "8px",
              px: collapsed ? "0px" : "10px", py: "8px", cursor: "pointer",
              borderRadius: "8px",
              backgroundColor: isActive ? "#e7f0fd" : "transparent",
              "&:hover": { backgroundColor: isActive ? "#e7f0fd" : "rgba(0,0,0,0.04)" },
            }}
          >
            {isActive && id === "payment-settings" ? (
              <TiltedCardIcon size={26} color={BLUE} />
            ) : (
              <Icon size={24} color={isActive ? BLUE : TEXT} strokeWidth={1.8} />
            )}
            {!collapsed && (
              <T sx={{
                ...(isActive ? T_NAV_A : T_NAV),
                fontSize: "17px",
                fontWeight: isActive ? 600 : 400,
                whiteSpace: "nowrap"
              }}>
                {label}
              </T>
            )}
          </Box>
        );
      })}
      <Box sx={{
        display: "flex",
        justifyContent: collapsed ? "center" : "flex-end",
        px: collapsed ? "0px" : "10px",
        mt: "8px"
      }}>
        <Box onClick={() => setCollapsed(!collapsed)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LayoutToggleIcon
            size={26}
            color={MUTED}
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}

/* ─── Notifications Panel ─── */
function NotificationsPanel({ notifications, setNotifications }) {
  const [expanded, setExpanded] = useState(true);

  const activeItems = [];
  if (notifications.setup) activeItems.push("setup");
  if (notifications.tax) activeItems.push("tax");
  const totalCount = activeItems.length;

  if (totalCount === 0) return null;

  // Show only 1 notification if not expanded and multiple exist
  const itemsToDisplay = (!expanded && totalCount > 1) ? activeItems.slice(0, 1) : activeItems;

  const showSetup = itemsToDisplay.includes("setup");
  const showTax = itemsToDisplay.includes("tax");

  return (
    <Card sx={{
      border: "1px solid #dee1e5",
      borderRadius: RADIUS,
      backgroundColor: WHITE,
      mt: "20px",
      mb: "10px",
      overflow: "hidden"
    }}>
      {/* Header */}
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: "12px", py: "6px",
        borderBottom: "1px solid #dee1e5"
      }}>
        <T sx={{ ...T_LABEL, fontSize: "16px", fontWeight: 700, m: "10px" }}>Notifications</T>
        {totalCount > 1 && (
          <Box
            onClick={() => setExpanded(!expanded)}
            sx={{
              color: "rgb(10, 120, 190)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              userSelect: "none",
              "&:hover": { textDecoration: "underline" }
            }}
          >
            {expanded ? "See less" : `See all (${totalCount})`}
          </Box>
        )}
      </Box>

      {/* Notification items */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {showSetup && (
          <Box sx={{
            display: "flex",
            position: "relative",
            borderBottom: (showTax && itemsToDisplay.length > 1) ? "1px solid #dee1e5" : "none",
            p: "16px",
            borderLeft: `4px solid ${TEXT}`,
          }}>
            <Box sx={{ flex: 1 }}>
              <T sx={{ fontSize: "15px", fontWeight: 700, lineHeight: "20px", mb: "4px", color: TEXT }}>
                Set up your account
              </T>
              <Box sx={{ pl: "12px" }}>
                <T sx={{ fontSize: "15px", color: TEXT, mb: "12px", fontWeight: 400, lineHeight: "20px" }}>
                  Simply add your first payment method and billing details.
                </T>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center",
                    px: "16px", height: "36px", borderRadius: RADIUS,
                    backgroundColor: "#0A78BE", cursor: "pointer",
                    "&:hover": { backgroundColor: "#0058ba" },
                  }}>
                    <T sx={{ fontSize: "14px", color: WHITE, fontWeight: 500, lineHeight: "20px" }}>Get started</T>
                  </Box>
                  <Box
                    onClick={() => setNotifications(prev => ({ ...prev, setup: false }))}
                    sx={{
                      display: "inline-flex", alignItems: "center",
                      px: "16px", height: "36px", borderRadius: RADIUS,
                      border: "1px solid #bcc0c4", backgroundColor: WHITE, cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f6fa" },
                    }}
                  >
                    <T sx={{ fontSize: "14px", color: TEXT, fontWeight: 500, lineHeight: "20px" }}>Dismiss</T>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              onClick={() => setNotifications(prev => ({ ...prev, setup: false }))}
              sx={{
                position: "absolute", right: "12px", top: "12px",
                width: 28, height: 28, display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", borderRadius: "50%",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.07)" },
              }}
            >
              <X size={14} color={MUTED} />
            </Box>
          </Box>
        )}

        {showTax && (
          <Box sx={{
            display: "flex",
            position: "relative",
            p: "16px",
            borderLeft: `4px solid ${TEXT}`,
          }}>
            <Box sx={{ flex: 1 }}>
              <T sx={{ fontSize: "15px", fontWeight: 700, mb: "4px", color: TEXT }}>
                Verify your tax info
              </T>
              <Box sx={{ pl: "12px" }}>
                <T sx={{ fontSize: "14px", color: TEXT, mb: "12px", fontWeight: 400 }}>
                  Submit your GST number to confirm that you're a registered taxpayer. We need this info to comply with local tax regulations.
                </T>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center",
                    px: "16px", height: "36px", borderRadius: RADIUS,
                    backgroundColor: "#0A78BE", cursor: "pointer",
                    "&:hover": { backgroundColor: "#0058ba" },
                  }}>
                    <T sx={{ fontSize: "14px", color: WHITE, fontWeight: 500, lineHeight: "20px" }}>Verify tax info</T>
                  </Box>
                  <Box
                    onClick={() => setNotifications(prev => ({ ...prev, tax: false }))}
                    sx={{
                      display: "inline-flex", alignItems: "center",
                      px: "16px", height: "36px", borderRadius: RADIUS,
                      border: "1px solid #bcc0c4", backgroundColor: WHITE, cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f6fa" },
                    }}
                  >
                    <T sx={{ fontSize: "14px", color: TEXT, fontWeight: 500, lineHeight: "20px" }}>Dismiss</T>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              onClick={() => setNotifications(prev => ({ ...prev, tax: false }))}
              sx={{
                position: "absolute", right: "12px", top: "12px",
                width: 28, height: 28, display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", borderRadius: "50%",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.07)" },
              }}
            >
              <X size={14} color={MUTED} />
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

/* ─── Current Balance ─── */
function CurrentBalanceCard({ onAddFunds }) {
  return (
    <Card sx={{ px: "24px", py: "24px", mb: "16px", border: "1px solid #dee1e5" }}>
      {/* Top Row: Title & Add Funds */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "12px" }}>
        <T sx={{ fontSize: "16px", fontWeight: 700, color: "rgb(28, 43, 51)", lineHeight: "20px" }}>
          Available funds
        </T>
        <Button
          variant="outlined"
          onClick={onAddFunds}
          sx={{
            textTransform: "none",
            borderColor: "rgba(28, 43, 51, 0.2)",
            color: "rgb(28, 43, 51)",
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: FONT,
            px: "18px",
            py: "6px",
            borderRadius: "4px",
            backgroundColor: WHITE,
            height: "36px",
            "&:hover": {
              borderColor: "rgba(28, 43, 51, 0.4)",
              backgroundColor: "#f5f6fa",
            }
          }}
        >
          Add funds
        </Button>
      </Box>

      {/* Amount Row: ₹ 0.00 & Three Dots */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "4px" }}>
        <T sx={{ fontSize: "32px", fontWeight: 400, color: "rgb(28, 43, 51)", lineHeight: "40px" }}>
          ₹ 186.96
        </T>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "46px",
            height: "32px",
            border: "1px solid rgba(28, 43, 51, 0.2)",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: WHITE,
            "&:hover": {
              borderColor: "rgba(28, 43, 51, 0.4)",
              backgroundColor: "#f5f6fa",
            }
          }}
        >
          <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </Box>
      </Box>

      {/* Divider stretching across */}
      <Box sx={{ borderBottom: "1px solid #dee1e5", m: "15px 10px 8px 8px" }} />

      {/* "How you'll pay" section */}
      <T sx={{ fontSize: "15px", fontWeight: 700, color: "rgb(28, 43, 51)", mb: "16px" }}>
        How you'll pay
      </T>

      {/* Wallet row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "12px" }}>
        <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="17" rx="3" fill="#2e8b75" />
          <rect x="15" y="5" width="9" height="7" rx="1.5" fill="#206958" />
          <circle cx="19.5" cy="8.5" r="1.5" fill="white" />
        </svg>
        <T sx={{ fontSize: "15px", fontWeight: 700, color: "rgb(28, 43, 51)" }}>
          Available funds
        </T>
      </Box>

      {/* Deduct text */}
      <T sx={{ fontSize: "12px", fontWeight: 400, color: "rgb(28, 43, 51)", lineHeight: "20px", mb: "12px" }}>
        We'll deduct funds about once a day when you run ads. If funds run out, your ads will be paused.
      </T>

      {/* Spending limit text */}
      <T sx={{ fontSize: "14px", fontWeight: 400, color: "rgb(28, 43, 51)", mb: "12px" }}>
        Daily spending limit (set by Meta): <Box component="span" sx={{ fontWeight: 700 }}>₹ 1,918.37</Box>
      </T>

      {/* Projected spend & Learn more row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Box sx={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#1f7a42",
            display: "inline-block"
          }} />
          <T sx={{ fontSize: "14px", fontWeight: 400, color: "#1f7a42" }}>
            Your projected spend today is within this limit
          </T>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", color: "rgb(28, 43, 51)" }}>
          <T sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "inherit",
            "&:hover": { textDecoration: "underline" }
          }}>
            Learn more
          </T>
          <ChevronDown size={16} />
        </Box>
      </Box>
    </Card>
  );
}

/* ─── Payment Methods ─── */
function PaymentMethodsCard({ onAddPaymentMethod }) {
  return (
    <Card sx={{ px: "20px", py: "16px", mb: "12px" }}>
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "12px",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <T sx={T_LABEL}>Payment methods</T>
          <svg
            viewBox="0 0 14 14"
            width="14"
            height="14"
            style={{ cursor: "default", display: "inline-block", verticalAlign: "middle" }}
          >
            <circle cx="7" cy="7" r="7" fill="rgb(40, 57, 67)" />
            <circle cx="7" cy="4.5" r="0.95" fill="#ffffff" />
            <rect x="6.1" y="6.5" width="1.8" height="4.5" rx="0.5" fill="#ffffff" />
          </svg>
        </Box>
        <OutlineBtn onClick={onAddPaymentMethod}>Add payment method</OutlineBtn>
      </Box>
      <T sx={T_BODY}>You haven't added any payment methods.</T>
    </Card>
  );
}

/* ─── Payment Activity Inline ─── */
function PaymentActivityInlineCard() {
  const activities = [
    { date: "22 Jun 2026", method: "Prepaid balance", amount: "₹ 366.71", status: "Paid" },
    { date: "21 Jun 2026", method: "Manual payment", amount: "₹ 410.00", status: "Funded" },
    { date: "21 Jun 2026", method: "Prepaid balance", amount: "₹ 410.00", status: "Paid" },
  ];

  return (
    <Card sx={{ px: "20px", py: "16px", mb: "12px", border: "1px solid #dee1e5" }}>
      <T sx={{ ...T_LABEL, mb: "16px", fontSize: "16px" }}>Payment activity</T>
      
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr", mb: "12px" }}>
        <T sx={{ fontSize: "14px", fontWeight: 700, color: "rgb(28, 43, 51)" }}>Date</T>
        <T sx={{ fontSize: "14px", fontWeight: 700, color: "rgb(28, 43, 51)" }}>Payment method</T>
        <T sx={{ fontSize: "14px", fontWeight: 700, color: "rgb(28, 43, 51)" }}>Amount</T>
        <T sx={{ fontSize: "14px", fontWeight: 700, color: "rgb(28, 43, 51)" }}>Status</T>
      </Box>

      {activities.map((item, index) => (
        <Box key={index} sx={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1.5fr 1fr 1fr", 
          py: "12px", 
          borderTop: "1px solid #dee1e5" 
        }}>
          <T sx={{ fontSize: "14px", color: "rgb(28, 43, 51)" }}>{item.date}</T>
          <T sx={{ fontSize: "14px", color: "rgb(28, 43, 51)" }}>{item.method}</T>
          <T sx={{ fontSize: "14px", color: "rgb(28, 43, 51)" }}>{item.amount}</T>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Box sx={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#1f7a42" }} />
            <T sx={{ fontSize: "14px", color: "rgb(28, 43, 51)" }}>{item.status}</T>
          </Box>
        </Box>
      ))}

      <Box sx={{ pt: "16px", borderTop: "1px solid #dee1e5", mt: "4px" }}>
        <T sx={T_LINK}>View all activity</T>
      </Box>
    </Card>
  );
}

/* ─── Business Info ─── */
function BusinessInfoCard() {
  return (
    <Card sx={{ px: "20px", py: "16px", border: "1px solid #dee1e5", mb: "12px" }}>
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "20px",
      }}>
        <T sx={{ ...T_LABEL }}>Business info</T>
        <OutlineBtn sx={{ px: "16px", height: "32px" }}>Edit</OutlineBtn>
      </Box>
      <Box sx={{ display: "flex", gap: "120px" }}>
        {/* Column 1 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box>
            <T sx={{ ...T_LABEL, fontSize: "15px", mb: "4px" }}>Business name</T>
            <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>-</T>
          </Box>
          <Box>
            <T sx={{ ...T_LABEL, fontSize: "15px", mb: "4px" }}>Tax ID</T>
            <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>-</T>
          </Box>
        </Box>

        {/* Column 2 */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <T sx={{ ...T_LABEL, fontSize: "15px", mb: "4px" }}>Address</T>
          <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>India</T>
        </Box>

        {/* Column 3 */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <T sx={{ ...T_LABEL, fontSize: "15px", mb: "4px" }}>Currency</T>
          <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>Indian Rupee INR</T>
        </Box>
      </Box>
    </Card>
  );
}

/* ─── Right: Payment History ─── */
// function PaymentHistoryCard() {
//   return (
//     <Card sx={{ px: "16px", py: "14px", mb: "12px" }}>
//       <T sx={{ ...T_LABEL, mb: "10px" }}>Payment history</T>
//       <Box sx={{
//         display: "flex", alignItems: "center", gap: "6px",
//         pb: "10px", borderBottom: "1px solid rgba(28,43,51,0.15)",
//       }}>
//         <LayoutGrid size={14} color={BLUE} strokeWidth={1.6} />
//         <T sx={T_LINK}>View transaction history</T>
//       </Box>
//     </Card>
//   );
// }

/* ─── Custom Icons for Help Centre ─── */
function CrossedToolsIcon({ size = 18, color = "#65676B" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
      <path d="M16 8 L8 16" />
      <path d="M6 18 L4 20" />
    </svg>
  );
}

function VennDiagramIcon({ size = 18, color = "#65676B" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="12" cy="9" r="4.5" />
      <circle cx="8.5" cy="14" r="4.5" />
      <circle cx="15.5" cy="14" r="4.5" />
    </svg>
  );
}

/* ─── Right: Help Centre ─── */
function HelpCentreCard() {
  const links = [
    { icon: CrossedToolsIcon, label: "Troubleshoot billing and payments" },
    { icon: VennDiagramIcon, label: "How ads billing works" },
    { icon: MinusCircle, label: "What to do if your payment fails" },
    { icon: HelpCircle, label: "Open Help Centre" },
  ];
  return (
    <Card sx={{ px: "16px", py: "14px" }}>
      <T sx={{
        fontSize: "16px",
        lineHeight: "20px",
        fontWeight: 700,
        color: TEXT,
        mt: "8px",
        mb: "18px"
      }}>Help Centre</T>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map(({ icon: Icon, label }) => (
          <Box key={label} sx={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
            <Box sx={{ display: "flex", alignItems: "center", height: "20px" }}>
              <Icon size={18} color="#65676B" strokeWidth={1.6} />
            </Box>
            <T sx={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: BLUE,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" }
            }}>{label}</T>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* ─── Payment Settings View ─── */
function PaymentSettingsView({ notifications, setNotifications, currentAccount, setCurrentAccount, accounts }) {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [hasAdCredit, setHasAdCredit] = useState(false);

  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState("2478.00");
  const [addFundsCustomAmount, setAddFundsCustomAmount] = useState("2,478.00");
  const [addFundsPaymentMethod, setAddFundsPaymentMethod] = useState("upi");

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {/* Page heading + account selector */}
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "16px",
      }}>
        <T sx={{ ...H_PAGE, fontWeight: 700 }}>Payment settings</T>

        {/* Dropdown Wrapper */}
        <Box ref={dropdownRef} sx={{ position: "relative" }}>
          <Box
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            sx={{
              display: "flex", alignItems: "center", gap: "6px",
              px: "10px", height: "32px",
              border: "1px solid rgba(28,43,51,0.3)",
              borderRadius: RADIUS, backgroundColor: WHITE,
              cursor: "pointer", "&:hover": { backgroundColor: "#f5f6fa" },
            }}
          >
            <T sx={{ ...T_BODY, color: TEXT, fontWeight: 500 }}>{currentAccount.name} ({currentAccount.id.slice(0, -5)}...</T>
            <ArrowDropDown sx={{ color: TEXT, fontSize: 30 }} />
          </Box>

          {/* Account Selector Dropdown Popover */}
          {showAccountDropdown && (
            <Box sx={{
              position: "absolute",
              top: "34px",
              right: 0,
              width: "340px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #dee1e5",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              p: "8px",
              zIndex: 1000,
            }}>
              {/* Search Box */}
              <Box sx={{
                display: "flex", alignItems: "center", gap: "8px",
                px: "10px", height: "36px",
                border: "1px solid #1877f2", borderRadius: "6px",
                mb: "8px",
              }}>
                <Search size={18} color="#8a8d91" />
                <input
                  placeholder="Select account"
                  style={{
                    border: "none", outline: "none", width: "100%",
                    fontSize: "14px", fontFamily: FONT, color: TEXT,
                  }}
                />
              </Box>

              {/* Account Options List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {accounts.map((acc) => {
                  const isSelected = acc.id === currentAccount.id;
                  return (
                    <Box
                      key={acc.id}
                      onClick={() => {
                        setCurrentAccount(acc);
                        setShowAccountDropdown(false);
                      }}
                      sx={{
                        display: "flex", alignItems: "center", gap: "12px",
                        px: "12px", py: "8px", cursor: "pointer",
                        borderRadius: "6px",
                        backgroundColor: isSelected ? "#e7f0fd" : "transparent",
                        "&:hover": { backgroundColor: isSelected ? "#e7f0fd" : "rgba(0,0,0,0.04)" },
                      }}
                    >
                      {/* Custom Radio Button */}
                      <Box sx={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `1.5px solid ${isSelected ? "#1877f2" : "#bcc0c4"}`,
                        backgroundColor: "#ffffff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {isSelected && (
                          <Box sx={{
                            width: 10, height: 10, borderRadius: "50%",
                            backgroundColor: "#1877f2",
                          }} />
                        )}
                      </Box>

                      {/* Account Info Text */}
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <T sx={{ fontSize: "14px", fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>
                          {acc.name}
                        </T>
                        <T sx={{ fontSize: "12px", color: MUTED, lineHeight: 1.2, mt: "2px" }}>
                          Ad account ID: {acc.id}
                        </T>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <NotificationsPanel notifications={notifications} setNotifications={setNotifications} />

      {/* Two-column layout */}
      <Box sx={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, maxWidth: "800px", minWidth: 0 }}>
          <CurrentBalanceCard onAddFunds={() => setShowAddFundsModal(true)} />
          <PaymentMethodsCard onAddPaymentMethod={() => setShowSetupModal(true)} />
          <PaymentActivityInlineCard />
          <BusinessInfoCard />
        </Box>
        <Box sx={{ width: 340, minWidth: 360, flexShrink: 0 }}>
          {/* <PaymentHistoryCard /> */}
          <HelpCentreCard />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", mt: "8px", ml: 2, mb: "0px" }}>
        <T sx={T_BODY}>Need help?</T>
        <T sx={T_LINK}>Get support</T>
      </Box>

      {showSetupModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "grey",
            backgroundColor: "rgba(243, 237, 237, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
            p: "24px",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 600,
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              pt: "16px",
              pb: "16px",
              px: "16px",
              position: "relative",
              border: "1px solid #e4e6eb",
            }}
          >
            <IconButton onClick={() => setShowSetupModal(false)} sx={{ position: "absolute", top: "16px", right: "16px", p: 0 }}>
              <X size={26} color={TEXT} />
            </IconButton>

            {/* Header */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, fontSize: "16px", textAlign: "center", mb: 1 }}
            >
              Add payment information
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                mb: 1,
              }}
            >
              Add payment method
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {/* Debit or credit card */}
              <Box onClick={() => setSelectedPayment("card")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>Debit or credit card</Typography>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    <Box component="img" src={img1} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px", backgroundColor: "#1434cb" }} />
                    <Box component="img" src={img2} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                    <Box sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px", display: "flex", alignItems: "center", justifyContent: "center", px: "4px" }}>
                      <Typography sx={{ fontSize: "8px", fontWeight: "bold", color: "#0033a0" }}>RuPay</Typography>
                    </Box>
                  </Box>
                </Box>
                <Radio
                  checked={selectedPayment === "card"}
                  onChange={() => setSelectedPayment("card")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>

              {/* UPI */}
              <Box onClick={() => setSelectedPayment("upi")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>UPI</Typography>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    <Box component="img" src={img3} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                    <Box component="img" src={img4} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                    <Box component="img" src={img5} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                    <Box component="img" src={img6} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                  </Box>
                </Box>
                <Radio
                  checked={selectedPayment === "upi"}
                  onChange={() => setSelectedPayment("upi")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>

              {/* WhatsApp UPI */}
              <Box onClick={() => setSelectedPayment("whatsapp")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>WhatsApp UPI</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, backgroundColor: "#25D366", borderRadius: "4px" }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.26 5.26 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  </Box>
                </Box>
                <Radio
                  checked={selectedPayment === "whatsapp"}
                  onChange={() => setSelectedPayment("whatsapp")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>

              {/* Net Banking */}
              <Box onClick={() => setSelectedPayment("netbanking")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>Net Banking</Typography>
                  <Box component="img" src={img7} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                </Box>
                <Radio
                  checked={selectedPayment === "netbanking"}
                  onChange={() => setSelectedPayment("netbanking")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>

              {/* Ad credit */}
              <Box onClick={() => setSelectedPayment("adcredit")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: "4px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>Ad credit</Typography>
                </Box>
                <Radio
                  checked={selectedPayment === "adcredit"}
                  onChange={() => setSelectedPayment("adcredit")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
                gap: "2px"
              }}
            >
              <LockIcon sx={{ color: "#65676b", fontSize: "18px" }} />
              <Typography variant="subtitle1" sx={{ fontSize: "13px", color: "#65676b", textAlign: "center" }}>
                Your payment methods are saved and stored securely.
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: "13px", color: "#1877f2", fontWeight: 600, cursor: "pointer", textAlign: "center", "&:hover": { textDecoration: "underline" } }}
              >
                Terms and privacy policies apply.
              </Typography>
            </Box>

            <Box
              sx={{
                pt: 3,
                display: "flex",
                justifyContent: "flex-end", // Next button is aligned to the right in the image
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setShowSetupModal(false)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  bgcolor: "#1877F2",
                  "&:hover": { bgcolor: "#166FE5" },
                  px: "32px",
                  py: "8px",
                  borderRadius: "20px", // pill shape
                }}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {showAddFundsModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "grey",
            backgroundColor: "rgba(243, 237, 237, 0.5)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 1300,
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 550,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              p: 3,
              border: "1px solid #e4e6eb",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Box sx={{ width: 24 }} /> {/* Spacer */}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: "18px" }}>
                Add funds
              </Typography>
              <IconButton onClick={() => setShowAddFundsModal(false)} size="small">
                <X size={20} color={TEXT} />
              </IconButton>
            </Box>

            {/* Choose Amount */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: "16px", mb: 0.5 }}>
              Choose amount
            </Typography>
            <Typography sx={{ fontSize: "15px", color: TEXT, mb: 2 }}>
              Choose an amount to add to your available funds. We'll deduct from your total as your ads run.
            </Typography>

            <Box sx={{ display: "flex", gap: "12px", mb: 2 }}>
              {["2478.00", "4956.00", "other"].map((amt) => {
                const isSelected = addFundsAmount === amt;
                const label = amt === "other" ? "Other" : `₹ ${parseInt(amt).toLocaleString()}.00`;
                return (
                  <Box
                    key={amt}
                    onClick={() => {
                      setAddFundsAmount(amt);
                      if (amt !== "other") setAddFundsCustomAmount(parseInt(amt).toLocaleString() + ".00");
                    }}
                    sx={{
                      px: "16px",
                      py: "8px",
                      borderRadius: "6px",
                      border: isSelected ? "1px solid #283943" : "1px solid #ccd0d5",
                      backgroundColor: isSelected ? "#283943" : WHITE,
                      color: isSelected ? WHITE : TEXT,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    {label}
                  </Box>
                );
              })}
            </Box>

            <Box sx={{
              border: "1px solid #283943",
              borderRadius: "8px",
              p: "8px 12px",
              mb: "8px",
            }}>
              <Typography sx={{ fontSize: "12px", color: MUTED }}>Amount</Typography>
              <Typography sx={{ fontSize: "16px", color: TEXT }}>
                ₹ <input
                  value={addFundsCustomAmount}
                  onChange={(e) => {
                    setAddFundsCustomAmount(e.target.value);
                    setAddFundsAmount("other");
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    fontFamily: FONT,
                    color: TEXT,
                    width: "90%"
                  }}
                />
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "13px", color: TEXT, mb: 3 }}>
              Amount needed to cover your next 7 days of ad spending plus estimated tax, based on campaign budgets.
            </Typography>

            {/* Add payment method */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: "16px", mb: 2 }}>
              Add payment method
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", mb: 4 }}>
              {/* UPI */}
              <Box onClick={() => setAddFundsPaymentMethod("upi")} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", cursor: "pointer" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "8px" }}>
                    <Typography sx={{ fontSize: "15px", color: TEXT }}>UPI</Typography>
                    <Box sx={{ display: "flex", gap: "4px" }}>
                      <Box component="img" src={img3} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                      <Box component="img" src={img4} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                      <Box component="img" src={img5} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                      <Box component="img" src={img6} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                    </Box>
                  </Box>
                  <Box sx={{
                    display: "inline-block",
                    backgroundColor: "#e4e6eb",
                    borderRadius: "12px",
                    px: "12px",
                    py: "4px",
                  }}>
                    <Typography sx={{ fontSize: "14px", color: "#65676b" }}>Recommended based on your account</Typography>
                  </Box>
                </Box>
                <Radio
                  checked={addFundsPaymentMethod === "upi"}
                  onChange={() => setAddFundsPaymentMethod("upi")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>

              {/* Debit/Credit */}
              <Box onClick={() => setAddFundsPaymentMethod("card")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>Debit or credit card</Typography>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    <Box component="img" src={img1} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px", backgroundColor: "#1434cb" }} />
                    <Box component="img" src={img2} sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px" }} />
                    <Box sx={{ height: 18, border: "1px solid #dee1e5", borderRadius: "2px", p: "2px", display: "flex", alignItems: "center", justifyContent: "center", px: "4px" }}>
                      <Typography sx={{ fontSize: "8px", fontWeight: "bold", color: "#0033a0" }}>RuPay</Typography>
                    </Box>
                  </Box>
                </Box>
                <Radio
                  checked={addFundsPaymentMethod === "card"}
                  onChange={() => setAddFundsPaymentMethod("card")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>

              {/* WhatsApp UPI */}
              <Box onClick={() => setAddFundsPaymentMethod("whatsapp")} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography sx={{ fontSize: "15px", color: TEXT }}>WhatsApp UPI</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, backgroundColor: "#25D366", borderRadius: "4px" }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.26 5.26 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  </Box>
                </Box>
                <Radio
                  checked={addFundsPaymentMethod === "whatsapp"}
                  onChange={() => setAddFundsPaymentMethod("whatsapp")}
                  sx={{ p: 0, color: "#1877f2", "&.Mui-checked": { color: "#1877f2" } }}
                />
              </Box>
            </Box>

            {/* Bottom Actions */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => setShowAddFundsModal(false)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  bgcolor: "#1877f2",
                  color: WHITE,
                  px: "24px",
                  py: "8px",
                  borderRadius: "6px",
                  "&:hover": { bgcolor: "#166fe5" }
                }}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

/* ─── Payment Activity View ─── */
function PaymentActivityView({ notifications, setNotifications, currentAccount, setCurrentAccount, accounts }) {
  const [activeBillingTab, setActiveBillingTab] = useState("ad-accounts");
  const [dateRange, setDateRange] = useState("Lifetime");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [activityViewType, setActivityViewType] = useState("Transactions");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef(null);
  const [filterField, setFilterField] = useState("payment-status");
  const [filterOperator, setFilterOperator] = useState("is");
  const [filterValue, setFilterValue] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBillingTabChange = (tab) => {
    setActiveBillingTab(tab);
  };

  return (
    <Box sx={{ flex: 1 }}>
      {/* Payment activity header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "16px",
        }}
      >
        <T sx={{ ...H_PAGE }}>Payment activity</T>

        {/* Dropdown Wrapper */}
        <Box ref={dropdownRef} sx={{ position: "relative" }}>
          <Box
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            sx={{
              display: "flex", alignItems: "center", gap: "8px",
              px: "12px", height: "36px",
              border: "1px solid rgba(28,43,51,0.3)",
              borderRadius: RADIUS, backgroundColor: WHITE,
              cursor: "pointer", "&:hover": { backgroundColor: "#f5f6fa" },
            }}
          >
            <T sx={{ ...T_BODY, color: TEXT, fontWeight: 600, fontSize: "15px" }}>{currentAccount.name} ({currentAccount.id.slice(0, -5)}...</T>
            <ArrowDropDown sx={{ color: TEXT, fontSize: 30 }} />
          </Box>

          {/* Account Selector Dropdown Popover */}
          {showAccountDropdown && (
            <Box sx={{
              position: "absolute",
              top: "38px",
              right: 0,
              width: "340px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #dee1e5",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              p: "8px",
              zIndex: 1000,
            }}>
              {/* Search Box */}
              <Box sx={{
                display: "flex", alignItems: "center", gap: "8px",
                px: "10px", height: "36px",
                border: "1px solid #1877f2", borderRadius: "6px",
                mb: "8px",
              }}>
                <Search size={18} color="#8a8d91" />
                <input
                  placeholder="Select account"
                  style={{
                    border: "none", outline: "none", width: "100%",
                    fontSize: "14px", fontFamily: FONT, color: TEXT,
                  }}
                />
              </Box>

              {/* Account Options List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {accounts.map((acc) => {
                  const isSelected = acc.id === currentAccount.id;
                  return (
                    <Box
                      key={acc.id}
                      onClick={() => {
                        setCurrentAccount(acc);
                        setShowAccountDropdown(false);
                      }}
                      sx={{
                        display: "flex", alignItems: "center", gap: "12px",
                        px: "12px", py: "8px", cursor: "pointer",
                        borderRadius: "6px",
                        backgroundColor: isSelected ? "#e7f0fd" : "transparent",
                        "&:hover": { backgroundColor: isSelected ? "#e7f0fd" : "rgba(0,0,0,0.04)" },
                      }}
                    >
                      {/* Custom Radio Button */}
                      <Box sx={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `1.5px solid ${isSelected ? "#1877f2" : "#bcc0c4"}`,
                        backgroundColor: "#ffffff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {isSelected && (
                          <Box sx={{
                            width: 10, height: 10, borderRadius: "50%",
                            backgroundColor: "#1877f2",
                          }} />
                        )}
                      </Box>

                      {/* Account Info Text */}
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <T sx={{ fontSize: "14px", fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>
                          {acc.name}
                        </T>
                        <T sx={{ fontSize: "12px", color: MUTED, lineHeight: 1.2, mt: "2px" }}>
                          Ad account ID: {acc.id}
                        </T>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <NotificationsPanel notifications={notifications} setNotifications={setNotifications} />

      <Paper
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #dee1e5",
          p: 3,
          mt: 2
        }}
      >
        {/* Tabs */}
        <Box sx={{ display: "flex", gap: 1, borderBottom: "1px solid #dee1e5", pb: 1, mb: 1, mx: -3, px: 3 }}>
          <Button
            variant="text"
            onClick={() => setActiveBillingTab("ad-accounts")}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              py: "6px",
              px: "12px",
              fontSize: "14px",
              lineHeight: "20px",
              backgroundColor: activeBillingTab === "ad-accounts" ? "#e7f0fd" : "transparent",
              color: activeBillingTab === "ad-accounts" ? "rgb(10,120,190)" : "#65676B",
              fontWeight: activeBillingTab === "ad-accounts" ? "bold" : "400",
              "&:hover": {
                backgroundColor: activeBillingTab === "ad-accounts" ? "#e7f0fd" : "rgba(0,0,0,0.04)",
              }
            }}
          >
            Ad accounts
          </Button>
          <Button
            variant="text"
            onClick={() => setActiveBillingTab("whatsapp")}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              py: "6px",
              px: "12px",
              fontSize: "14px",
              lineHeight: "20px",
              backgroundColor: activeBillingTab === "whatsapp" ? "#e7f0fd" : "transparent",
              color: activeBillingTab === "whatsapp" ? "rgb(28,43,51)" : "rgb(28,43,51)",
              fontWeight: activeBillingTab === "whatsapp" ? "bold" : "400",
              "&:hover": {
                backgroundColor: activeBillingTab === "whatsapp" ? "#e7f0fd" : "rgba(0,0,0,0.04)",
              }
            }}
          >
            WhatsApp Business accounts
          </Button>
        </Box>

        {activeBillingTab === "ad-accounts" && (
          <>
            {/* Account balance section */}
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "1px solid #dee1e5",
              pb: 1,
              mb: 1,
              mx: -3,
              px: 3
            }}>
              {/* Left side */}
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: "400", lineHeight: "20px", color: "rgb(28, 43, 51)", mb: 0.5 }}>
                  {activeBillingTab === "ad-accounts" ? "Ad account" : "WhatsApp Business account"}
                </Typography>
                <Typography sx={{ fontSize: "20px", fontWeight: "700", lineHeight: "24px", color: TEXT }}>
                  {currentAccount.name} ({currentAccount.id})
                </Typography>
              </Box>

              {/* Right side */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <Typography sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontFamily: '-apple-system, "system-ui", Arial, sans-serif',
                    color: "rgb(28, 43, 51)",
                    lineHeight: "20px"
                  }}>
                    Current balance
                  </Typography>
                  <svg
                    viewBox="0 0 14 14"
                    width="14"
                    height="14"
                    style={{ cursor: "default", display: "inline-block", verticalAlign: "middle" }}
                  >
                    <circle cx="7" cy="7" r="7" fill="rgb(40, 57, 67)" />
                    <circle cx="7" cy="4.5" r="0.95" fill="#ffffff" />
                    <rect x="6.1" y="6.5" width="1.8" height="4.5" rx="0.5" fill="#ffffff" />
                  </svg>
                </Box>
                <Typography sx={{ fontSize: "20px", fontWeight: "700", lineHeight: "24px", color: TEXT }}>
                  ₹ 0.00
                </Typography>
              </Box>
            </Box>

            {/* Transaction controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, flexWrap: "wrap", borderBottom: "1px solid #dee1e5", pb: 1, mx: -3, px: 3 }}>
              <Select
                value={activityViewType}
                onChange={(e) => setActivityViewType(e.target.value)}
                onOpen={() => setIsMenuOpen(true)}
                onClose={() => setIsMenuOpen(false)}
                size="small"
                sx={{
                  flex: "0 0 auto",
                  width: "150px",
                  height: "36px",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  color: TEXT,
                  backgroundColor: isMenuOpen ? "#e4e6eb" : "#ffffff",
                  borderRadius: "4px",
                  border: isMenuOpen ? "1px solid #e4e6eb" : "1px solid #cbd2d9",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    pr: "28px !important",
                    pl: "12px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "20px",
                    color: "rgb(28, 43, 51)",
                  },
                  "&:hover": {
                    backgroundColor: isMenuOpen ? "#d8dadf" : "#f5f6fa",
                    borderColor: isMenuOpen ? "#d8dadf" : "#8a8d91",
                  }
                }}
                IconComponent={() => (
                  <ArrowDropDown style={{ fontSize: "28px", fontWeight: "400", lineHeight: "20px", color: "rgb(28,43,51)", right: "8px", position: "absolute", pointerEvents: "none" }} />
                )}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  PaperProps: {
                    style: {
                      marginTop: "0px",
                    }
                  }
                }}
              >
                <MenuItem value="Transactions" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "20px", pl: "12px", color: "rgb(28, 43, 51)", "&:hover": { backgroundColor: "#f5f6fa" }, }}>Transactions</MenuItem>
                <MenuItem value="Account spending limit" sx={{ fontSize: "14px", fontWeight: "500", lineHeight: "20px", pl: "12px", color: "rgb(28, 43, 51)" }}>Account spending limit</MenuItem>
              </Select>

              <TextField
                placeholder="Search by transaction ID..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} fontWeight="400" lineHeight="20px" color="rgba(28, 43, 51, 0.65)" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  minWidth: "240px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    height: "36px",
                    fontSize: "14px",
                    fontWeight: "400",
                    backgroundColor: "#ffffff",
                    color: "rgba(28, 43, 51, 0.65)",
                    fontStyle: "normal",
                    lineHeight: "20px"
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "rgba(28, 43, 51, 0.65)",
                    opacity: 1,
                    fontSize: "14px",
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: "20px"
                  },
                }}
              />

              <Box ref={filtersRef} sx={{ position: "relative" }}>
                <IconButton
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{
                    border: "1px solid #cbd2d9",
                    borderRadius: "4px",
                    width: "36px",
                    height: "36px",
                    p: 0,
                    color: showFilters ? "#1877F2" : "#65676B",
                    backgroundColor: showFilters ? "#f5f6f8" : "transparent",
                    borderColor: showFilters ? "#1877F2" : "#cbd2d9",
                    "&:hover": {
                      borderColor: "#8a8d91",
                      backgroundColor: "#f5f6f8"
                    }
                  }}
                >
                  <Settings2 size={18} sx={{ color: "rgb(28, 43, 51)", fontWeight: "400" }} />
                </IconButton>

                {showFilters && (
                  <Paper
                    elevation={0}
                    sx={{
                      position: "absolute",
                      top: "42px",
                      right: 0,
                      width: "550px",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #dee1e5",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      p: 2.5,
                      zIndex: 1000,
                    }}
                  >
                    <Typography sx={{ fontSize: "15px", fontWeight: "700", color: TEXT, mb: 2 }}>
                      Use advanced filters to refine your search
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                      <Select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        size="small"
                        sx={{
                          height: "36px",
                          width: "160px",
                          fontSize: "14px",
                          fontWeight: "500",
                          backgroundColor: "#ffffff",
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cbd2d9",
                          },
                        }}
                      >
                        <MenuItem value="payment-status">Payment status</MenuItem>
                      </Select>

                      <Select
                        value={filterOperator}
                        onChange={(e) => setFilterOperator(e.target.value)}
                        size="small"
                        renderValue={(value) => value === "is" ? "is" : "is not"}
                        sx={{
                          height: "36px",
                          width: "80px",
                          fontSize: "14px",
                          fontWeight: "500",
                          backgroundColor: "#ffffff",
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cbd2d9",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              marginTop: "2px",
                            }
                          }
                        }}
                      >
                        <MenuItem
                          value="is"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            py: "8px",
                            pl: "12px",
                            backgroundColor: filterOperator === "is" ? "#e7f0fd !important" : "transparent",
                            "&:hover": {
                              backgroundColor: filterOperator === "is" ? "#e7f0fd !important" : "rgba(0,0,0,0.04)",
                            }
                          }}
                        >
                          <Box sx={{
                            width: 18, height: 18, borderRadius: "50%",
                            border: "1.5px solid #1877f2",
                            backgroundColor: "#ffffff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            <Box sx={{
                              width: 10, height: 10, borderRadius: "50%",
                              backgroundColor: "#1877f2",
                            }} />
                          </Box>
                          is
                        </MenuItem>
                        <MenuItem
                          value="is-not"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            py: "8px",
                            pl: "12px",
                            backgroundColor: filterOperator === "is-not" ? "#e7f0fd !important" : "transparent",
                            "&:hover": {
                              backgroundColor: filterOperator === "is-not" ? "#e7f0fd !important" : "rgba(0,0,0,0.04)",
                            }
                          }}
                        >
                          <Box sx={{
                            width: 18, height: 18, borderRadius: "50%",
                            border: "1.5px solid #bcc0c4",
                            backgroundColor: "#ffffff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }} />
                          is not
                        </MenuItem>
                      </Select>

                      <Select
                        multiple
                        value={filterValue}
                        onChange={(e) => setFilterValue(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                        size="small"
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return (
                              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#c01a22" }} />
                                <span style={{ color: "rgba(28,43,51,0.6)" }}>Select values...</span>
                              </Box>
                            );
                          }
                          return (
                            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#c01a22" }} />
                              <span style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "145px"
                              }}>
                                {selected.join(", ")}
                              </span>
                            </Box>
                          );
                        }}
                        sx={{
                          height: "36px",
                          width: "200px",
                          fontSize: "14px",
                          fontWeight: "500",
                          backgroundColor: "#ffffff",
                          borderRadius: "4px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cbd2d9",
                          },
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            pr: "24px !important",
                          }
                        }}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "left"
                          },
                          transformOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                          },
                          PaperProps: {
                            style: {
                              maxHeight: 280,
                              marginBottom: "4px",
                            }
                          }
                        }}
                      >
                        {[
                          "Applied to invoice",
                          "Bank refund failed",
                          "Bank refund",
                          "Failed",
                          "Funded",
                          "Paid (bank refund cancelled)",
                          "Paid",
                          "Pending",
                          "Processing refund",
                          "Processing",
                          "Refund failed",
                          "Refunded",
                          "Refund reversed"
                        ].map((option) => {
                          const isChecked = filterValue.indexOf(option) > -1;
                          return (
                            <MenuItem
                              key={option}
                              value={option}
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                py: "8px",
                                pl: "12px",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: isChecked ? "#e7f0fd !important" : "transparent",
                                "&:hover": {
                                  backgroundColor: isChecked ? "#e7f0fd !important" : "rgba(0,0,0,0.04)",
                                }
                              }}
                            >
                              <Checkbox
                                checked={isChecked}
                                size="medium"
                                sx={{
                                  p: 0,
                                  mr: "12px",
                                  color: "#bcc0c4",
                                  "&.Mui-checked": {
                                    color: "#1877f2",
                                  },
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "22px",
                                  }
                                }}
                              />
                              {option}
                            </MenuItem>
                          );
                        })}
                      </Select>

                      <IconButton
                        sx={{
                          border: "1px solid #cbd2d9",
                          borderRadius: "4px",
                          width: "36px",
                          height: "36px",
                          color: "#65676B",
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>

                      <IconButton
                        sx={{
                          border: "1px solid #cbd2d9",
                          borderRadius: "4px",
                          width: "36px",
                          height: "36px",
                          color: "#65676B",
                        }}
                      >
                        <Plus size={16} />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setShowFilters(false)}
                        sx={{
                          textTransform: "none",
                          borderColor: "#cbd2d9",
                          color: TEXT,
                          fontWeight: "600",
                          fontSize: "15px",
                          height: "36px",
                          px: 3,
                          "&:hover": {
                            borderColor: "#8a8d91",
                            backgroundColor: "rgba(0,0,0,0.02)",
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        disabled
                        sx={{
                          textTransform: "none",
                          color: "#e7f0fd !important",
                          backgroundColor: "#1877F2 !important",
                          fontWeight: "600",
                          fontSize: "15px",
                          height: "36px",
                          px: 3,
                          boxShadow: "none",
                          "&.Mui-disabled": {
                            backgroundColor: "#e7f0fd",
                            color: "#1877f2",
                            opacity: 0.6,
                          }
                        }}
                      >
                        Apply filters
                      </Button>
                    </Box>
                  </Paper>
                )}
              </Box>

              <TextField
                placeholder="Reference number"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: "0 0 auto",
                  width: "180px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    height: "36px",
                    color: "rgb(28, 43, 51)",
                    fontSize: "14px",
                    fontWeight: "400",
                    backgroundColor: "#ffffff",
                    "&:hover": { backgroundColor: "#f5f6fa" },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "#000000",
                    opacity: 1,
                  },
                }}
              />

              {/* Date range picker button */}
              <Box sx={{
                display: "flex", alignItems: "center", gap: "10px",
                px: "12px", height: "36px", border: "1px solid #cbd2d9",
                borderRadius: "4px", backgroundColor: "#ffffff", cursor: "pointer",
                flex: "0 0 auto",
                width: "260px",
                "&:hover": {
                  borderColor: "#8a8d91",
                  backgroundColor: "rgba(0,0,0,0.02)"
                }
              }}>
                <CalendarDays size={16} color="#65676B" strokeWidth={2.2} />
                <T sx={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "rgb(28, 43, 51)",
                  fontSize: "15px",
                  lineHeight: "23px",
                  flexGrow: 1,
                  ml: 1,
                  whiteSpace: "nowrap"
                }}>30 May 2026 - 5 Jun 2026</T>
                <ArrowDropDown sx={{ color: "#000", fontSize: 28 }} />
              </Box>
            </Box>
          </>
        )}

        {/* Empty state message with Telescope SVG */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
          }}
        >
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <svg width="360" height="240" viewBox="0 0 640 400" fill="none">
              <defs>
                {/* Premium metallic gradient for the telescope tube segments */}
                <linearGradient id="metal-gradient-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d0e6ff" />
                  <stop offset="25%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#a1c5e8" />
                  <stop offset="85%" stopColor="#5d85a6" />
                  <stop offset="100%" stopColor="#8bb6de" />
                </linearGradient>

                {/* Darker gradient for internal rim/recessed details */}
                <linearGradient id="metal-gradient-dark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c8aa6" />
                  <stop offset="30%" stopColor="#a4c3e3" />
                  <stop offset="100%" stopColor="#3b566c" />
                </linearGradient>

                {/* Glowing cyan-blue gradient for the front lens glass reflection */}
                <linearGradient id="lens-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e3f4ff" />
                  <stop offset="70%" stopColor="#82b3e8" />
                  <stop offset="100%" stopColor="#3a7ebd" />
                </linearGradient>

                {/* Drop shadow for the overall illustration to add modern depth */}
                <filter id="subtle-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0066e2" floodOpacity={0.16} />
                </filter>
              </defs>

              <g filter="url(#subtle-shadow)">
                {/* Stationary Tripod Structure (Centered around X=320) */}
                {/* Center leg */}
                <line x1="320" y1="210" x2="320" y2="360" stroke="#0066e2" strokeWidth={11} strokeLinecap="round" />
                {/* Left leg */}
                <line x1="320" y1="210" x2="245" y2="360" stroke="#0066e2" strokeWidth={11} strokeLinecap="round" />
                {/* Right leg */}
                <line x1="320" y1="210" x2="395" y2="360" stroke="#0066e2" strokeWidth={11} strokeLinecap="round" />

                {/* Tripod Platform */}
                <line x1="285" y1="210" x2="355" y2="210" stroke="#0066e2" strokeWidth={10} strokeLinecap="round" />

                {/* Hinge/Head Stem connecting to the cradle bottom (from Y=173 to Y=210) */}
                <line x1="320" y1="173" x2="320" y2="210" stroke="#0066e2" strokeWidth={12} strokeLinecap="round" />

                {/* Rotated Assembly: Telescope Tube AND Cradle U-shape rotate together around pivot (320, 173) */}
                <g transform="rotate(-20 320 173)">
                  {/* Cradle U-shape (Placed behind/underneath the tube) */}
                  <path d="M 287,140 A 33,33 0 0,0 353,140" stroke="#0066e2" strokeWidth={10} fill="none" strokeLinecap="round" />

                  {/* Hinge Pivot cap (Center of rotation) */}
                  <circle cx="320" cy="173" r="10" fill="#0055c4" />

                  {/* Eyepiece Cap (Leftmost, Segment 0) */}
                  <path d="M 120,132 L 135,132 A 3.2,8 0 0,1 135,148 L 120,148 A 3.2,8 0 0,0 120,132 Z" fill="url(#metal-gradient-dark)" />

                  {/* Segment 1 (Eyepiece connector) */}
                  <path d="M 135,129 L 160,129 A 4.4,11 0 0,1 160,151 L 135,151 A 4.4,11 0 0,0 135,129 Z" fill="url(#metal-gradient-body)" />

                  {/* Segment 2 */}
                  <path d="M 160,125 L 190,125 A 6,15 0 0,1 190,155 L 160,155 A 6,15 0 0,0 160,125 Z" fill="url(#metal-gradient-body)" />

                  {/* Segment 3 */}
                  <path d="M 190,119 L 230,119 A 8.4,21 0 0,1 230,161 L 190,161 A 8.4,21 0 0,0 190,119 Z" fill="url(#metal-gradient-body)" />

                  {/* Segment 4 (Main body) */}
                  <path d="M 230,111 L 390,111 A 11.6,29 0 0,1 390,169 L 230,169 A 11.6,29 0 0,0 230,111 Z" fill="url(#metal-gradient-body)" />

                  {/* Segment 5 (Front rim bell) */}
                  <path d="M 390,102 L 470,102 A 15.2,38 0 0,1 470,178 L 390,178 A 15.2,38 0 0,0 390,102 Z" fill="url(#metal-gradient-body)" />

                  {/* Outer Rim Ellipse for Lens Opening */}
                  <ellipse cx="470" cy="140" rx="15.2" ry="38" fill="url(#metal-gradient-dark)" />

                  {/* Glowing Front Lens Glass (Recessed slightly to the left) */}
                  <ellipse cx="464" cy="140" rx="13.5" ry="35.5" fill="url(#lens-gradient)" />

                  {/* Shiny lens highlight overlay */}
                  <ellipse cx="461" cy="126" rx="5.5" ry="15" fill="#ffffff" opacity={0.65} transform="rotate(-10 461 126)" />
                </g>

                {/* Stationary Hinge center cap (drawn on top of the rotated pivot for overlap depth) */}
                <circle cx="320" cy="173" r="8" fill="#0066e2" />
              </g>
            </svg>
          </Box>

          <Typography sx={{ fontWeight: "700", fontSize: "18px", mb: 1, color: TEXT }}>
            No transactions
          </Typography>

          <Typography
            align="center"
            sx={{ maxWidth: 800, fontSize: "14px", fontWeight: "400", color: MUTED, mb: 3, color: "rgb(28, 43, 51)" }}
          >
            You have no transactions during this period. Update the date range or remove filters to expand your search.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

/* ─── Billing Header ─── */
function BillingHeader() {
  const [showOtherAssetsDropdown, setShowOtherAssetsDropdown] = useState(false);
  const otherAssetsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (otherAssetsRef.current && !otherAssetsRef.current.contains(event.target)) {
        setShowOtherAssetsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{
      height: 50, display: "flex", alignItems: "center",
      px: "20px", gap: "12px",
      backgroundColor: "transparent",
      mt: 1,
      flexShrink: 0,
    }}>
      <T sx={{ ...H_SEC, fontWeight: 700 }}>Billing &amp; payments</T>

      {/* Other assets dropdown */}
      <Box ref={otherAssetsRef} sx={{ position: "relative", mt: 1, pl: "8px" }}>
        <Box
          // onClick={() => setShowOtherAssetsDropdown(!showOtherAssetsDropdown)}
          sx={{
            display: "flex", alignItems: "center",
            px: "14px", height: "36px",
            width: "300px",
            borderRadius: RADIUS, cursor: "pointer", backgroundColor: WHITE,
            border: "1px solid #dee1e5",
            "&:hover": { backgroundColor: "#f5f6fa" },
          }}
        >
          <Box sx={{
            width: 28, height: 28, borderRadius: "50%",
            backgroundColor: "#f0f2f5", display: "flex",
            alignItems: "center", justifyContent: "center",
            mr: "10px",
          }}>
            <LayoutGrid size={15} color={TEXT} strokeWidth={1.6} />
          </Box>
          <T sx={{ ...T_BODY, fontSize: "14px", color: TEXT, fontWeight: 400, flexGrow: 1 }}>Vinayaka Oam A</T>
          <ArrowDropDown sx={{ color: TEXT, fontSize: 28 }} />
        </Box>

        {showOtherAssetsDropdown && (
          <Box sx={{
            position: "absolute",
            top: "50px",
            left: 0,
            width: "360px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #dee1e5",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            p: "16px",
            zIndex: 1100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {/* Search Input */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              px: "12px",
              width: "100%",
              height: "36px",
              border: "1px solid #cbd2d9",
              borderRadius: "4px",
              mb: "16px",
              backgroundColor: "#ffffff",
            }}>
              <Search size={16} color="#8a8d91" />
              <input
                placeholder="Search for a business portfolio"
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "14px",
                  fontFamily: FONT,
                  color: TEXT,
                }}
              />
            </Box>

            {/* Divider line below search box */}
            <Box sx={{ width: "calc(100% + 32px)", mx: "-16px", borderBottom: "1px solid #dee1e5", mb: "16px" }} />

            {/* Illustration */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
              <svg width="180" height="130" viewBox="0 0 240 180" fill="none">
                {/* Mound */}
                <path d="M40,110 C80,40 160,40 200,110 Z" fill="#e4e6eb" opacity="0.7" />
                {/* Water pool */}
                <path d="M15,120 C40,105 200,105 225,120 C200,135 40,135 15,120 Z" fill="#4B6A7A" opacity="0.8" />
                <path d="M25,125 C50,115 190,115 215,125 C190,135 50,135 25,125 Z" fill="#38515E" />

                {/* Tiny island details */}
                <ellipse cx="180" cy="115" rx="10" ry="2" fill="#38515E" />
                <ellipse cx="65" cy="135" rx="20" ry="4" fill="#38515E" />

                {/* Shovel handle */}
                <line x1="170" y1="80" x2="148" y2="145" stroke="#a8b3bf" strokeWidth="4" strokeLinecap="round" />
                {/* Shovel blade */}
                <path d="M138,145 L158,138 L162,148 L142,155 Z" fill="#cbd2d9" />
              </svg>
            </Box>

            {/* No Results Text */}
            <T sx={{ fontSize: "14px", fontWeight: "bold", color: TEXT, mb: 2 }}>
              No results
            </T>

            {/* Clear Search Button */}
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                borderColor: "#cbd2d9",
                color: TEXT,
                fontWeight: "normal",
                fontSize: "14px",
                px: 2,
                py: 0.5,
                borderRadius: "4px",
                "&:hover": {
                  borderColor: "#8a8d91",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                }
              }}
            >
              Clear search
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ position: "relative", width: 36, height: 36, cursor: "pointer" }}>
        {/* Main avatar */}
        <Box sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg viewBox="0 0 36 36" width="100%" height="100%" style={{ display: "block" }}>
            {/* Background circle */}
            <circle cx="18" cy="18" r="18" fill="#e4e6eb" />
            {/* Head */}
            <circle cx="18" cy="12" r="6.5" fill="#8a8d91" />
            {/* Shoulders */}
            <path d="M18 21c-6.6 0-12 4.5-12 10v5h24v-5c0-5.5-5.4-10-12-10z" fill="#8a8d91" />
          </svg>
        </Box>
        {/* Facebook badge */}
        <Box sx={{
          position: "absolute",
          bottom: -1,
          right: -1,
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "2px solid #ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg viewBox="0 0 24 24" width="14" height="14" style={{ display: "block" }}>
            <path fill="#1877f2" d="M24 12a12 12 0 1 0-13.875 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385A12 12 0 0 0 24 12z" />
            <path fill="#ffffff" d="M17.135 15.646l.532-3.47h-3.328V9.926c0-.949.465-1.874 1.956-1.874h1.513V5.1s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.67v2.64H7.078v3.47h3.047v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.796z" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}

/* ─── Root Export ─── */
export default function BillingPayments() {
  const [activeItem, setActiveItem] = useState("payment-settings");
  const [notifications, setNotifications] = useState({ setup: true, tax: true });
  const [currentAccount, setCurrentAccount] = useState({
    name: "Vinayaka Oam A",
    id: "1144652500438518"
  });

  const accounts = [
    { name: "Ashwayana Reality Groups", id: "498042116267790" },
    { name: "Ashwayana Reality Groups", id: "988692073881733" }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: "flex", flexDirection: "column",
        /* EXACT Meta page background gradient */
        backgroundImage: PAGE_BG,
        backgroundColor: WHITE,
      }}>
        <BillingHeader />

        <Box sx={{
          display: "flex", gap: "16px",
          p: "20px",
        }}>
          <SecondaryNav active={activeItem} setActive={setActiveItem} />
          {activeItem === "payment-settings" ? (
            <PaymentSettingsView
              notifications={notifications}
              setNotifications={setNotifications}
              currentAccount={currentAccount}
              setCurrentAccount={setCurrentAccount}
              accounts={accounts}
            />
          ) : (
            <PaymentActivityView
              notifications={notifications}
              setNotifications={setNotifications}
              currentAccount={currentAccount}
              setCurrentAccount={setCurrentAccount}
              accounts={accounts}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
