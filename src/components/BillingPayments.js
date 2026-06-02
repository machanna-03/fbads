import { useState } from "react";
import { Box, Typography, Select, MenuItem, TextField, IconButton, Paper, Button, InputAdornment, Checkbox, Radio } from "@mui/material";
import {
  CreditCard, Activity, Info, X, ChevronDown,
  LayoutGrid, Edit3, HelpCircle, Settings2,
  MinusCircle, PlusCircle, Settings, Search
} from "lucide-react";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import LockIcon from "@mui/icons-material/Lock";
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
function PaymentMethodsCard({ onAddPaymentMethod }) {
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
        <OutlineBtn onClick={onAddPaymentMethod}>Add payment method</OutlineBtn>
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
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [hasAdCredit, setHasAdCredit] = useState(false);

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
          <PaymentMethodsCard onAddPaymentMethod={() => setShowSetupModal(true)} />
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
function PaymentActivityView() {
  const [activeBillingTab, setActiveBillingTab] = useState("ad-accounts");
  const [dateRange, setDateRange] = useState("Lifetime");

  const handleBillingTabChange = (tab) => {
    setActiveBillingTab(tab);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box>
        {/* Payment activity header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            mb: 2,
          }}
        >
          <Select
            value="Ashwayana Reality Group (8169217870188)"
            size="small"
            sx={{
              minWidth: 300,
              backgroundColor: "#fff",
              fontSize: "14px",
            }}
            IconComponent={() => (
              <ChevronDown size={16} style={{ marginRight: 8 }} />
            )}
          >
            <MenuItem value="Ashwayana Reality Group (8169217870188)">
              Ashwayana Reality Group (8169217870188)
            </MenuItem>
          </Select>
        </Box>

        {/* Search filter */}
        <Box
          sx={{
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              placeholder="Select a filter"
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                flexGrow: 1, // makes the TextField take all available space
                ".MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  bgcolor: "white",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
            <IconButton
              sx={{
                border: "1px solid #E4E6EB",
                borderColor: "rgba(163, 151, 151, 0.77)",
                borderRadius: 1,
              }}
            >
              <Settings size={20} />
            </IconButton>
          </Box>
        </Box>

        <Paper
          elevation={1}
          sx={{ bgcolor: "#ffffff", borderRadius: 2, overflow: "hidden", m: 2 }}
        >
          {/* Tabs */}
          <Box sx={{ px: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Box sx={{ display: "flex" }}>
                <Button
                  sx={{
                    textTransform: "none",
                    borderRadius: 0,
                    py: 1.5,
                    px: 2,
                    color:
                      activeBillingTab === "ad-accounts"
                        ? "#1877F2"
                        : "#65676B",
                    fontWeight:
                      activeBillingTab === "ad-accounts"
                        ? "bold"
                        : "normal",
                  }}
                  onClick={() => handleBillingTabChange("ad-accounts")}
                >
                  Ad accounts
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Account balance section */}
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Ad Account</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 0.5 }}>
                  Current balance
                </Typography>
                <Info size={16} color="#65676B" />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                borderBottom: "1px solid #E4E6EB",
                borderColor: "divider",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Ashwayana Reality Group (8169217870188)
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ₹ 0.00
              </Typography>
            </Box>
          </Box>

          {/* Transaction controls */}
          <Box sx={{ px: 3, display: "flex", gap: 2, mb: 3 }}>
            <Select
              value="Transactions"
              size="small"
              sx={{ width: 180 }}
              IconComponent={() => (
                <ChevronDown size={16} style={{ marginRight: 8 }} />
              )}
            >
              <MenuItem value="Transactions">Transactions</MenuItem>
            </Select>

            <TextField
              placeholder="Search by transaction ID..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#65676B" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 250,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            <IconButton
              sx={{
                border: "1px solid #E4E6EB",
                borderRadius: 1,
              }}
            >
              <Settings size={18} />
            </IconButton>

            <TextField
              placeholder="Reference number"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#65676B" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 200,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />

            <Select
              value={dateRange}
              size="small"
              sx={{ width: 220 }}
              IconComponent={() => (
                <ArrowDropDown size={16} style={{ marginRight: 8 }} />
              )}
            >
              <MenuItem value={dateRange}>{dateRange}</MenuItem>
            </Select>
          </Box>

          {/* Empty state message */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Activity size={40} color="#65676B" />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              No transaction history
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ maxWidth: 400, mb: 2 }}
            >
              You haven't made any transactions yet. When you do, they'll
              appear here.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 1,
                color: "#050505",
                borderColor: "#e4e6eb",
                px: 3,
              }}
            >
              Learn about billing
            </Button>
          </Box>
        </Paper>
      </Box>
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
