import { useState, useEffect, useRef } from "react";
import { Box, Typography, Select, MenuItem, TextField, IconButton, Paper, Button, InputAdornment, Checkbox, Radio } from "@mui/material";
import {
  CreditCard, Activity, Info, X, ChevronDown,
  LayoutGrid, Edit3, HelpCircle, Settings2,
  MinusCircle, PlusCircle, Settings, Search,
  Plus, Trash2
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
const FONT = '-apple-system, "system-ui", Arial, sans-serif';
const TEXT = "#1c2b33";          // rgb(28,43,51) — all body text
const MUTED = "rgba(28,43,51,0.65)"; // subtext
const BLUE = "#0a78be";          // rgb(10,120,190) — links & active
const WHITE = "#ffffff";
const RADIUS = "4px";              // card border-radius from Meta

/* ─── Meta exact page background gradient ─── */
const PAGE_BG = `
  radial-gradient(103.89% 81.75% at 95.41% 106.34%, #EAF8EF 6%, rgba(234,248,239,0) 79.68%),
  radial-gradient(297.85% 151.83% at -21.39% 8.81%, #FAF1F1 0%, #FAF1F1 15.29%, #F3EDF5 21.39%, #E5F0FA 40.79%)
`.trim();

/* ─── Typography helpers ─── */
// Meta heading: 20px / 700 / #1c2b33
const H_PAGE = { fontSize: "20px", fontWeight: 700, lineHeight: "24px", color: TEXT, };
// Meta section heading: 18px / 700
const H_SEC = { fontSize: 18, fontWeight: 700, lineHeight: 1.2223, color: TEXT };
// Banner title: 15px / 700
const H_CARD = { fontSize: "15px", fontWeight: 700, lineHeight: "20px", color: TEXT };
// Body text: 14px / 400
const T_BODY = { fontSize: "15px", fontWeight: 400, lineHeight: "20px", color: "#000000ff" };
// Label (Business name etc): 15px / 700
const T_LABEL = { fontSize: "15px", fontWeight: 700, lineHeight: "20px", color: TEXT };
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
function T({ children, sx = {} }) {
  return <Typography sx={{ fontFamily: FONT, ...sx }}>{children}</Typography>;
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
      <T sx={{ ...T_BODY }}>{children}</T>
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
      alignSelf: "flex-start", py: "8px", px: collapsed ? "4px" : "6px",
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
  const [expanded, setExpanded] = useState(false);

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
        <T sx={{ ...T_LABEL, fontSize: "16px", fontWeight: 600, m: "10px" }}>Notifications</T>
        {totalCount > 1 && (
          <Box
            onClick={() => setExpanded(!expanded)}
            sx={{
              color: "#0064d1",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
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
            pl: "20px", pr: "20px", py: "18px",
            borderLeft: `6px solid ${TEXT}`,
          }}>
            <Box sx={{ flex: 1 }}>
              <T sx={{ fontSize: "15px", fontWeight: 700, mb: "4px", color: TEXT }}>
                Set up your account
              </T>
              <Box sx={{ pl: "12px" }}>
                <T sx={{ fontSize: "14px", color: TEXT, mb: "12px", fontWeight: 400 }}>
                  Simply add your first payment method and billing details.
                </T>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <Box sx={{
                    display: "inline-flex", alignItems: "center",
                    px: "16px", height: "36px", borderRadius: RADIUS,
                    backgroundColor: "#0064d1", cursor: "pointer",
                    "&:hover": { backgroundColor: "#0058ba" },
                  }}>
                    <T sx={{ fontSize: "14px", color: WHITE, fontWeight: 600 }}>Get started</T>
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
                    <T sx={{ fontSize: "14px", color: TEXT, fontWeight: 500 }}>Dismiss</T>
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
            pl: "20px", pr: "20px", py: "18px",
            borderLeft: `6px solid ${TEXT}`,
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
                    backgroundColor: "#0064d1", cursor: "pointer",
                    "&:hover": { backgroundColor: "#0058ba" },
                  }}>
                    <T sx={{ fontSize: "14px", color: WHITE, fontWeight: 600 }}>Verify tax info</T>
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
                    <T sx={{ fontSize: "14px", color: TEXT, fontWeight: 500 }}>Dismiss</T>
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
function CurrentBalanceCard() {
  return (
    <Card sx={{ px: "20px", py: "20px", mb: "16px" }}>
      <T sx={{ ...T_LABEL, mb: "20px", fontWeight: 700 }}>Current balance</T>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <T sx={{ ...T_BAL, fontSize: "32px", fontWeight: 400, lineHeight: "36px" }}>₹ 0.00</T>
        <T sx={{ ...T_MUTED, fontSize: "12px", color: MUTED }}>+ any applicable fees</T>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: "12px" }}>
          <T sx={T_LABEL}>Payment methods</T>
          <Info size={14} color={MUTED} strokeWidth={1.6} style={{ cursor: "pointer" }} />
        </Box>
        <OutlineBtn onClick={onAddPaymentMethod}>Add payment method</OutlineBtn>
      </Box>
      <T sx={T_BODY}>You haven't added any payment methods.</T>
    </Card>
  );
}

/* ─── Payment Activity Inline ─── */
// function PaymentActivityInlineCard() {
//   return (
//     <Card sx={{ px: "20px", py: "16px", mb: "12px" }}>
//       <T sx={{ ...T_LABEL, mb: "10px" }}>Payment activity</T>
//       <Box sx={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
//         <T sx={T_BODY}>You have no recent spending.</T>
//         <T sx={T_LINK}>Create an ad</T>
//       </Box>
//     </Card>
//   );
// }

/* ─── Business Info ─── */
function BusinessInfoCard() {
  return (
    <Card sx={{ px: "20px", py: "16px", border: "1px solid #dee1e5", mb: "12px" }}>
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "20px",
      }}>
        <T sx={{ ...T_LABEL, fontSize: "16px" }}>Business info</T>
        <OutlineBtn sx={{ px: "16px", height: "32px" }}>Edit</OutlineBtn>
      </Box>
      <Box sx={{ display: "flex", gap: "120px" }}>
        {/* Column 1 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Box>
            <T sx={{ ...T_LABEL, fontSize: "14px", mb: "4px" }}>Business name</T>
            <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>-</T>
          </Box>
          <Box>
            <T sx={{ ...T_LABEL, fontSize: "14px", mb: "4px" }}>Tax ID</T>
            <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>-</T>
          </Box>
        </Box>

        {/* Column 2 */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <T sx={{ ...T_LABEL, fontSize: "14px", mb: "4px" }}>Address</T>
          <T sx={{ ...T_BODY, fontSize: "14px", color: MUTED }}>India</T>
        </Box>

        {/* Column 3 */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <T sx={{ ...T_LABEL, fontSize: "14px", mb: "4px" }}>Currency</T>
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
      <T sx={{ ...T_LABEL, fontSize: "16px", mt: "8px", mb: "18px" }}>Help Centre</T>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map(({ icon: Icon, label }) => (
          <Box key={label} sx={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
            <Box sx={{ display: "flex", alignItems: "center", height: "20px" }}>
              <Icon size={18} color="#65676B" strokeWidth={1.6} />
            </Box>
            <T sx={T_LINK}>{label}</T>
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
        <T sx={{ ...H_PAGE, fontWeight: 650 }}>Payment settings</T>

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
          <CurrentBalanceCard />
          <PaymentMethodsCard onAddPaymentMethod={() => setShowSetupModal(true)} />
          {/* <PaymentActivityInlineCard /> */}
          <BusinessInfoCard />
        </Box>
        <Box sx={{ width: 340, minWidth: 360, flexShrink: 0 }}>
          {/* <PaymentHistoryCard /> */}
          <HelpCentreCard />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", mt: "14px", ml: 3, mb: "20px" }}>
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
            paddingTop: "50vh",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 550,
              borderRadius: 1,
              overflow: "hidden",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              p: 3,
              mb: 3,
              border: "1px solid #e4e6eb",
              //   backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Add payment Information
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                borderBottom: "1px solid #E4E6EB",
              }}
            >
              {/* Left column with text */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  Business location and currency
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "16px", mb: 2 }}
                >
                  India, Indian Rupee INR
                </Typography>
              </Box>

              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ fontSize: "16px", p: 1 }}
              >
                Edit
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                borderBottom: "1px solid #E4E6EB",
              }}
            >
              {/* Left column with text */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  Business and tax info
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "16px", mb: 2 }}
                >
                  Optional – Add a tax ID or address
                </Typography>
              </Box>

              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ fontSize: "16px", p: 1 }}
              >
                Edit
              </Typography>
            </Box>

            {budgetOptions.map((option) => (
              <Box
                key={option.value}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                  p: 1,
                  borderRadius: 2,
                  border:
                    selectedBudget === option.value
                      ? "2px solid #1877F2"
                      : "1px solid #ccc",
                  cursor: "pointer",
                  bgcolor:
                    selectedBudget === option.value
                      ? "#E8F0FE"
                      : "white",
                }}
                onClick={() => setSelectedBudget(option.value)}
              >
                <Typography
                  variant="subtitle2"
                  size="small"
                  sx={{ fontSize: "14px" }}
                >
                  {option.label}
                </Typography>

                <Radio
                  checked={selectedBudget === option.value}
                  value={option.value}
                  onChange={() => setSelectedBudget(option.value)}
                  sx={{
                    p: 0,
                    color: "#1877F2",
                    "&.Mui-checked": {
                      color: "#1877F2",
                    },
                  }}
                />
              </Box>
            ))}
            <Box sx={{ borderTop: "1px solid #E4E6EB", mt: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 1,
                  mt: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                Add payment method
              </Typography>
              {paymentOptions.map((option) => (
                <Box
                  key={option.value}
                  sx={{
                    display: "flex",
                    //   alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1.2,
                    //   p: 1,
                    width: "100%",
                    cursor: "pointer",
                    bgcolor:
                      selectedPayment === option.value
                        ? "#E8F0FE"
                        : "#fff",
                  }}
                  onClick={() => setSelectedPayment(option.value)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: "16px" }}
                    >
                      {option.label}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {option.icons.map((icon, idx) => (
                        <Box
                          component="img"
                          key={idx}
                          src={icon}
                          alt={`${option.label} logo ${idx}`}
                          sx={{ width: 30, height: 24 }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Radio
                    checked={selectedPayment === option.value}
                    value={option.value}
                    onChange={() => setSelectedPayment(option.value)}
                    sx={{
                      color: "#1877F2",
                      "&.Mui-checked": {
                        color: "#1877F2",
                      },
                      p: 0,
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={hasAdCredit}
                  onChange={(e) => setHasAdCredit(e.target.checked)}
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "16px" }}
                >
                  I have an ad credit to claim.
                </Typography>
              </Box>

              {hasAdCredit && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1.5,
                    fontSize: "14px",
                    color: "#65676B",
                    backgroundColor: "#f7fbfe",
                  }}
                >
                  Even with an ad credit, you'll need to add a payment
                  method to run ads. You can claim the ad credit after
                  entering your payment information.
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 6,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LockIcon sx={{ color: "grey", fontSize: "16px" }} />
              <Typography variant="subtitle1" sx={{ fontSize: "14px" }}>
                Your payment methods are saved and stored securely.
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ fontSize: "14px" }}
              >
                Terms and applicable privacy policies apply
              </Typography>
            </Box>
            <Box
              sx={{
                pt: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                onClick={() => setShowSetupModal(false)}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#1877F2",
                }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                // disabled={!selectedSetup}
                // onClick={handleContinueFromSetup}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "14px",
                  bgcolor: "#1877F2",
                  "&:hover": { bgcolor: "#166FE5" },
                  px: 3,
                }}
              >
                Continue
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
              fontSize: "16px",
              backgroundColor: activeBillingTab === "ad-accounts" ? "#e7f0fd" : "transparent",
              color: activeBillingTab === "ad-accounts" ? "#1877F2" : "#65676B",
              fontWeight: activeBillingTab === "ad-accounts" ? "bold" : "600",
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
              fontSize: "16px",
              backgroundColor: activeBillingTab === "whatsapp" ? "#e7f0fd" : "transparent",
              color: activeBillingTab === "whatsapp" ? "#1877F2" : "#65676B",
              fontWeight: activeBillingTab === "whatsapp" ? "bold" : "600",
              "&:hover": {
                backgroundColor: activeBillingTab === "whatsapp" ? "#e7f0fd" : "rgba(0,0,0,0.04)",
              }
            }}
          >
            WhatsApp Business accounts
          </Button>
        </Box>

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
            <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#65676B", mb: 0.5 }}>
              {activeBillingTab === "ad-accounts" ? "Ad account" : "WhatsApp Business account"}
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: TEXT }}>
              {currentAccount.name} ({currentAccount.id})
            </Typography>
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#65676B" }}>
                Current balance
              </Typography>
              <Info size={14} color="#65676B" />
            </Box>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: TEXT }}>
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
              fontSize: "15px",
              fontWeight: "600",
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
              },
              "&:hover": {
                backgroundColor: isMenuOpen ? "#d8dadf" : "#f5f6fa",
                borderColor: isMenuOpen ? "#d8dadf" : "#8a8d91",
              }
            }}
            IconComponent={() => (
              <ArrowDropDown style={{ color: TEXT, right: "8px", position: "absolute", pointerEvents: "none" }} />
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
            <MenuItem value="Transactions" sx={{ fontSize: "15px", fontWeight: "600", pl: "12px" }}>Transactions</MenuItem>
            <MenuItem value="Account spending limit" sx={{ fontSize: "15px", fontWeight: "600", pl: "12px" }}>Account spending limit</MenuItem>
          </Select>

          <TextField
            placeholder="Search by transaction ID..."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} color="#65676B" />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              minWidth: "240px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                height: "36px",
                fontSize: "15px",
                fontWeight: "600",
                backgroundColor: "#ffffff",
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
                backgroundColor: showFilters ? "rgba(24,119,242,0.05)" : "transparent",
                borderColor: showFilters ? "#1877F2" : "#cbd2d9",
                "&:hover": {
                  borderColor: "#8a8d91",
                  backgroundColor: "rgba(0,0,0,0.02)"
                }
              }}
            >
              <Settings2 size={18} />
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
                  <Search size={14} color="#65676B" />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: "0 0 auto",
              width: "180px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                height: "36px",
                fontSize: "15px",
                fontWeight: "600",
                backgroundColor: "#ffffff",
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <T sx={{ fontSize: "15px", fontWeight: "600", color: TEXT, flexGrow: 1, ml: 1, whiteSpace: "nowrap" }}>30 May 2026 - 5 Jun 2026</T>
            <ArrowDropDown sx={{ color: "#65676B", fontSize: 28 }} />
          </Box>
        </Box>

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
            <svg width="240" height="150" viewBox="0 0 240 150" fill="none">
              {/* Clouds */}
              <path d="M40,110 C20,110 10,120 15,130 C20,135 40,135 50,130 Q60,115 80,120 Q90,110 110,115 C130,110 150,125 160,130 Q170,120 185,122 C200,120 215,135 200,140 L40,140 Z" fill="#e4e6eb" opacity="0.6" />

              {/* Tripod legs */}
              <line x1="120" y1="80" x2="95" y2="140" stroke="#4F5E7B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="120" y1="80" x2="145" y2="140" stroke="#4F5E7B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="120" y1="80" x2="120" y2="140" stroke="#374357" strokeWidth="4.5" strokeLinecap="round" />

              {/* Tripod connector */}
              <rect x="115" y="75" width="10" height="10" rx="2" fill="#374357" />

              {/* Telescope tube */}
              <g transform="rotate(-20 120 70)">
                {/* Main body */}
                <rect x="80" y="60" width="70" height="16" rx="2" fill="#B0C4DE" />
                {/* Scope finder */}
                <rect x="95" y="52" width="25" height="5" rx="1" fill="#708090" />
                <line x1="100" y1="57" x2="100" y2="60" stroke="#708090" strokeWidth="2" />
                <line x1="115" y1="57" x2="115" y2="60" stroke="#708090" strokeWidth="2" />
                {/* Lens ring */}
                <rect x="76" y="58" width="4" height="20" rx="1" fill="#708090" />
                {/* Eyepiece mount */}
                <rect x="150" y="64" width="12" height="8" rx="1" fill="#708090" />
                <path d="M162,62 L172,58 L175,64 L162,70 Z" fill="#374357" />
              </g>
            </svg>
          </Box>

          <Typography sx={{ fontWeight: "600", fontSize: "18px", mb: 1, color: TEXT }}>
            No transactions
          </Typography>

          <Typography
            align="center"
            sx={{ maxWidth: 460, fontSize: "15px", fontWeight: "400", color: "#4f5054", mb: 3 }}
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
      <T sx={{ ...H_SEC, fontWeight: 650 }}>Billing &amp; payments</T>

      {/* Other assets dropdown */}
      <Box ref={otherAssetsRef} sx={{ position: "relative" }}>
        <Box
          onClick={() => setShowOtherAssetsDropdown(!showOtherAssetsDropdown)}
          sx={{
            display: "flex", alignItems: "center",
            px: "14px", height: "40px", mt: 1,
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
          <T sx={{ ...T_BODY, fontSize: "16px", color: TEXT, fontWeight: 600, flexGrow: 1 }}>Other assets</T>
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
    name: "Gorantla Machanna",
    id: "498042116267790"
  });

  const accounts = [
    { name: "Gorantla Machanna", id: "498042116267790" },
    { name: "Gorantla Machanna", id: "988692073881733" }
  ];

  return (
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
  );
}
