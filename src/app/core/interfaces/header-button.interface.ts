export interface IHeaderButton {
  label?: string;
  routerlink?: string[];
  class?: string;
  icon?: string;
  useBadge?: boolean;
  badgeCalc?: () => string;
  onClick?: () => void;
}
