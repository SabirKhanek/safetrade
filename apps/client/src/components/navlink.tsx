import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavlinkActive({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className: (isActive: boolean) => string;
} & LinkProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname === props.href); // Compare pathname with NavLink's href
  }, [pathname, props.href]);

  return (
    <Link className={className(isActive)} {...props}>
      {children}
    </Link>
  );
}
