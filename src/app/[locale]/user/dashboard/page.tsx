import { Suspense } from "react";
import Loading from "@/components/Loading";
import {
  DocumentTextIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBgColor: string;
  currency?: string;
}

interface AccountCard {
  id: string;
  title: string;
  accountNumber: string;
  balance: number;
  lastLogin: string;
}

interface ServiceCard {
  id: string;
  title: string;
  value: number;
  message: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBgColor: string;
}

const accountInfo: AccountCard = {
  id: "default-account",
  title: "Default Account",
  accountNumber: "DGB900312386347845",
  balance: 40.4,
  lastLogin: "At 26 Feb, 12:07 AM, Windows, Chrome",
};

const dashboardCards: DashboardCard[] = [
  {
    id: "all-transactions",
    title: "All Transactions",
    value: "0",
    icon: ClipboardDocumentListIcon,
    iconBgColor: "bg-blue-500",
  },
  {
    id: "total-deposit",
    title: "Total Deposit",
    value: "0",
    currency: "USD",
    icon: ShieldCheckIcon,
    iconBgColor: "bg-purple-500",
  },
  {
    id: "total-transfer",
    title: "Total Transfer",
    value: "0",
    currency: "USD",
    icon: ArrowsRightLeftIcon,
    iconBgColor: "bg-blue-500",
  },
  {
    id: "total-pay-bill",
    title: "Total Pay Bill",
    value: "0",
    icon: BellIcon,
    iconBgColor: "bg-red-500",
  },
  {
    id: "referral-bonus",
    title: "Referral Bonus",
    value: "0",
    currency: "USD",
    icon: UserPlusIcon,
    iconBgColor: "bg-blue-500",
  },
  {
    id: "total-dps",
    title: "Total DPS",
    value: "0",
    icon: ShieldCheckIcon,
    iconBgColor: "bg-purple-500",
  },
  {
    id: "total-fdr",
    title: "Total FDR",
    value: "0",
    icon: BanknotesIcon,
    iconBgColor: "bg-orange-500",
  },
  {
    id: "total-loan",
    title: "Total Loan",
    value: "0",
    icon: DocumentTextIcon,
    iconBgColor: "bg-purple-500",
  },
  {
    id: "deposit-bonus",
    title: "Deposit Bonus",
    value: "0",
    currency: "USD",
    icon: ArrowDownTrayIcon,
    iconBgColor: "bg-green-500",
  },
  {
    id: "total-referral",
    title: "Total Referral",
    value: "1",
    icon: UserPlusIcon,
    iconBgColor: "bg-cyan-500",
  },
  {
    id: "total-withdraw",
    title: "Total Withdraw",
    value: "0",
    currency: "USD",
    icon: ArrowDownTrayIcon,
    iconBgColor: "bg-red-500",
  },
  {
    id: "total-ticket",
    title: "Total Ticket",
    value: "0",
    icon: ChatBubbleLeftRightIcon,
    iconBgColor: "bg-emerald-500",
  },
];

const commonCardClasses = {
  wrapper: "bg-white rounded-lg shadow-sm hover:shadow-lg p-4 flex-1 basis-[calc(25%-16px)] min-w-[250px] flex flex-col justify-center gap-4 border border-gray-100 transition-shadow duration-300",
  iconWrapper: "rounded-full p-2 w-10 h-10 flex items-center justify-center transition-shadow duration-300 hover:shadow-lg",
  title: "text-gray-600 text-sm font-medium",
  value: "text-2xl font-bold mt-2",
};

const serviceCards: ServiceCard[] = [
  {
    id: "my-dps",
    title: "My DPS",
    value: 0.00,
    message: "Currently No DPS Found.",
    icon: ShieldCheckIcon,
    iconBgColor: "bg-red-500",
  },
  {
    id: "my-fdr",
    title: "My FDR",
    value: 0.00,
    message: "Currently No FDR Found.",
    icon: BanknotesIcon,
    iconBgColor: "bg-red-500",
  },
  {
    id: "my-loan",
    title: "My Loan",
    value: 0.00,
    message: "Currently No Loan Found.",
    icon: DocumentTextIcon,
    iconBgColor: "bg-red-500",
  },
];
export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="p-6 flex flex-col gap-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="rounded-lg shadow-sm p-4 w-full flex flex-col justify-center gap-4 border border-gray-100 bg-gradient-to-br from-green-400 to-green-500 text-white">
            <h2 className="font-medium">{accountInfo.title}</h2>
            <p className="text-3xl font-bold mt-2">
              ${accountInfo.balance.toFixed(2)}
            </p>

            <div className="mt-4 text-sm opacity-90">
              <p className="flex items-center gap-2">
                A/C: {accountInfo.accountNumber}
                <button className="opacity-75 hover:opacity-100">
                  <ClipboardDocumentListIcon className="w-4 h-4" />
                </button>
              </p>

              <p className="text-xs mt-1">Last Login {accountInfo.lastLogin}</p>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full text-sm transition-colors">
                ALL WALLETS
              </button>

              <button className="bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full text-sm transition-colors">
                ADD MONEY
              </button>
            </div>
          </div>

          {serviceCards.map((card) => (
            <div key={card.id} className="bg-admimprimary rounded-lg shadow-sm hover:shadow-lg p-4 flex flex-col justify-between gap-4 border border-gray-100 transition-shadow duration-300">
              <div className="flex items-center gap-2">
                <div className={`${commonCardClasses.iconWrapper} ${card.iconBgColor}`}>
                  <card.icon className="w-5 h-5 text-white transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="font-medium">{card.title}</h3>
              </div>
              <p className="text-gray-500 text-sm">{card.message}</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">${card.value.toFixed(2)}</p>
                <button className="text-blue-600 hover:text-blue-700">
                  <ArrowsRightLeftIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {dashboardCards.map((card) => (
            <div key={card.id} className={commonCardClasses.wrapper}>
              <div className="flex items-start justify-between w-full">
                <div className={`${commonCardClasses.iconWrapper} ${card.iconBgColor}`}>
                  <card.icon className="w-5 h-5 text-white transition-transform duration-300 hover:scale-110" />
                </div>
              </div>
              <h3 className={commonCardClasses.title}>{card.title}</h3>
              <p className={commonCardClasses.value}>
                {card.currency && "$"}
                {card.value} {card.currency}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
