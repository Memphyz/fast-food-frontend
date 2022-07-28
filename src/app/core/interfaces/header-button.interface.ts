export interface IHeaderButton {
  label?: string;
  routerlink?: string[];
  class?: string;
  iconColor?: string;
  icon?: string;
  dropdown?: (IHeaderButton & { dropdown?: null })[];
  useBadge?: boolean;
  badgeCalc?: () => string;
  onClick?: () => void;
}
