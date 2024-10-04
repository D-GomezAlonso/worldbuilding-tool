"use client";
import React from "react";
import PanelPage from "@/app/components/PanelPage";

export default function MapsPage({ params }: { params: { id: string } }) {
  return <PanelPage params={params} pageKey="maps" />;
}
