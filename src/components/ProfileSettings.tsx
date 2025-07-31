"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile & Restaurant Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Edit profile, working hours, and kitchen details.</p>
      </CardContent>
    </Card>
  );
}
