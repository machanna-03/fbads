import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  CreditCard, Activity, Info, X, ChevronDown,
  LayoutGrid, Edit3, HelpCircle, Settings2,
  MinusCircle, PlusCircle,
} from "lucide-react";

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

/* ─── Secondary Nav Panel ─── */
function SecondaryNav({ active, setActive }) {
  const items = [
    { id: "payment-settings", icon: CreditCard, label: "Payment settings" },
    { id: "payment-activity", icon: Activity, label: "Payment activity" },
  ];
  return (
    <Card sx={{
      width: "233px", height: '156px', flexShrink: 0,
      alignSelf: "flex-start", py: "4px",
    }}>
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = id === active;
        return (
          <Box
            key={id}
            onClick={() => setActive(id)}
            sx={{
              display: "flex", alignItems: "center", gap: "10px",
              px: "14px", py: "10px", cursor: "pointer",
              backgroundColor: isActive ? "#e7f0fd" : "transparent",
              "&:hover": { backgroundColor: isActive ? "#e7f0fd" : "rgba(0,0,0,0.04)" },
            }}
          >
            <Icon size={16} color={isActive ? BLUE : TEXT} strokeWidth={1.6} />
            <T sx={isActive ? T_NAV_A : T_NAV}>{label}</T>
          </Box>
        );
      })}
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: "12px", py: "8px" }}>
        <LayoutGrid size={14} color={MUTED} style={{ cursor: "pointer" }} />
      </Box>
    </Card>
  );
}

/* ─── Setup Banner ─── */
function SetupBanner({ onDismiss }) {
  return (
    <Card sx={{ px: "16px", py: "14px", mb: "12px", position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <Info size={15} color={TEXT} style={{ flexShrink: 0, marginTop: "2px" }} strokeWidth={1.6} />
        <Box sx={{ flex: 1 }}>
          <T sx={{ ...H_CARD, mb: "4px" }}>Set up your account</T>
          <T sx={{ ...T_BODY, mb: "12px" }}>
            Simply add your first payment method and billing details.
          </T>
          <Box sx={{ display: "flex", gap: "8px" }}>
            {/* Get started — Meta primary button */}
            <Box sx={{
              display: "inline-flex", alignItems: "center",
              px: "16px", height: "32px", borderRadius: RADIUS,
              backgroundColor: "#0064d1", cursor: "pointer",
              "&:hover": { backgroundColor: "#0058ba" },
            }}>
              <T sx={{ ...T_BODY, color: WHITE, fontWeight: 600 }}>Get started</T>
            </Box>
            <OutlineBtn onClick={onDismiss}>Dismiss</OutlineBtn>
          </Box>
        </Box>
        <Box
          onClick={onDismiss}
          sx={{
            width: 24, height: 24, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", borderRadius: "50%",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.07)" }, flexShrink: 0,
          }}
        >
          <X size={14} color={MUTED} />
        </Box>
      </Box>
    </Card>
  );
}

/* ─── Current Balance ─── */
function CurrentBalanceCard() {
  return (
    <Card sx={{ px: "20px", py: "16px", mb: "12px" }}>
      <T sx={{ ...T_LABEL, mb: "10px" }}>Current balance</T>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <T sx={T_BAL}>₹ 0.00</T>
        <T sx={T_MUTED}>+ any applicable fees</T>
      </Box>
    </Card>
  );
}

/* ─── Payment Methods ─── */
function PaymentMethodsCard() {
  return (
    <Card sx={{ px: "20px", py: "16px", mb: "12px" }}>
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "12px",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <T sx={T_LABEL}>Payment methods</T>
          <Info size={14} color={MUTED} strokeWidth={1.6} style={{ cursor: "pointer" }} />
        </Box>
        <OutlineBtn>Add payment method</OutlineBtn>
      </Box>
      <T sx={T_BODY}>You haven't added any payment methods.</T>
    </Card>
  );
}

/* ─── Payment Activity Inline ─── */
function PaymentActivityInlineCard() {
  return (
    <Card sx={{ px: "20px", py: "16px", mb: "12px" }}>
      <T sx={{ ...T_LABEL, mb: "10px" }}>Payment activity</T>
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
        <T sx={T_BODY}>You have no recent spending.</T>
        <T sx={T_LINK}>Create an ad</T>
      </Box>
    </Card>
  );
}

/* ─── Business Info ─── */
function BusinessInfoCard() {
  return (
    <Card sx={{ px: "20px", py: "16px" }}>
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "16px",
      }}>
        <T sx={T_LABEL}>Business info</T>
        <OutlineBtn>Edit</OutlineBtn>
      </Box>
      <Box sx={{ display: "flex", gap: "40px" }}>
        {[
          { label: "Business name", value: "-" },
          { label: "Address", value: "India" },
          { label: "Currency", value: "Indian Rupee INR" },
        ].map(({ label, value }) => (
          <Box key={label}>
            <T sx={{ ...T_LABEL, mb: "4px" }}>{label}</T>
            <T sx={T_BODY}>{value}</T>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* ─── Right: Payment History ─── */
function PaymentHistoryCard() {
  return (
    <Card sx={{ px: "16px", py: "14px", mb: "12px" }}>
      <T sx={{ ...T_LABEL, mb: "10px" }}>Payment history</T>
      <Box sx={{
        display: "flex", alignItems: "center", gap: "6px",
        pb: "10px", borderBottom: "1px solid rgba(28,43,51,0.15)",
      }}>
        <LayoutGrid size={14} color={BLUE} strokeWidth={1.6} />
        <T sx={T_LINK}>View transaction history</T>
      </Box>
    </Card>
  );
}

/* ─── Right: Help Centre ─── */
function HelpCentreCard() {
  const links = [
    { icon: Settings2, label: "Troubleshoot billing and payments" },
    { icon: HelpCircle, label: "How ads billing works" },
    { icon: MinusCircle, label: "What to do if your payment fails" },
    { icon: PlusCircle, label: "Open Help Centre" },
  ];
  return (
    <Card sx={{ px: "16px", py: "14px" }}>
      <T sx={{ ...T_LABEL, mb: "12px" }}>Help Centre</T>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map(({ icon: Icon, label }) => (
          <Box key={label} sx={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <Icon size={14} color={BLUE} strokeWidth={1.6} />
            <T sx={T_LINK}>{label}</T>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

/* ─── Payment Settings View ─── */
function PaymentSettingsView() {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {/* Page heading + account selector */}
      <Box sx={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", mb: "16px",
      }}>
        <T sx={H_PAGE}>Payment settings</T>
        <Box sx={{
          display: "flex", alignItems: "center", gap: "6px",
          px: "10px", height: "30px",
          border: "1px solid rgba(28,43,51,0.3)",
          borderRadius: RADIUS, backgroundColor: WHITE,
          cursor: "pointer", "&:hover": { backgroundColor: "#f5f6fa" },
        }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#bcc0c4" }} />
          <T sx={{ ...T_BODY, color: TEXT }}>(498042116267790)</T>
          <T sx={{ ...T_BODY, color: TEXT, mx: "4px" }}>•••</T>
        </Box>
      </Box>

      {showBanner && <SetupBanner onDismiss={() => setShowBanner(false)} />}

      {/* Two-column layout */}
      <Box sx={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <CurrentBalanceCard />
          <PaymentMethodsCard />
          <PaymentActivityInlineCard />
          <BusinessInfoCard />
        </Box>
        <Box sx={{ width: 240, minWidth: 240, flexShrink: 0 }}>
          <PaymentHistoryCard />
          <HelpCentreCard />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", mt: "20px" }}>
        <T sx={T_BODY}>Need help?</T>
        <T sx={T_LINK}>Get support</T>
      </Box>
    </Box>
  );
}

/* ─── Payment Activity View ─── */
function PaymentActivityView() {
  return (
    <Box sx={{ flex: 1 }}>
      <T sx={{ ...H_PAGE, mb: "20px" }}>Payment activity</T>
      <Card sx={{ px: "20px", py: "40px", textAlign: "center" }}>
        <T sx={{ ...T_BODY, display: "inline" }}>You have no recent spending. </T>
        <T sx={{ ...T_LINK, display: "inline" }}>Create an ad</T>
      </Card>
    </Box>
  );
}

/* ─── Billing Header ─── */
function BillingHeader() {
  return (
    <Box sx={{
      height: 50, display: "flex", alignItems: "center",
      px: "20px", gap: "12px",
      backgroundColor: "transparent",
      mt: 1,
      flexShrink: 0,
    }}>
      <T sx={H_SEC}>Billing &amp; payments</T>

      {/* Other assets dropdown */}
      <Box sx={{
        display: "flex", alignItems: "center", gap: "6px",
        px: "15px", height: "36px",
        borderRadius: RADIUS, cursor: "pointer", backgroundColor: WHITE,
        "&:hover": { backgroundColor: "#fff" },
      }}>
        <LayoutGrid size={16} color={TEXT} strokeWidth={1.6} />
        <T sx={{ ...T_BODY, color: "#000000", mr: 15 }}>Other assets</T>
        <ChevronDown size={16} color={TEXT} />
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{
        width: 32, height: 32, borderRadius: "50%",
        backgroundColor: "#0064d1",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}>
        <T sx={{ fontSize: "13px", fontWeight: 700, color: WHITE }}>A</T>
      </Box>
    </Box>
  );
}

/* ─── Root Export ─── */
export default function BillingPayments() {
  const [activeItem, setActiveItem] = useState("payment-settings");

  return (
    <Box sx={{
      flex: 1, display: "flex", flexDirection: "column",
      overflow: "hidden",
      /* EXACT Meta page background gradient */
      backgroundImage: PAGE_BG,
      backgroundColor: WHITE,
    }}>
      <BillingHeader />

      <Box sx={{
        flex: 1, display: "flex", gap: "16px",
        p: "20px", overflow: "auto",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0,0,0,0.15)", borderRadius: "3px",
        },
      }}>
        <SecondaryNav active={activeItem} setActive={setActiveItem} />
        {activeItem === "payment-settings"
          ? <PaymentSettingsView />
          : <PaymentActivityView />
        }
      </Box>
    </Box>
  );
}
