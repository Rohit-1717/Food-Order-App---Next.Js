"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export function OrderQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>#124 | Paneer Tikka</li>
          <li>#125 | Veg Biryani</li>
        </ul>
      </CardContent>
    </Card>
  );
}
