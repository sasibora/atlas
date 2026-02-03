export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gunmetal relative overflow-hidden p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdL8wbsDM1m6kbaH1G1FVb8KouI6tvmdC4xityl1PowThOJX2oiJWs0xt2EP-EEM2Ws0MUHFwIoMHF5Kd3JlIIrndjlK2bJIY_zl67kqhtLLi8ro9EQXaGE0XIghiTbuXlNfe0TAJ_hqK3q2XkcMgSzqxsS89s2gNJ42INpZwg0U71L6TbdQAq5VwH0xzohJuG0DK9hkliATo-rI_Iwg9PX7-SlPSyp4EradOgdo3iv3udRLSQ7x5MJ7J7VPsm2vDKgbO4zDQiyMc5')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>

            {/* Gradient Overlay */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-gunmetal via-gunmetal/95 to-gunmetal pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md bg-[#1a262b]/80 backdrop-blur-md border border-surface rounded-3xl p-8 shadow-2xl shadow-black/50">
                <div className="flex flex-col items-center mb-8">
                    <div className="size-12 text-primary mb-4">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Atlas Connect</h1>
                </div>

                {children}
            </div>
        </div>
    )
}
