"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Pencil,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useEffect, useRef, useState } from "react";

interface KitchenProfile {
  kitchenName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  logo?: string;
  dateOfJoining: string;
}

const initialData: KitchenProfile = {
  kitchenName: "SpiceHub Kitchen",
  ownerName: "Rahul Sharma",
  phone: "9876543210",
  email: "rahul@spicehub.com",
  address: "12-A, Food Street, Mumbai, India",
  logo: "",
  dateOfJoining: "2023-04-15",
};

export default function KitchenSettingsForm() {
  const [data, setData] = useState<KitchenProfile>(initialData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.logo) {
      setLogoPreview(data.logo);
    }
  }, [data.logo]);

  const handleFieldChange = (
    field: keyof KitchenProfile,
    value: string
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = () => {
    // Add save logic (e.g., API call)
    setEditingField(null);
  };

  const handleLogoUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        setData((prev) => ({ ...prev, logo: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    // Add actual delete logic
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6 p-4 md:p-6">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border shadow">
          {logoPreview ? (
            <Image
              src={logoPreview}
              alt="Logo"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-muted">
              No Logo
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2"
        >
          <UploadCloud size={16} />
          Upload Logo
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
          ref={fileInputRef}
        />
        <CardTitle className="text-center text-xl font-bold">
          Kitchen Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Kitchen Name */}
        <EditableField
          label="Kitchen Name"
          value={data.kitchenName}
          editable={editingField === "kitchenName"}
          onChange={(val) => handleFieldChange("kitchenName", val)}
          onEdit={() => handleEdit("kitchenName")}
        />

        {/* Owner Name */}
        <EditableField
          label="Owner Name"
          value={data.ownerName}
          editable={editingField === "ownerName"}
          onChange={(val) => handleFieldChange("ownerName", val)}
          onEdit={() => handleEdit("ownerName")}
        />

        {/* Phone (Read-only) */}
        <div className="space-y-1">
          <Label>Phone Number</Label>
          <p className="text-muted-foreground text-sm">
            {data.phone}
          </p>
        </div>

        {/* Email */}
        <EditableField
          label="Email"
          value={data.email}
          editable={editingField === "email"}
          onChange={(val) => handleFieldChange("email", val)}
          onEdit={() => handleEdit("email")}
        />

        {/* Address */}
        <EditableField
          label="Kitchen Address"
          value={data.address}
          editable={editingField === "address"}
          onChange={(val) => handleFieldChange("address", val)}
          onEdit={() => handleEdit("address")}
          isTextarea
        />

        {/* Date of Joining */}
        <div>
          <Label>Date of Joining</Label>
          <p className="text-muted-foreground text-sm mt-1">
            {data.dateOfJoining}
          </p>
        </div>

        {/* Save Button */}
        {editingField && (
          <Button onClick={handleSave} className="w-full mt-3">
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        )}

        {/* Delete Account Button with Confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full mt-6"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your kitchen profile and
                all data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction  className="bg-red-800 hover:bg-red-800/[0.9] text-white" onClick={handleDeleteAccount}>
                Confirm Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

interface EditableFieldProps {
  label: string;
  value: string;
  editable: boolean;
  onChange: (val: string) => void;
  onEdit: () => void;
  isTextarea?: boolean;
}

function EditableField({
  label,
  value,
  editable,
  onChange,
  onEdit,
  isTextarea = false,
}: EditableFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {!editable && (
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil size={16} />
          </Button>
        )}
      </div>
      {editable ? (
        isTextarea ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      ) : (
        <p className="text-muted-foreground text-sm">{value}</p>
      )}
    </div>
  );
}
