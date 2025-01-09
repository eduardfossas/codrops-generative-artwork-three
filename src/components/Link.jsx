import { useRoute, Link as WouterLink } from "wouter";
import clsx from "clsx";

const Link = ({ children, href, className }) => {
  const [isActive] = useRoute(href);
  return (
    <WouterLink href={href} className={clsx(className, isActive && "active")}>
      {children}
    </WouterLink>
  );
};

export { Link };
