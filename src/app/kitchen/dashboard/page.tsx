import { Inventory } from "@/components/Inventory";
import { LiveOrders } from "@/components/LiveOrders";
import { OrderHistory } from "@/components/OrderHistory";
import { Notifications } from "@/components/OrderNotifications";
import { OrderQueue } from "@/components/OrderQueue";
import { ProfileSettings } from "@/components/ProfileSettings";

export default function KitchenDashboard() {
  return (
    <div className="mx-auto px-4 md:px-6 py-4 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LiveOrders />
        <OrderQueue />
        <Inventory />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileSettings />
        <OrderHistory />
        <Notifications />
      </div>
    </div>
  );
}
