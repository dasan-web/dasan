import React from 'react';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="management-root select-text min-h-screen">
      {children}
    </div>
  );
}
