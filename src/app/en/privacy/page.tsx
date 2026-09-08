import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Home, Phone, Mail, Building } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DASAN Pharmaceutical',
  description: 'Privacy Policy guidelines of DASAN Pharmaceutical Co., Ltd.',
};

export default function EnPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-28 sm:pt-32">
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 mb-8">
        <div className="pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Dasan Pharmaceutical values your personal information and complies with relevant privacy laws.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-10 md:p-14 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed break-keep">

          {/* Intro Notice */}
          <div className="space-y-4 pb-6 border-b border-slate-100">
            <p>
              &apos;Dasan Pharmaceutical Co., Ltd.&apos; (hereinafter referred to as &apos;Company&apos;) values your personal information and complies with the Act on Promotion of Information and Communications Network Utilization and Information Protection.
            </p>
            <p>
              Through this Privacy Policy, the Company informs you of the purposes and methods for which personal information you provide is used, and the measures taken to protect personal information.
            </p>
            <p>
              When the Company revises its Privacy Policy, it will notify users through website announcements (or individual notices).
            </p>
            <div className="pt-2">
              <span className="inline-block px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs sm:text-sm font-semibold">
                ◇ Effective Date: August 1, 2013
              </span>
            </div>
          </div>

          {/* 1. Items of Personal Information Collected */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              ■ Items of Personal Information Collected
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The Company collects the following personal information for membership registration, counseling, service requests, etc.
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-sm sm:text-base text-slate-800">
              <p>
                <strong className="text-emerald-700 font-bold">◇ Collected Items:</strong> ID, Password, Name, Email, Address, Telephone Number, Mobile Phone Number, Cookies
              </p>
              <p>
                <strong className="text-emerald-700 font-bold">◇ Collection Method:</strong> Official Website
              </p>
            </div>
          </section>

          {/* 2. Purpose of Collection and Use of Personal Information */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              ■ Purpose of Collection and Use of Personal Information
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The Company utilizes the collected personal information for the following purposes:
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 text-sm sm:text-base text-slate-800">
              <div>
                <p className="font-bold text-emerald-700">◇ Fulfillment of Contract and Fee Settlement for Service Provision</p>
                <p className="pl-4 text-slate-700 mt-1">Providing contents and essential business responses.</p>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <p className="font-bold text-emerald-700">◇ Member Management</p>
                <p className="pl-4 text-slate-700 mt-1">
                  Identity verification for membership services, individual identification, prevention of improper use by fraudulent members and unauthorized use, confirmation of enrollment intent, complaint handling, and notice delivery.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Retention and Use Period */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              ■ Retention and Use Period of Personal Information
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              In principle, after the purpose of collecting and using personal information is achieved, the relevant information is destroyed without delay. However, if preservation is necessary pursuant to applicable laws and regulations, the Company retains member information for the period specified below:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 text-sm sm:text-base">
              <li>Preserved item: Payment records (3 years)</li>
              <li>Records on contract or subscription withdrawal: 5 years (Act on Consumer Protection in Electronic Commerce)</li>
              <li>Records on payment and supply of goods: 5 years (Act on Consumer Protection in Electronic Commerce)</li>
              <li>Records on consumer complaints or dispute settlement: 3 years (Act on Consumer Protection in Electronic Commerce)</li>
            </ul>
          </section>

          {/* 4. Customer Service Contact */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              ■ Customer Service & Privacy Officer Contact
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The Company designates the relevant department and privacy officer as follows to protect customers&apos; personal information and handle complaints related to personal information:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Department in Charge</p>
                  <p className="text-sm sm:text-base font-bold text-slate-900">HR &amp; General Affairs Team</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Telephone</p>
                  <a href="tel:02-2679-5206" className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700">
                    +82-2-2679-5206
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
