"use client";

import { ReactNode, useState } from "react";

export default function LoadMore({ items, className, pageSize = 6 }: { items: ReactNode[]; className: string; pageSize?: number }) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visible = items.slice(0, visibleCount);
  const remaining = items.length - visible.length;

  return <>
    <div className={className}>{visible}</div>
    {remaining > 0 && <div className="load-more-wrap">
      <button type="button" className="load-more-btn" onClick={() => setVisibleCount(count => Math.min(count + pageSize, items.length))}>
        Load more <span>({remaining} remaining)</span>
      </button>
    </div>}
  </>;
}
