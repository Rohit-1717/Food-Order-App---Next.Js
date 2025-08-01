"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Textarea } from "@/components/ui/textarea";

type OrderStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  time: string;
  paymentMode: string;
  paymentDetails: string;
  status: OrderStatus;
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [cancelReason, setCancelReason] = useState("");

  const handleAccept = () => setStatus("accepted");
  const handleReject = () => setStatus("rejected");

  const handleStatusChange = (newStatus: OrderStatus) => {
    setStatus(newStatus);
  };

  const handleCancel = () => {
    setStatus("cancelled");
    setCancelReason(""); // clear reason
    // You can also send cancelReason to the backend here
  };

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "accepted":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      case "preparing":
        return "bg-blue-200 text-blue-800";
      case "ready":
        return "bg-indigo-200 text-indigo-800";
      case "out-for-delivery":
        return "bg-purple-200 text-purple-800";
      case "cancelled":
        return "bg-gray-300 text-gray-800";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 md:p-6 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h4 className="font-semibold text-base md:text-lg">
              Order ID:{" "}
              <span className="text-muted-foreground">{order.id}</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Placed by {order.customerName} at{" "}
              {new Date(order.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Badge className={cn("text-sm", getStatusBadgeColor(status))}>
            {status.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <Label>Payment Mode</Label>
            <p className="text-muted-foreground">{order.paymentMode}</p>
          </div>
          <div>
            <Label>Payment Details</Label>
            <p className="text-muted-foreground">{order.paymentDetails}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {status === "pending" && (
            <>
              <Button onClick={handleAccept}>Accept</Button>
              <Button onClick={handleReject} variant="destructive">
                Reject
              </Button>
            </>
          )}

          {["accepted", "preparing", "ready", "out-for-delivery"].includes(
            status
          ) && (
            <>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Update Status
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleStatusChange(value as OrderStatus)
                  }
                  value={
                    ["preparing", "ready", "out-for-delivery"].includes(status)
                      ? status
                      : undefined
                  }
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="out-for-delivery">
                      Out For Delivery
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cancel Popover */}
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-900 hover:bg-red-900 hover:marker:text-white"
                  >
                    Cancel Order
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 space-y-3"
                  align="center"
                  side="top"
                >
                  <p className="text-sm font-medium">Are you sure to cancel?</p>
                  <Textarea
                    placeholder="Add a reason (optional)"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <Button
                    onClick={handleCancel}
                    variant="destructive"
                    className="w-full"
                  >
                    Confirm Cancel
                  </Button>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
