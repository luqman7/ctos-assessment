"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const tabs = [
  { tabName: "add", label: "Add Employee" },
  { tabName: "edit", label: "Edit Employee" },
  { tabName: "view", label: "View Employee" },
];

export default function Tabs() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const renderTabs = tabs.map(({ tabName, label }) => (
    <Link key={tabName} href={`/?tab=${tabName}`} className="w-1/3">
      <div
        className={`${
          activeTab === tabName ? "bg-slate-200" : ""
        } p-2 rounded-xl text-xs lg:text-sm text-center  cursor-pointer`}
      >
        {label}
      </div>
    </Link>
  ));

  return (
    <div className="w-full flex justify-between bg-slate-300 p-1 rounded-xl">
      {renderTabs}
    </div>
  );
}
