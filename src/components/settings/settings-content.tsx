"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ProfileCard } from "@/components/settings/profile-card";
import { PrivacyCard } from "@/components/settings/privacy-card";
import { appearanceOptions, initialPreferences, initialProfile, notificationOptions, preferenceFields } from "@/data/settings";
import { useTheme } from "@/components/theme/theme-provider";
import { getPreferences, subscribePreferences, updatePreferences } from "@/services/preferences-service";
import type { UserPreferences } from "@/types/preferences";

export function SettingsContent() {
  const [profile, setProfile] = useState({ ...initialProfile });
  const [preferences, setPreferences] = useState({ ...initialPreferences });
  const userPreferences = useSyncExternalStore(subscribePreferences, getPreferences, () => null);
  const preferenceTheme = userPreferences?.theme;
  const { setTheme: setAppearance } = useTheme();
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (preferenceTheme) setAppearance(preferenceTheme);
  }, [preferenceTheme, setAppearance]);

  function updateUserPreferences(changes: Partial<UserPreferences>) {
    const nextPreferences = updatePreferences(changes);
    setFeedback("");
    return nextPreferences;
  }

  return (
    <div className="mt-8 space-y-6">
      <p className="text-sm leading-6 text-muted">Tema e notificações são salvos neste navegador. As demais opções são demonstrativas e são descartadas ao sair ou recarregar.</p>
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
          <p className="mt-1 text-sm leading-6 text-muted">Escolha os avisos que gostaria de receber. Nenhuma notificação será enviada nesta demonstração.</p>
          {userPreferences ? <div className="mt-4 space-y-1">
            {notificationOptions.map((option) => (
              <label key={option.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-2 text-sm text-brand-dark">
                <input type="checkbox" checked={userPreferences[option.id]} onChange={(event) => updateUserPreferences({ [option.id]: event.target.checked })} className="size-4 shrink-0 accent-brand" />
                {option.label}
              </label>
            ))}
          </div> : <p className="mt-4 text-sm text-muted">Carregando preferências...</p>}
        </section>
        <section aria-labelledby="appearance-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
          <h2 id="appearance-title" className="text-base font-semibold text-brand-dark">Aparência</h2>
          <fieldset className="mt-4" aria-busy={userPreferences === null}>
            <legend className="mb-3 text-sm text-muted">Tema preferido</legend>
            {userPreferences ? <div className="flex flex-wrap gap-3">
              {appearanceOptions.map((option) => (
                <label key={option.id} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm ${userPreferences.theme === option.id ? "border-brand bg-brand-light font-semibold text-brand-dark" : "border-outline text-muted"}`}>
                  <input type="radio" name="appearance" value={option.id} checked={userPreferences.theme === option.id} onChange={() => setAppearance(updateUserPreferences({ theme: option.id }).theme)} className="size-4 accent-brand" />
                  {option.label}
                </label>
              ))}
            </div> : <p className="text-sm text-muted">Carregando preferências...</p>}
          </fieldset>
          <p className="mt-4 text-xs leading-5 text-muted">O tema muda imediatamente e é salvo neste navegador. Sistema acompanha a aparência do seu dispositivo.</p>
        </section>
      </div>
      <PrivacyCard />
      <div>
        <button type="button" onClick={() => {
          setFeedback("Preferências confirmadas. Tema e notificações permanecem salvos neste navegador.");
        }} className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-on-brand hover:bg-brand-hover">Salvar preferências</button>
        <p role="status" className="mt-3 text-sm leading-6 text-brand">{feedback}</p>
      </div>
    </div>
  );
}
