"use client";
import React from "react";
import PanelPage from "@/app/components/PanelPage";

export default function PlacesPage({ params }: { params: { id: string } }) {
  return <PanelPage params={params} pageKey="places" />;
}
