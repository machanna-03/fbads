import { useState } from "react";
import { Box, Checkbox, Switch, Typography } from "@mui/material";
import { ChevronsUpDown, ChevronDown, Info, ArrowDown, ArrowUpDown, Plus, Check } from "lucide-react";
const FONT = '"Optimistic 95", system-ui, sans-serif';
// eslint-disable-next-line no-unused-vars
const FONT_ROBOTO = 'Roboto, Arial, sans-serif';
const BORDER_COLOR = "#DADDE1";
const BORDER = `1px solid ${BORDER_COLOR}`;
const HEADER_BG = "#F2F3F5";
const TEXT = "#1c2b33";
const MUTED = "#65676B";
const BLUE = "rgb(20, 97, 204)";
const BLUE_LIGHT = "#e6f5f0";
const GREEN = "#31A24C";
const ROW_HIGHLIGHT = "#e6f5f0";   /* exact Meta blue tint for highlighted row */
const ROW_HOVER = "#e6f5f0";
const GRID_TEMPLATE = "44px 88px 250px 140px 120px 130px 125px 180px 130px 130px 120px 110px 140px 160px 40px";

const UncheckedIcon = () => (
  <Box
    sx={{
      width: 18,
      height: 18,
      border: "1.5px solid rgba(28, 43, 51, 0.3)",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
    }}
  />
);

const CheckedIcon = () => (
  <Box
    sx={{
      width: 18,
      height: 18,
      border: "1.8px solid #1877F2",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Check size={14} color="#1877F2" strokeWidth={3} />
  </Box>
);

const IndeterminateIcon = () => (
  <Box
    sx={{
      width: 18,
      height: 18,
      border: "1.8px solid #1877F2",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box sx={{ width: 10, height: 2, backgroundColor: "#1877F2", borderRadius: "1px" }} />
  </Box>
);

/* ── Reusable text ── */
function T({ children, sx = {} }) {
  return (
    <Typography
      sx={{
        fontFamily: FONT,
        fontStyle: "normal",
        fontWeight: 700,
        color: "rgb(28, 43, 51)",
        fontSize: "14px",
        lineHeight: "19px",
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}

/* ── Sortable header cell ── */
function HeaderCell({ label, sortActive = false, info = false, right = false, wrap = false, showSort = true, showCaret = true }) {
  const iconColor = sortActive ? "rgb(20, 97, 204)" : "rgb(40, 57, 67)";
  const caretColor = sortActive ? "rgb(28, 43, 51)" : "rgb(28, 43, 51)";

  return (
    <Box
      sx={{
        display: "flex", alignItems: "center",
        px: "10px", height: "100%", cursor: "pointer", userSelect: "none",
        justifyContent: "space-between",
        "&:hover .caretIcon": { opacity: 1 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-start", flex: 1 }}>
        {info && <Info size={11} color={MUTED} style={{ flexShrink: 0 }} />}
        {wrap ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontFamily: FONT, fontStyle: "normal", fontWeight: 700, color: "rgb(28, 43, 51)", fontSize: "14px", lineHeight: "19px" }}>
              {label.split(" ").slice(0, label.split(" ").length > 2 ? 2 : 1).join(" ")}
            </Typography>
            <Typography sx={{ fontFamily: FONT, fontStyle: "normal", fontWeight: 700, color: "rgb(28, 43, 51)", fontSize: "14px", lineHeight: "19px" }}>
              {label.split(" ").slice(label.split(" ").length > 2 ? 2 : 1).join(" ")}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontFamily: FONT, fontStyle: "normal", fontWeight: 700, color: "rgb(28, 43, 51)", fontSize: "14px", lineHeight: "19px", whiteSpace: "nowrap" }}>
            {label}
          </Typography>
        )}

        {showSort && (
          <Box sx={{ display: "flex", alignItems: "center", ml: "2px" }}>
            {sortActive ? (
              <ArrowDown size={15} color={iconColor} strokeWidth={2.8} />
            ) : (
              <ArrowUpDown size={15} color={iconColor} strokeWidth={2.8} />
            )}
          </Box>
        )}
      </Box>

      {showCaret && (
        <Box className="caretIcon" sx={{ display: "flex", alignItems: "center", ml: "4px" }}>
          <Box sx={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `4px solid ${caretColor}` }} />
        </Box>
      )}
    </Box>
  );
}

/* ── Campaign row toggle switch ── */
function CampaignToggle({ checked }) {
  const [on, setOn] = useState(checked);
  return (
    <Switch
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
      size="small"
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": { color: BLUE },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: BLUE },
      }}
    />
  );
}

/* ── Campaign data ── */
const campaigns = [
  {
    id: 1,
    name: "New Leads campaign",
    delivery: "In draft",
    deliveryColor: "#006b4e",
    results: null,
    costPerResult: null,
    budget: "Using ad set budget",
    budgetSub: "Not shared",
    amountSpent: null,
    actions: null,
    on: true,
    impressions: null,
    reach: null,
    ends: "Ongoing",
    attribution: null,
    bidStrategy: "Using ad set bid...",
  },
  {
    id: 2,
    name: "Ashwayana Reality Groups",
    delivery: "Off",
    deliveryColor: "#65676B",
    results: null,
    costPerResult: null,
    budget: "Using ad set budget",
    budgetSub: "Not shared",
    amountSpent: null,
    actions: null,
    on: false,
    impressions: null,
    reach: null,
    ends: null,
    attribution: null,
    bidStrategy: null,
  },
];

export default function CampaignTable() {
  const [selected, setSelected] = useState([]);
  const [hovered, setHovered] = useState(null);

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const allChecked = campaigns.length > 0 && selected.length === campaigns.length;
  const indeterminate = selected.length > 0 && selected.length < campaigns.length;

  return (
    <Box sx={{ backgroundColor: "#f3f6f8", }}>
      <Box
        sx={{
          flex: 1, display: "flex", flexDirection: "column",
          overflow: "hidden", backgroundColor: "#F5F6F7",
          mx: "6px",
        }}
      >
        {/* ── Table wrapper ── */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderTop: BORDER,
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex", flexDirection: "column",
            flex: 1,
            position: "relative",
            scrollBehavior: "smooth",
            pb: "12px", /* GAP between table rows and scrollbar */
            "&::-webkit-scrollbar": {
              height: "6px", /* small scrollbar */
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f5f6f7",
              borderTop: BORDER,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccd0d5",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#bcc0c4",
            },
          }}
        >
          {/* Shared container to enforce identical row widths for perfect flex alignment */}
          <Box sx={{ minWidth: 1907, display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>

            {/* ── Table header ── */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: GRID_TEMPLATE,
                height: "52px",
                backgroundColor: "#ffffff",
                borderBottom: BORDER,
                flexShrink: 0,
              }}
            >
              {/* Checkbox col */}
              <Box
                sx={{
                  width: 44, minWidth: 44, height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: BORDER, flexShrink: 0,
                  position: "sticky", left: 0, zIndex: 3,
                  backgroundColor: "#ffffff",
                }}
              >
                <Checkbox
                  icon={<UncheckedIcon />}
                  checkedIcon={<CheckedIcon />}
                  indeterminateIcon={<IndeterminateIcon />}
                  checked={allChecked}
                  indeterminate={indeterminate}
                  onChange={(e) => setSelected(e.target.checked ? campaigns.map((c) => c.id) : [])}
                  sx={{ p: "2px" }}
                />
              </Box>

              {/* Off/On */}
              <Box
                sx={{
                  width: 88, minWidth: 88, height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "flex-start", px: "10px",
                  borderRight: BORDER, flexShrink: 0, gap: "4px", cursor: "pointer",
                  position: "sticky", left: 44, zIndex: 3,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography sx={{ fontFamily: FONT, fontStyle: "normal", fontWeight: 700, color: "rgb(28, 43, 51)", fontSize: "14px", lineHeight: "19px" }}>
                  Off...
                </Typography>
                <ArrowUpDown size={15} color="rgb(40, 57, 67)" strokeWidth={2.8} />
              </Box>

              {/* Campaign */}
              <Box
                sx={{
                  width: 250, minWidth: 250, height: "100%",
                  borderRight: BORDER, flexShrink: 0,
                  position: "sticky", left: 132, zIndex: 3,
                  backgroundColor: "#ffffff",
                }}
              >
                <HeaderCell label="Campaign" />
              </Box>

              {/* Delivery */}
              <Box sx={{ width: 140, minWidth: 140, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Delivery" sortActive />
              </Box>

              {/* Actions */}
              <Box sx={{ flex: 1, minWidth: 120, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Actions" showSort={false} />
              </Box>

              {/* Results */}
              <Box sx={{ width: 130, minWidth: 130, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Results" info />
              </Box>

              {/* Cost per result */}
              <Box sx={{ width: 125, minWidth: 125, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Cost per result" wrap />
              </Box>

              {/* Budget */}
              <Box sx={{ width: 180, minWidth: 180, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Budget" />
              </Box>

              {/* Amount spent */}
              <Box sx={{ width: 130, minWidth: 130, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Amount spent" showSort={true} showCaret={true} wrap />
              </Box>

              {/* Impressions */}
              <Box sx={{ width: 130, minWidth: 130, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Impressions" showSort={true} showCaret={true} />
              </Box>

              {/* Reach */}
              <Box sx={{ width: 120, minWidth: 120, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Reach" showSort={true} showCaret={true} />
              </Box>

              {/* Ends */}
              <Box sx={{ width: 110, minWidth: 110, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Ends" showSort={true} showCaret={true} />
              </Box>

              {/* Attribution setting */}
              <Box sx={{ width: 140, minWidth: 140, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Attribution setting" showSort={false} showCaret={true} wrap />
              </Box>

              {/* Bid strategy */}
              <Box sx={{ width: 160, minWidth: 160, flexShrink: 0, height: "100%", borderRight: BORDER }}>
                <HeaderCell label="Bid strategy" showSort={false} showCaret={true} />
              </Box>

              {/* Add column button (+) */}
              <Box
                sx={{
                  width: 40, minWidth: 40, flexShrink: 0, height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" }
                }}
              >
                <Plus size={16} color="rgb(101, 103, 107)" />
              </Box>
            </Box>

            {/* ── Data rows ── */}
            {campaigns.map((row) => {
              const isSelected = selected.includes(row.id);
              const isHovered = hovered === row.id;

              // 3 Background colors logic based on row.on, hover, and selection:
              const rowBg = row.on
                ? "#e6f5f0"
                : (isHovered || isSelected)
                  ? "#eff1f4ff"
                  : "#ffffff";

              return (
                <Box
                  key={row.id}
                  onMouseEnter={() => setHovered(row.id)}
                  onMouseLeave={() => setHovered(null)}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: GRID_TEMPLATE,
                    height: "52px",
                    backgroundColor: rowBg,
                    borderBottom: BORDER,
                    transition: "background-color 0.15s",
                    cursor: "default",
                  }}
                >
                  {/* Checkbox */}
                  <Box
                    sx={{
                      width: 44, minWidth: 44,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRight: BORDER, flexShrink: 0,
                      position: "sticky", left: 0, zIndex: 2,
                      backgroundColor: rowBg,
                    }}
                  >
                    <Checkbox
                      icon={<UncheckedIcon />}
                      checkedIcon={<CheckedIcon />}
                      checked={isSelected}
                      onChange={() => toggleSelect(row.id)}
                      sx={{ p: "2px" }}
                    />
                  </Box>

                  {/* Toggle */}
                  <Box
                    sx={{
                      width: 88, minWidth: 88,
                      display: "flex", alignItems: "center", justifyContent: "flex-start",
                      px: "10px",
                      borderRight: BORDER, flexShrink: 0,
                      position: "sticky", left: 44, zIndex: 2,
                      backgroundColor: rowBg,
                    }}
                  >
                    <CampaignToggle checked={row.on} />
                  </Box>

                  {/* Campaign name */}
                  <Box
                    sx={{
                      width: 250, minWidth: 250,
                      display: "flex", alignItems: "center",
                      px: "10px", borderRight: BORDER, flexShrink: 0,
                      position: "sticky", left: 132, zIndex: 2,
                      backgroundColor: rowBg,
                    }}
                  >
                    <T sx={{ color: BLUE, cursor: "pointer", fontSize: '14px', fontWeight: 400, "&:hover": { textDecoration: "underline" } }}>
                      {row.name}
                    </T>
                  </Box>

                  {/* Delivery */}
                  <Box
                    sx={{
                      width: 140, minWidth: 140, flexShrink: 0,
                      display: "flex", alignItems: "center",
                      px: "10px", borderRight: BORDER, gap: "6px",
                    }}
                  >
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${row.deliveryColor}`, flexShrink: 0 }} />
                    <T sx={{ fontSize: '14px', fontWeight: 400 }}>{row.delivery}</T>
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      flex: 1, minWidth: 120,
                      display: "flex", alignItems: "center",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>—</T>
                  </Box>

                  {/* Results */}
                  <Box
                    sx={{
                      width: 130, minWidth: 130, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>—</T>
                  </Box>

                  {/* Cost per result */}
                  <Box
                    sx={{
                      width: 125, minWidth: 125, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>—</T>
                  </Box>

                  {/* Budget */}
                  <Box
                    sx={{
                      width: 180, minWidth: 180, flexShrink: 0,
                      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: FONT,
                        fontStyle: "normal",
                        fontWeight: 400,
                        color: "rgb(28, 43, 51)",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      {row.budget}
                    </Typography>
                    {row.budgetSub && (
                      <Typography
                        sx={{
                          fontFamily: FONT,
                          fontStyle: "normal",
                          fontWeight: 400,
                          color: "rgba(28, 43, 51, 0.65)",
                          fontSize: "12px",
                          lineHeight: "16px",
                          mt: "1px",
                        }}
                      >
                        {row.budgetSub}
                      </Typography>
                    )}
                  </Box>

                  {/* Amount spent */}
                  <Box
                    sx={{
                      width: 130, minWidth: 130, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>—</T>
                  </Box>

                  {/* Impressions */}
                  <Box
                    sx={{
                      width: 130, minWidth: 130, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>{row.impressions || "—"}</T>
                  </Box>

                  {/* Reach */}
                  <Box
                    sx={{
                      width: 120, minWidth: 120, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>{row.reach || "—"}</T>
                  </Box>

                  {/* Ends */}
                  <Box
                    sx={{
                      width: 110, minWidth: 110, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-start",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: FONT,
                        fontStyle: "normal",
                        fontWeight: 400,
                        color: "rgb(28, 43, 51)",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      {row.ends || "—"}
                    </Typography>
                  </Box>

                  {/* Attribution setting */}
                  <Box
                    sx={{
                      width: 140, minWidth: 140, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-start",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <T sx={{ color: MUTED }}>{row.attribution || "—"}</T>
                  </Box>

                  {/* Bid strategy */}
                  <Box
                    sx={{
                      width: 160, minWidth: 160, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "flex-start",
                      px: "10px", borderRight: BORDER,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: FONT,
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "rgb(28, 43, 51)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.bidStrategy || "—"}
                    </Typography>
                  </Box>

                  {/* Add column placeholder cell */}
                  <Box
                    sx={{
                      width: 40, minWidth: 40, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  />
                </Box>
              );
            })}

            {/* ── Results footer ── */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: GRID_TEMPLATE,
                height: "40px",
                borderBottom: BORDER,
                backgroundColor: "#fff",
                flexShrink: 0,
              }}
            >
              {/* Span across Checkbox, Off/On, and Campaign */}
              <Box
                sx={{
                  gridColumn: "1 / 4",
                  display: "flex", alignItems: "center", justifyContent: "flex-end",
                  px: "10px", gap: "6px",
                  borderRight: BORDER,
                  position: "sticky", left: 0, zIndex: 2,
                  backgroundColor: "#ffffff",
                  width: 382, minWidth: 382, flexShrink: 0,
                }}
              >
                <T sx={{ color: "rgba(1, 2, 2, 0.8)", fontWeight: 400, fontSize: "14px", fontStyle: "normal", lineHeight: "20px", fontFamily: FONT }}>Results from {campaigns.length} campaigns</T>
                <Info size={14} color="rgba(1, 2, 2, 1)" style={{ cursor: "pointer", fontWeight: 400, }} />
              </Box>
            </Box>

            {/* ── Remaining space: white to match reference ── */}
            <Box sx={{ flex: 1, backgroundColor: "#ffffff" }} />
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
