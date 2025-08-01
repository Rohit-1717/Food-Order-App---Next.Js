"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function UserAccountPage() {
  const [user, setUser] = useState({
    name: "Rohit Vishwakarma",
    email: "rohit@example.com",
    phone: "+91 9876543210",
    address: "123, Food Street, City, Country",
    gender: "Male",
    dob: "1998-01-01",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleDelete = () => {
    toast.success("Account deleted successfully");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Avatar Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Profile</h2>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-2">
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUser((prev) => ({
                      ...prev,
                      avatarUrl: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              Change Avatar
            </Button>
          </div>

          <div className="text-center">
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Info Form */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold">User Info</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input
              disabled={!isEditing}
              value={user.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              disabled={!isEditing}
              value={user.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              disabled={!isEditing}
              value={user.dob}
              onChange={(e) => handleInputChange("dob", e.target.value)}
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Input
              disabled={!isEditing}
              value={user.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input disabled value={user.phone} />
          </div>
          <div>
            <Label>Address</Label>
            <Textarea
              disabled={!isEditing}
              value={user.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
          {isEditing && (
            <Button className="w-full" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" /> Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <p>
                This action cannot be undone. This will permanently delete your
                account.
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-800 hover:bg-red-800/[0.9] text-white"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
