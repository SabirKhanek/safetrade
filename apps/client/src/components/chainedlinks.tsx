import Link from "next/link";
import { getCategoryChain } from "../shared/utils/misc";
import { FaAngleRight } from "react-icons/fa6";
import React, { useMemo } from "react";

export function ChainedLinks({
  chain,
  linkClass,
  limit,
}: {
  limit?: number;
  linkClass?: string;
  chain: ReturnType<typeof getCategoryChain>;
}) {
  const chainsToDisplay = useMemo(() => {
    if (!limit) return chain;
    if (chain.length <= limit) {
      return chain;
    } else {
      // Otherwise, return the last `limit` items of the chain
      return chain.slice(-limit);
    }
  }, [chain, limit]);
  return (
    <div className="flex  flex-wrap items-center gap-0.5">
      {chainsToDisplay.map((c, i, arr) => {
        const isLast = i === arr.length - 1;
        const link = (
          <Link className={`${linkClass || "min-w-fit"}`} href={c.slug}>
            {c.name}
          </Link>
        );
        if (isLast) return <React.Fragment key={c.slug}>{link}</React.Fragment>;
        else {
          return (
            <React.Fragment key={c.slug}>
              {link}
              <FaAngleRight />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}
