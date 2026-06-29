import React, { useState, useEffect } from "react";
import { Popover, Box, Typography, Button, IconButton, TextField, Checkbox } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FONT = '"Optimistic 95", system-ui, sans-serif';
const TEXT = "rgb(28, 43, 51)";
const MUTED = "#65676B";
const BLUE = "#0070c9"; // Match the blue color in buttons and highlights

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const PRESETS = [
  { id: "today1", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "today_yesterday", label: "Today and yesterday" },
  { id: "last_7_days", label: "Last 7 days" },
  { id: "last_14_days", label: "Last 14 days" },
  { id: "last_28_days", label: "Last 28 days" },
  { id: "last_30_days", label: "Last 30 days" },
  { id: "this_week", label: "This week" },
  { id: "last_week", label: "Last week" },
  { id: "this_month", label: "This month" },
  { id: "last_month", label: "Last month" },
  { id: "lifetime", label: "Maximum" },
  { id: "custom", label: "Custom" },
];

export function getPresetRange(presetId) {
  const today = new Date("2026-06-29");
  today.setHours(0, 0, 0, 0);

  switch (presetId) {
    case "today1":
    case "today2":
    case "today":
      return { start: new Date(today), end: new Date(today) };
    case "yesterday": {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: new Date(yesterday), end: new Date(yesterday) };
    }
    case "today_yesterday": {
      const start = new Date(today);
      start.setDate(start.getDate() - 1);
      return { start, end: new Date(today) };
    }
    case "last_7_days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 6);
      return { start, end: new Date(today) };
    }
    case "last_14_days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 13);
      return { start, end: new Date(today) };
    }
    case "last_28_days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 27);
      return { start, end: new Date(today) };
    }
    case "last_30_days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 29);
      return { start, end: new Date(today) };
    }
    case "this_week": {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      return { start, end: new Date(today) };
    }
    case "last_week": {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay() - 7);
      const end = new Date(today);
      end.setDate(today.getDate() - today.getDay() - 1);
      return { start, end };
    }
    case "this_month": {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      return { start, end: new Date(today) };
    }
    case "last_month": {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start, end };
    }
    case "lifetime": {
      const start = new Date("2026-05-24");
      return { start, end: new Date(today) };
    }
    default:
      return { start: new Date(today), end: new Date(today) };
  }
}

export function formatDateShort(date) {
  if (!date) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

const formatDateLong = (date) => {
  if (!date) return "";
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
};

const formatDateInput = (date) => {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const isBetween = (day, start, end) => {
  if (!start || !end) return false;
  const t = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return t > s && t < e;
};

export default function DateRangePicker({
  open,
  anchorEl,
  onClose,
  initialStartDate,
  initialEndDate,
  initialPreset,
  onApply
}) {
  const [selectedStart, setSelectedStart] = useState(initialStartDate);
  const [selectedEnd, setSelectedEnd] = useState(initialEndDate);
  const [tempPreset, setTempPreset] = useState(initialPreset);
  const [hoveredDate, setHoveredDate] = useState(null);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(initialStartDate || new Date());
    d.setDate(1);
    return d;
  });

  useEffect(() => {
    if (open) {
      setSelectedStart(initialStartDate);
      setSelectedEnd(initialEndDate);
      setTempPreset(initialPreset);
      if (initialStartDate) {
        const d = new Date(initialStartDate);
        d.setDate(1);
        setViewDate(d);
      }
    }
  }, [open, initialStartDate, initialEndDate, initialPreset]);

  const handlePrevMonth = () => {
    setViewDate(prev => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  };

  const handleNextMonth = () => {
    setViewDate(prev => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };

  const handlePresetClick = (presetId) => {
    if (presetId !== "today1" && presetId !== "today2" && presetId !== "yesterday") return;
    setTempPreset(presetId);
    const range = getPresetRange(presetId);
    if (range) {
      setSelectedStart(range.start);
      setSelectedEnd(range.end);
      const d = new Date(range.start);
      d.setDate(1);
      setViewDate(d);
    }
  };

  const handleDayClick = (dayDate) => {
    const today = new Date("2026-06-29");
    const yesterday = new Date("2026-06-28");
    const isToday = isSameDay(dayDate, today);
    const isYesterday = isSameDay(dayDate, yesterday);
    if (!isToday && !isYesterday) return;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(dayDate);
      setSelectedEnd(null);
      setTempPreset("custom");
    } else {
      if (dayDate.getTime() < selectedStart.getTime()) {
        setSelectedStart(dayDate);
        setSelectedEnd(null);
      } else {
        setSelectedEnd(dayDate);
      }
      setTempPreset("custom");
    }
  };

  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      onApply({
        start: selectedStart,
        end: selectedEnd,
        preset: tempPreset
      });
      onClose();
    }
  };

  const leftYear = viewDate.getFullYear();
  const leftMonth = viewDate.getMonth();

  const rightDate = new Date(viewDate);
  rightDate.setMonth(rightDate.getMonth() + 1);
  const rightYear = rightDate.getFullYear();
  const rightMonth = rightDate.getMonth();

  const getDayStyle = (dayDate) => {
    const isFuture = dayDate > new Date("2026-06-29");
    const isStart = isSameDay(dayDate, selectedStart);
    const isEnd = isSameDay(dayDate, selectedEnd);
    const inRange = isBetween(dayDate, selectedStart, selectedEnd);

    const isHoveredRange = hoveredDate && selectedStart && !selectedEnd &&
      dayDate.getTime() > selectedStart.getTime() &&
      dayDate.getTime() <= hoveredDate.getTime();

    let backgroundColor = "transparent";
    let color = isFuture ? "rgba(28,43,51,0.4)" : TEXT;
    let borderRadius = "4px";

    if (isStart && isEnd) {
      backgroundColor = BLUE;
      color = "#fff";
      borderRadius = "4px";
    } else if (isStart) {
      backgroundColor = BLUE;
      color = "#fff";
      borderRadius = "4px 0 0 4px";
    } else if (isEnd) {
      backgroundColor = BLUE;
      color = "#fff";
      borderRadius = "0 4px 4px 0";
    } else if (inRange) {
      backgroundColor = "#e1f0fa";
      color = TEXT;
      borderRadius = "0";
    } else if (isHoveredRange && !isFuture) {
      backgroundColor = "#f0f7fd";
      color = TEXT;
      borderRadius = "0";
      if (isSameDay(dayDate, hoveredDate)) {
        borderRadius = "0 4px 4px 0";
        backgroundColor = "#cce4f6";
      }
    }

    return {
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: isFuture ? "default" : "pointer",
      backgroundColor,
      color,
      borderRadius,
      fontSize: "13px",
      fontWeight: (isStart || isEnd) ? 600 : 400,
      fontFamily: FONT,
      transition: "background-color 0.1s, border-radius 0.1s",
      "&:hover": {
        backgroundColor: isFuture ? "transparent" : ((isStart || isEnd) ? BLUE : "#e4e6eb"),
        color: isFuture ? "rgba(28,43,51,0.4)" : ((isStart || isEnd) ? "#fff" : TEXT),
      }
    };
  };

  const renderCalendar = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIdx = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < firstDayIdx; i++) {
      cells.push(<Box key={`empty-${i}`} sx={{ width: 36, height: 36 }} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const isFuture = dayDate > new Date("2026-06-29");
      cells.push(
        <Box
          key={`day-${day}`}
          onClick={() => !isFuture && handleDayClick(dayDate)}
          onMouseEnter={() => {
            if (selectedStart && !selectedEnd && !isFuture) {
              setHoveredDate(dayDate);
            }
          }}
          sx={getDayStyle(dayDate)}
        >
          {day}
        </Box>
      );
    }

    return cells;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          border: "1px solid #dee1e5",
          overflow: "hidden",
        }
      }}
    >
      <Box sx={{ display: "flex", width: "800px", height: "450px" }}>
        {/* Left: Presets list */}
        <Box sx={{
          width: "250px",
          borderRight: "1px solid #dee1e5",
          py: "16px",
          px: "12px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: TEXT, px: "12px", mb: "12px", fontFamily: FONT }}>
            Recently used
          </Typography>
          <Box sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#c1c1c1",
              borderRadius: "4px",
            }
          }}>
            {PRESETS.map((preset) => {
              const isSelected = tempPreset === preset.id || (preset.id.startsWith("today") && tempPreset.startsWith("today"));
              return (
                <Box
                  key={preset.id}
                  onClick={() => handlePresetClick(preset.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    py: "10px",
                    px: "12px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)"
                    }
                  }}
                >
                  <Box sx={{
                    width: 20, height: 20, borderRadius: "50%",
                    border: `2px solid ${isSelected ? "#1877f2" : "#bcc0c4"}`,
                    backgroundColor: "#ffffff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {isSelected && (
                      <Box sx={{
                        width: 10, height: 10, borderRadius: "50%",
                        backgroundColor: "#1877f2",
                      }} />
                    )}
                  </Box>
                  <Typography sx={{ fontSize: "14px", color: "rgb(28, 43, 51)", fontWeight: 400, fontFamily: FONT }}>
                    {preset.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Right Panel: Calendar Grid & Options */}
        <Box sx={{
          flex: 1,
          p: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff"
        }}>
          {/* Top row: navigation selectors */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "16px", px: "8px" }}>
            {/* Left month/year selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <IconButton onClick={handlePrevMonth} size="small" sx={{ border: "1px solid #cbd2d9", p: "4px" }}>
                <ChevronLeft size={16} />
              </IconButton>
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold", color: TEXT, fontFamily: FONT }}>
                    {MONTH_NAMES[leftMonth].slice(0, 3)}
                  </Typography>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "6px" }}><path d="M1 1L5 5L9 1" stroke="#1c2b33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold", color: TEXT, fontFamily: FONT }}>
                    {leftYear}
                  </Typography>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "6px" }}><path d="M1 1L5 5L9 1" stroke="#1c2b33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Box>
              </Box>
            </Box>

            {/* Right month/year selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold", color: TEXT, fontFamily: FONT }}>
                    {MONTH_NAMES[rightMonth].slice(0, 3)}
                  </Typography>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "6px" }}><path d="M1 1L5 5L9 1" stroke="#1c2b33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "bold", color: TEXT, fontFamily: FONT }}>
                    {rightYear}
                  </Typography>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "6px" }}><path d="M1 1L5 5L9 1" stroke="#1c2b33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Box>
              </Box>
              <IconButton onClick={handleNextMonth} size="small" sx={{ border: "1px solid #cbd2d9", p: "4px" }}>
                <ChevronRight size={16} />
              </IconButton>
            </Box>
          </Box>

          {/* Calendar side-by-side container */}
          <Box sx={{ display: "flex", gap: "30px", justifyContent: "space-between", flex: 1 }}>
            {/* Left Month Calendar */}
            <Box onMouseLeave={() => setHoveredDate(null)} sx={{ flex: 1 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", gap: "2px", mb: 1, textAlign: "center", justifyContent: "center" }}>
                {DAY_NAMES.map(day => (
                  <Typography key={day} sx={{ fontSize: "11px", fontWeight: 600, color: MUTED, fontFamily: FONT }}>
                    {day}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", gap: "2px", justifyContent: "center" }}>
                {renderCalendar(leftYear, leftMonth)}
              </Box>
            </Box>

            {/* Right Month Calendar */}
            <Box onMouseLeave={() => setHoveredDate(null)} sx={{ flex: 1 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", gap: "2px", mb: 1, textAlign: "center", justifyContent: "center" }}>
                {DAY_NAMES.map(day => (
                  <Typography key={day} sx={{ fontSize: "11px", fontWeight: 600, color: MUTED, fontFamily: FONT }}>
                    {day}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", gap: "2px", justifyContent: "center" }}>
                {renderCalendar(rightYear, rightMonth)}
              </Box>
            </Box>
          </Box>

          {/* Compare toggle row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", px: "8px", mt: "16px" }}>
            <Checkbox
              size="small"
              sx={{
                p: 0,
                color: "#cbd2d9",
                "&.Mui-checked": {
                  color: "#1877f2",
                },
              }}
            />
            <Typography sx={{ fontSize: "14px", color: TEXT, fontWeight: 500, fontFamily: FONT }}>Compare</Typography>
          </Box>

          {/* Preset indicator dropdown and inputs */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px", px: "8px", mt: "12px", mb: "16px" }}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #cbd2d9",
              borderRadius: "6px",
              px: "12px",
              py: "6px",
              height: "38px",
              width: "200px",
              backgroundColor: "#ffffff",
              cursor: "default"
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Box sx={{ width: "16px", height: "16px", backgroundColor: "#a5cbf5", borderRadius: "3px" }} />
                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: TEXT, fontFamily: FONT }}>
                  {PRESETS.find(p => p.id === tempPreset || (p.id.startsWith("today") && tempPreset.startsWith("today")))?.label || "Custom"}
                </Typography>
              </Box>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#65676B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={{
                border: "1px solid #cbd2d9",
                borderRadius: "6px",
                px: "12px",
                py: "6px",
                height: "38px",
                width: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff"
              }}>
                <Typography sx={{ fontSize: "14px", color: TEXT, fontFamily: FONT }}>
                  {selectedStart ? formatDateLong(selectedStart) : ""}
                </Typography>
              </Box>
              <Typography sx={{ color: "rgba(28,43,51,0.65)", px: "2px", fontFamily: FONT }}>-</Typography>
              <Box sx={{
                border: "1px solid #cbd2d9",
                borderRadius: "6px",
                px: "12px",
                py: "6px",
                height: "38px",
                width: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff"
              }}>
                <Typography sx={{ fontSize: "14px", color: TEXT, fontFamily: FONT }}>
                  {selectedEnd ? formatDateLong(selectedEnd) : ""}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Footer actions row */}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e4e6eb",
            pt: "16px",
            px: "8px",
            mt: "auto"
          }}>
            <Typography sx={{ fontSize: "13px", color: "rgba(28,43,51,0.65)", fontFamily: FONT }}>
              Dates are shown in Kolkata Time
            </Typography>
            <Box>
              <Button
                onClick={onClose}
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgb(28, 43, 51)",
                  borderColor: "#cbd2d9",
                  borderRadius: "6px",
                  height: "36px",
                  px: "20px",
                  mr: "12px",
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    borderColor: "#8a8d91",
                    backgroundColor: "#f5f6fa",
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={!selectedStart || !selectedEnd}
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 650,
                  color: "#ffffff !important",
                  backgroundColor: "#0070c9 !important",
                  borderRadius: "6px",
                  height: "36px",
                  px: "24px",
                  boxShadow: "none",
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(0,112,201,0.5) !important",
                    color: "rgba(255,255,255,0.6) !important"
                  },
                  "&:hover": {
                    backgroundColor: "#005ea6 !important",
                    boxShadow: "none"
                  }
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
}
