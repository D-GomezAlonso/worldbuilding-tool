"use client";
import React from "react";
import PanelPage from "@/app/components/PanelPage";

export default function BlogsPage({ params }: { params: { id: string } }) {
  return <PanelPage params={params} pageKey="blogs" />;
}