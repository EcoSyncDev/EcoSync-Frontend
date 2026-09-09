"use client";

import { useState } from "react";
import { ProfileCard } from "@/components/settings/profile-card";
import { PrivacyCard } from "@/components/settings/privacy-card";
import { appearanceOptions, initialNotifications, initialPreferences, initialProfile, notificationOptions, preferenceFields } from "@/data/settings";
import { useTheme } from "@/components/theme/theme-provider";

export function SettingsContent() {
  const [profile, setProfile] = useState({ ...initialProfile });
  const [preferences, setPreferences] = useState({ ...initialPreferences });
  const [notifications, setNotifications] = useState({ ...initialNotifications });
  const { theme: appearance, setTheme: setAppearance } = useTheme();
  const [feedback, setFeedback] = useState("");

  return (
    <div className="mt-8 space-y-6">
      <p className="text-sm leading-6 text-muted">O tema é aplicado em todo o sistema e salvo neste navegador. As demais opções são demonstrativas e são descartadas ao sair ou recarregar.</p>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProfileCard profile={profile} onSave={setProfile} />
        <section aria-labelledby="preferences-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
          <h2 id="preferences-title" className="text-base font-semibold text-brand-dark">Preferências</h2>
          <p className="mt-1 text-sm leading-6 text-muted">Estas seleções não alteram as unidades ou o idioma das outras telas.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {preferenceFields.map((field) => (
              <div key={field.id} className="min-w-0">
                <label htmlFor={`preference-${field.id}`} className="text-sm font-medium text-brand-dark">{field.label}</label>
                <select id={`preference-${field.id}`} value={preferences[field.id]} onChange={(event) => { setPreferences({ ...preferences, [field.id]: event.target.value }); setFeedback(""); }} className="mt-2 min-h-11 w-full min-w-0 rounded-lg border border-outline bg-surface px-3 py-2 text-sm text-brand-dark">
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            ))}
          </div>
        </section>
        <section aria-labelledby="notifications-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
          <h2 id="notifications-title" className="text-base font-semibold text-brand-dark">Notificações</h2>
          <p className="mt-1 text-sm leading-6 text-muted">Simule quais avisos gostaria de receber. Nenhuma notificação será enviada.</p>
          <div className="mt-4 space-y-1">
            {notificationOptions.map((option) => (
              <label key={option.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-2 text-sm text-brand-dark">
                <input type="checkbox" checked={notifications[option.id]} onChange={(event) => { setNotifications({ ...notifications, [option.id]: event.target.checked }); setFeedback(""); }} className="size-4 shrink-0 accent-brand" />
                {option.label}
              </label>
            ))}
          </div>
        </section>
        <section aria-labelledby="appearance-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
          <h2 id="appearance-title" className="text-base font-semibold text-brand-dark">Aparência</h2>
          <fieldset className="mt-4">
            <legend className="mb-3 text-sm text-muted">Tema preferido</legend>
            <div className="flex flex-wrap gap-3">
              {appearanceOptions.map((option) => (
                <label key={option.id} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm ${appearance === option.id ? "border-brand bg-brand-light font-semibold text-brand-dark" : "border-outline text-muted"}`}>
                  <input type="radio" name="appearance" value={option.id} checked={appearance === option.id} onChange={() => { setAppearance(option.id); setFeedback(""); }} className="size-4 accent-brand" />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <p className="mt-4 text-xs leading-5 text-muted">O tema muda imediatamente e é salvo neste navegador. Sistema acompanha a aparência do seu dispositivo.</p>
        </section>
      </div>
      <PrivacyCard />
      <div>
        <button type="button" onClick={() => {
          // Confirma apenas o estado em memória; sem API, cookies ou armazenamento persistente.
          setFeedback("Preferências confirmadas para esta demonstração. Apenas o tema permanece salvo ao sair ou recarregar.");
        }} className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-on-brand hover:bg-brand-hover">Salvar preferências</button>
        <p role="status" className="mt-3 text-sm leading-6 text-brand">{feedback}</p>
      </div>
    </div>
  );
}
