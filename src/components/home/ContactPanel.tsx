'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ContactInfo } from '@/content/contact';

const field =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-[15px] text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-300 dark:focus:bg-neutral-900';

// Contact modal body: intro + details on the left, message form on the right (stacked on mobile).
// The form is a mockup for now — submitting shows a notice instead of sending (no mail backend yet).
export default function ContactPanel({ contact }: { contact: ContactInfo }) {
  const t = useTranslations('home.contact');
  const [notice, setNotice] = useState(false);

  const details = [
    { label: t('email'), value: contact.email, href: `mailto:${contact.email}` },
    { label: t('phone'), value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { label: t('kakao'), value: contact.kakao },
    { label: t('wechat'), value: contact.wechat },
  ];

  return (
    <div className="grid gap-12 px-6 pt-12 pb-10 md:grid-cols-[1fr_1.35fr] md:gap-16 md:px-16 md:pt-16 md:pb-16">
      <div>
        <h2 id="contact-modal-title" className="text-4xl font-bold tracking-tight md:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 text-neutral-500 md:mt-8 dark:text-neutral-400">{t('desc')}</p>

        <dl className="mt-10 grid grid-cols-[5.5rem_1fr] gap-y-3 text-[15px] md:mt-24">
          {details.map((d) => (
            <div key={d.label} className="contents">
              <dt className="text-neutral-500 dark:text-neutral-400">{d.label}</dt>
              <dd>
                {d.href ? (
                  <a href={d.href} className="hover:underline">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
        className="flex flex-col gap-5"
      >
        <Field id="contact-name" label={t('name')}>
          <input id="contact-name" name="name" required autoComplete="name" placeholder={t('namePh')} className={`${field} h-12`} />
        </Field>
        <Field id="contact-email" label={t('email')}>
          <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder={t('emailPh')} className={`${field} h-12`} />
        </Field>
        <Field id="contact-subject" label={t('subject')}>
          <input id="contact-subject" name="subject" placeholder={t('subjectPh')} className={`${field} h-12`} />
        </Field>
        <Field id="contact-message" label={t('message')}>
          <textarea id="contact-message" name="message" required rows={6} placeholder={t('messagePh')} className={`${field} resize-y py-3`} />
        </Field>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="h-12 cursor-pointer rounded-full bg-neutral-900 px-10 text-[15px] font-medium text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-neutral-900"
          >
            {t('send')}
          </button>
          <p role="status" className="text-sm text-neutral-500 dark:text-neutral-400">
            {notice && t('notConnected', { email: contact.email })}
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      {children}
    </div>
  );
}
