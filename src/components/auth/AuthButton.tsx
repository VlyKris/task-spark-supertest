/**
 * This component should be used on the header of the landing page to allow the user to sign in or sign up.
 * It will show a modal by default. Set the useModal prop to false to redirect to the auth page instead.
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthCard } from "./AuthCard";

interface AuthButtonProps {
  trigger?: React.ReactNode;
  dashboardTrigger?: React.ReactNode;
  useModal?: boolean;
}

const UnauthenticatedButton = ({ useModal, trigger }: AuthButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const navigate = useNavigate();

  const handleOpenChange = (newOpen: boolean) => {
    if (isRedirecting && !newOpen) {
      return;
    }
    setOpen(newOpen);
  };

  const handleAuthSuccess = () => {
    setIsRedirecting(true);
  };

  return (
    <div>
      {useModal ? (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            {trigger || <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">Get Started</Button>}
          </DialogTrigger>
          <DialogContent className="bg-transparent border-none shadow-none">
            <DialogTitle></DialogTitle>
            <AuthCard onAuthSuccess={handleAuthSuccess} />
          </DialogContent>
        </Dialog>
      ) : trigger ? (
        <div onClick={() => navigate("/auth")}>{trigger}</div>
      ) : (
        <Button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">Get Started</Button>
      )}
    </div>
  );
};

export function AuthButton({
  trigger,
  dashboardTrigger,
  useModal = true,
}: AuthButtonProps) {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <Button disabled className="bg-green-600 text-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      </Button>
    );
  }

  return (
    <div>
      <Authenticated>
        {dashboardTrigger ? (
          <div>
            {dashboardTrigger}
          </div>
        ) : (
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        )}
      </Authenticated>

      <Unauthenticated>
        <UnauthenticatedButton useModal={useModal} trigger={trigger} />
      </Unauthenticated>
    </div>
  );
}
