"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export function Notifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <p>No new alerts.</p>
      </CardContent>
    </Card>
  )
}
