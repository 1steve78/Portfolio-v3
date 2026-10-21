"use client";

import { useState, useEffect, useMemo } from "react";
import { fallbackContributions } from "../api/contributions/fallbackData";

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: number;
  username: string;
  contributions: ContributionDay[];
}

function getLevelClass(level: number): string {
  if (level === 1) return "low";
  if (level === 2) return "mid";
  if (level === 3) return "warm";
  if (level >= 4) return "hot";
  return "";
}

function formatTooltip(day: ContributionDay): string {
  const parts = day.date.split("-").map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  const formatted = d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  if (day.count === 0) {
    return `No contributions on ${formatted}`;
  }
  return `${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatted}`;
}

export default function Heatmap() {
  const initialTotal =
    fallbackContributions.total?.lastYear ??
    fallbackContributions.contributions?.reduce((sum: number, c: { count?: number }) => sum + (c.count || 0), 0) ??
    809;

  const [data, setData] = useState<ContributionsData>({
    total: initialTotal,
    username: "1steve78",
    contributions: fallbackContributions.contributions || []
  });
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/contributions?username=1steve78")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contributions");
        return res.json();
      })
      .then((freshData: ContributionsData) => {
        if (isMounted && freshData && Array.isArray(freshData.contributions)) {
          setData(freshData);
        }
      })
      .catch((err) => {
        console.warn("Using fallback contribution data:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const { weeks, monthLabels } = useMemo(() => {
    const days = data.contributions;
    if (!days || days.length === 0) return { weeks: [], monthLabels: [] };

    const weeksList: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    const firstParts = days[0].date.split("-").map(Number);
    const firstDate = new Date(Date.UTC(firstParts[0], firstParts[1] - 1, firstParts[2]));
    const firstDay = firstDate.getUTCDay();

    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    for (const day of days) {
      const parts = day.date.split("-").map(Number);
      const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
      const dayOfWeek = d.getUTCDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksList.push(currentWeek);
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const rawLabels: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeksList.forEach((week, wIdx) => {
      const firstValid = week.find((d) => d !== null);
      if (firstValid) {
        const p = firstValid.date.split("-").map(Number);
        const m = new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCMonth();
        if (m !== lastMonth) {
          rawLabels.push({ name: monthNames[m], weekIndex: wIdx });
          lastMonth = m;
        }
      }
    });

    const labels: { name: string; weekIndex: number }[] = [];
    for (let i = 0; i < rawLabels.length; i++) {
      const curr = rawLabels[i];
      const next = rawLabels[i + 1];
      if (next && next.weekIndex - curr.weekIndex < 3) {
        continue;
      }
      labels.push(curr);
    }

    return { weeks: weeksList, monthLabels: labels };
  }, [data.contributions]);

  return (
    <section className="shipping col" id="shipping">
      <h2>Shipping</h2>
      <div className="section-rule" />
      <p className="shipping-sub">
        {hoveredDay ? (
          <span className="shipping-hover-info">{formatTooltip(hoveredDay)}</span>
        ) : (
          <>
            {data.total.toLocaleString()} contributions on GitHub in the last year &#x2014;{" "}
            <a href="https://github.com/1steve78" target="_blank" rel="noopener noreferrer">
              @1steve78
            </a>
            .
          </>
        )}
      </p>

      <div className="heatmap-scroll-wrap">
        <div className="heatmap" role="grid" aria-label="GitHub contribution heatmap">
          {weeks.map((week, wIdx) => (
            <div className="hm-week" key={wIdx} role="row">
              {week.map((day, dIdx) => {
                if (!day) {
                  return <i key={dIdx} className="hm-empty" aria-hidden="true" />;
                }
                const levelClass = getLevelClass(day.level);
                const tooltip = formatTooltip(day);
                return (
                  <i
                    key={day.date}
                    className={levelClass}
                    title={tooltip}
                    data-date={day.date}
                    data-count={day.count}
                    data-level={day.level}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    tabIndex={0}
                    role="gridcell"
                    aria-label={tooltip}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="heatmap-months" aria-hidden="true">
          {weeks.map((_, wIdx) => {
            const label = monthLabels.find((m) => m.weekIndex === wIdx);
            return (
              <div key={wIdx} className="month-col">
                {label && <span className="month-label">{label.name}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="heatmap-legend" aria-hidden="true">
        <span>Less</span>
        <div className="legend-cells">
          <i className="level-0" title="0 contributions" />
          <i className="low" title="Low activity" />
          <i className="mid" title="Medium activity" />
          <i className="warm" title="High activity" />
          <i className="hot" title="Very high activity" />
        </div>
        <span>More</span>
      </div>
    </section>
  );
}
