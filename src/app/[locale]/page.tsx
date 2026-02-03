'use client'

import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { MotionDiv } from '@/components/ui/motion'
import { motion } from 'framer-motion'
import { Package2, Truck, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Hero')

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gunmetal text-white font-sans antialiased">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdL8wbsDM1m6kbaH1G1FVb8KouI6tvmdC4xityl1PowThOJX2oiJWs0xt2EP-EEM2Ws0MUHFwIoMHF5Kd3JlIIrndjlK2bJIY_zl67kqhtLLi8ro9EQXaGE0XIghiTbuXlNfe0TAJ_hqK3q2XkcMgSzqxsS89s2gNJ42INpZwg0U71L6TbdQAq5VwH0xzohJuG0DK9hkliATo-rI_Iwg9PX7-SlPSyp4EradOgdo3iv3udRLSQ7x5MJ7J7VPsm2vDKgbO4zDQiyMc5')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gunmetal via-gunmetal/95 to-gunmetal pointer-events-none"></div>

      <Navbar />

      {/* Main Hero Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="w-full max-w-[1280px] px-6 lg:px-8 mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-medium text-primary tracking-wide uppercase">New Route: Paris ↔ Casablanca</span>
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white"
                  dangerouslySetInnerHTML={{ __html: t.raw('title') }}
                />
                <p className="text-slate-400 text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {t('subtitle')}
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
              >
                {/* Primary CTA */}
                <Link href="/signup">
                  <button className="group flex items-center justify-center gap-3 bg-primary hover:bg-[#00a0b5] text-gunmetal text-base font-bold rounded-2xl px-8 py-4 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,189,214,0.4)] w-full sm:w-auto">
                    <span>{t('senderBtn')}</span>
                    <Package2 size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                {/* Outline CTA */}
                <Link href="/signup">
                  <button className="group flex items-center justify-center gap-3 bg-transparent border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/10 text-base font-bold rounded-2xl px-8 py-4 transition-all w-full sm:w-auto">
                    <span>{t('driverBtn')}</span>
                    <Truck size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </MotionDiv>

              {/* Trust Indicators */}
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-6 pt-4 opacity-70"
              >
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-gunmetal object-cover" alt="User avatar 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpIZHg1C83jrG1ro2zX3OgNoIhC6tpK3nFG7C4MyyFvJdq4PCk_rzJFHGZQfk_mqykxBnJJeRVp40KF9ioRZ8F8NFWGj4ZJiE9ITpqh16zh_NBFQ07__83P4ruMofRW-I6FhihwgJFPbvdJquvSw3J8DlSyOxRejUdVzHWJgVsmse_d_7XkKa47V34AAfTFw0mfnI3_vOx03veZaY6WlrrB9W_JaXrwUvFpDj0KyJ3VXxOppKUp_QGDGUdJngLl6MWdkl2ueYHegam" />
                  <img className="w-10 h-10 rounded-full border-2 border-gunmetal object-cover" alt="User avatar 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM_ZC7gesjz8jTHn7eZs2RwDVNDz1LD7JYkYOyHIyLTEct2wQjZKXUc3EWmsS0kVMB20jNZDGR2dlZpYNXYlG-V68m5S4Fk9vQnd3wZT_qR58MEi2nbLV8cFDOv23nv3xvl-FvxhtxAtOsulZJjzP-CjYYDV6kbDEPnKjtsjkKRMzejiCkmnd-9VsX6KREdEHSIJrvr0HQ5bLYHR6hyNGLC8pGgpKHilEBNgYMlQu9eAo_FcIexves9StQ8O-WYpYNI5G8_ANwhO5n" />
                  <img className="w-10 h-10 rounded-full border-2 border-gunmetal object-cover" alt="User avatar 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjFuhQqhHwbDbktNlgb9ygF1zyD9JuVprUtyIdj7_MIi-QxoeeJ1vpXkfWBemsRVtayVRBkoL2ygKHuWYwwFNC-tVRH92ZvyNml0CEBOv9MECVWWHfQin-naEZ93DyQ7iPMnNdsiGXv1nWnx3ceDS1nrDX01Ag6l-OUBN_yCOofchRotolJLpGnu053YlHdtno6WMUh4Apqk0tEVBs8AusXMsBNK2rM9PVbHmAcesSUxInK_3GfSUaUwLb5OiRdpcZTfmZCQjbaF7n" />
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400 text-sm">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <span className="text-xs font-medium text-slate-400">Trusted by 10k+ users</span>
                </div>
              </MotionDiv>
            </div>

            {/* Right Column: 3D Mockup */}
            <div className="lg:col-span-5 perspective-container mt-12 lg:mt-0 relative z-10 w-full max-w-md mx-auto lg:max-w-none">
              {/* Decorative Elements behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

              <motion.div
                initial={{ rotateY: -15, rotateX: 5, opacity: 0 }}
                animate={{ rotateY: -15, rotateX: 5, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="tilted-card relative bg-[#1a2529] border-[6px] border-[#2c3b42] rounded-[3rem] shadow-2xl overflow-hidden aspect-[9/19] max-h-[600px] mx-auto"
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#2c3b42] rounded-b-xl z-20"></div>

                {/* Screen Content */}
                <div className="relative w-full h-full bg-[#0D1619] flex flex-col">
                  {/* App Header */}
                  <div className="px-6 pt-10 pb-4 flex justify-between items-center z-10 bg-gradient-to-b from-[#0D1619] to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-gray-700 overflow-hidden">
                        <img className="w-full h-full object-cover" alt="Driver profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQzqFd77eCYxiZZImAozuI4YjXWgvggsymqqU0BNQQtGnAP6LtyKJFpbkwj-Qh_TwVJ4ugIfaumIqJkF4Zz48_N6XyKUTAg_IOJ9joGyc1tUqL6uI_ZsC194Q2fvh_YYqLdjIgUI5Qr8gpNvYWGwCUlaHLisrB_bEUqIXhSTd53sj6R7GR2DRcR2HPLMmjW60-QoWMY7LgWOSwQWaSP87e7E7ATRCL_pYQKkljKnCkaj1f4nJ1_n0e5o7rn0T76k9ahcC4S5f1aSSG" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Driver</p>
                        <p className="text-sm font-bold text-white">Hassan Benali</p>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="material-symbols-outlined text-primary text-sm">
                        {/* Using simple SVG icon for chat since material-symbols might not be loaded */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                      </span>
                    </div>
                  </div>

                  {/* Map Area */}
                  <div className="relative flex-1 bg-gray-800">
                    <img className="w-full h-full object-cover opacity-60 grayscale" alt="Map showing route from Paris to Tangier" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6IRDna5pAATVuOugruHwOIVUCJFGUfVMbyCvUO5ZpM5V5SrH4xEOb8XYDEYF-m2itJyEEbBXXi2GuMNcIrlciPie0JRG21eOyA-JajmZj4b2W3_UsGZzeh78Hc7ODnBBoOeGVtRiGNtKUG8UtNN8Bp6hfIh__P3hjLmKv_mu3gfi6WDsQGsT49vIIXlBVVzo_KKrfn5IwGxWruW95HhcY4DH7unPkBB0ufJfYWEVLb4FTh3PIv2B9uf6SaQh3RrVGQsQcjMVV7Mie" />
                    {/* Route Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 300 600">
                        <path d="M150 100 Q 200 300 150 500" stroke="#00bdd6" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="4">
                          <animate attributeName="stroke-dashoffset" dur="2s" from="100" repeatCount="indefinite" to="0"></animate>
                        </path>
                        {/* Location Pin Start */}
                        <circle cx="150" cy="100" fill="#00bdd6" r="6"></circle>
                        <circle cx="150" cy="100" r="12" stroke="#00bdd6" strokeOpacity="0.3" strokeWidth="2"></circle>
                        {/* Location Pin End */}
                        <circle cx="150" cy="500" fill="white" r="6"></circle>
                      </svg>
                    </div>

                    {/* Tracking Card Overlay */}
                    <div className="absolute bottom-6 left-4 right-4 bg-[#1a2529]/90 backdrop-blur-md rounded-2xl p-4 border border-white/5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Estimated Arrival</p>
                          <p className="text-lg font-bold text-white">2 Days 4 Hours</p>
                        </div>
                        <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-medium">
                          On Time
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[65%] rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                        <span>Paris</span>
                        <span>Tangier</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <div className="h-32 bg-gradient-to-t from-gunmetal to-transparent w-full pointer-events-none absolute bottom-0 z-10"></div>
    </div>
  )
}
