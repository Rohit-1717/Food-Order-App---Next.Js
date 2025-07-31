"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LiveOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <p>No active orders at the moment.</p>
      </CardContent>
    </Card>
  );
}
