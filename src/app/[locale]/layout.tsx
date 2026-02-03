import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: 'Atlas Connect - Cross-Border Logistics',
    description: 'Connecting senders and drivers for secure shipments between Europe and Morocco.',
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'ar', 'fr', 'es', 'nl', 'de'].includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    const direction = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={direction} className="dark">
            <body className={`${inter.variable} font-sans bg-gunmetal text-white min-h-screen flex flex-col`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Toaster />
            </body>
        </html>
    );
}
