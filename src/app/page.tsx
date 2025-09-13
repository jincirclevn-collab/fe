import BalanceSection from "@/components/section/info/balance.section";
import WalletSection from "@/components/section/wallet/wallet.section";

export default function Home() {
  return (
    <div className="
    flex min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <WalletSection />
      <BalanceSection />
    </div>
  );
}
