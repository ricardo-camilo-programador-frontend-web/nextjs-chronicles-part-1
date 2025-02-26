import { MenuItem } from "@/types/menuItem";

export const menuItems: MenuItem[] = [
  {
    menuItemKey: "home",
    to: "/",
    ariaLabel: "Home"
  },
  {
    menuItemKey: "plants",
    to: "/plants",
    ariaLabel: "Plants"
  },
  {
    menuItemKey: "contactLink",
    to: "/contact",
    ariaLabel: "Contact"
  },
  {
    menuItemKey: "orders",
    to: "/orders",
    ariaLabel: "Orders"
  },
];

export const adminMenuItems: MenuItem[] = [
  {
    menuItemKey: "dashboard",
    to: "/user/dashboard",
    ariaLabel: "Dashboard",
    icon: "HomeIcon"
  },
  {
    menuItemKey: "deposit",
    to: "/user/deposit",
    ariaLabel: "Deposit",
    icon: "PlusCircleIcon"
  },
  {
    menuItemKey: "wallets",
    to: "/user/wallets",
    ariaLabel: "Wallets",
    icon: "WalletIcon"
  },
  {
    menuItemKey: "virtualCards",
    to: "/user/virtual-cards",
    ariaLabel: "Virtual Cards",
    icon: "CreditCardIcon"
  },
  {
    menuItemKey: "fundTransfer",
    to: "/user/fund-transfer",
    ariaLabel: "Fund Transfer",
    icon: "ArrowsRightLeftIcon"
  },
  {
    menuItemKey: "dps",
    to: "/user/dps",
    ariaLabel: "DPS",
    icon: "BanknotesIcon"
  },
  {
    menuItemKey: "fdr",
    to: "/user/fdr",
    ariaLabel: "FDR",
    icon: "DocumentTextIcon"
  },
  {
    menuItemKey: "loan",
    to: "/user/loan",
    ariaLabel: "Loan",
    icon: "ReceiptPercentIcon"
  },
  {
    menuItemKey: "payBill",
    to: "/user/pay-bill",
    ariaLabel: "Pay Bill",
    icon: "CalculatorIcon"
  },
  {
    menuItemKey: "transactions",
    to: "/user/transactions",
    ariaLabel: "Transactions",
    icon: "ClockIcon"
  },
  {
    menuItemKey: "withdraw",
    to: "/user/withdraw",
    ariaLabel: "Withdraw",
    icon: "ArrowDownTrayIcon"
  },
  {
    menuItemKey: "referral",
    to: "/user/referral",
    ariaLabel: "Referral",
    icon: "UserPlusIcon"
  },
  {
    menuItemKey: "portfolio",
    to: "/user/portfolio",
    ariaLabel: "Portfolio",
    icon: "ChartPieIcon"
  },
  {
    menuItemKey: "rewards",
    to: "/user/rewards",
    ariaLabel: "Rewards",
    icon: "GiftIcon"
  },
  {
    menuItemKey: "support",
    to: "/user/support",
    ariaLabel: "Support",
    icon: "ChatBubbleLeftRightIcon"
  },
  {
    menuItemKey: "settings",
    to: "/user/settings",
    ariaLabel: "Settings",
    icon: "Cog6ToothIcon"
  }
];

