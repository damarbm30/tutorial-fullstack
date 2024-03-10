"use client";

import PortalModal from "@/components/portal/portal-modal";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import PortalCalendar from "@/components/portal/portal-calendar";

export default function Portal() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Hi, User!</h1>
        <Button onClick={() => setOpen(true)}>Apply for leave</Button>
      </div>
      <PortalCalendar />
      <PortalModal open={open} onOpenChange={setOpen} />
    </Container>
  );
}
