import { VehicleCard } from "@/components/fleet/vehicle-card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Truck, Fuel, DollarSign } from "lucide-react"

export default function FleetPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Fleet Management</h1>
                    <p className="text-gray-400 mt-1">Real-time overview of vehicle status and fleet performance.</p>
                </div>
                <Button className="gap-2">
                    <Plus size={18} />
                    Add Vehicle
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat 1 */}
                <div className="bg-[#1A262B] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Truck size={48} className="text-primary" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Active Vehicles</p>
                    <div className="flex items-baseline gap-3">
                        <h3 className="text-3xl font-bold text-white">42</h3>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+2 this week</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[85%] rounded-full"></div>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-[#1A262B] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Users size={48} className="text-primary" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Drivers on Road</p>
                    <div className="flex items-baseline gap-3">
                        <h3 className="text-3xl font-bold text-white">38</h3>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+5%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full w-[70%] rounded-full"></div>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#1A262B] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Fuel size={48} className="text-primary" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Fuel Efficiency</p>
                    <div className="flex items-baseline gap-3">
                        <h3 className="text-3xl font-bold text-white">12.5 <span className="text-lg font-normal text-gray-500">km/L</span></h3>
                    </div>
                    <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[92%] rounded-full"></div>
                    </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-[#1A262B] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <DollarSign size={48} className="text-primary" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Fleet Revenue</p>
                    <div className="flex items-baseline gap-3">
                        <h3 className="text-3xl font-bold text-white">$124.5k</h3>
                        <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">+15%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full w-[65%] rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-xl font-bold text-white">Vehicle Status</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-[#1A262B] border border-white/10 text-xs font-medium text-white">All</button>
                    <button className="px-3 py-1.5 rounded-lg bg-transparent border border-transparent text-xs font-medium text-gray-400 hover:text-white">In Transit</button>
                    <button className="px-3 py-1.5 rounded-lg bg-transparent border border-transparent text-xs font-medium text-gray-400 hover:text-white">Idle</button>
                </div>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VehicleCard
                    name="Mercedes Sprinter"
                    plate="8292-XJ"
                    status="In Transit"
                    driverName="Ralph Edwards"
                    driverId="4421"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuBeHuAptRelURt-EB84wrwGzi--uLVVP6Gb-5h1EfsJ33IUKSEI8xhr97x-rexz2zV8SthFKASVrmeMhfYjTYdr9G-1oo__XWrFo8a7Q-H5S0VJMEfySdsytV5UstYJa2-hOym8gCkwTnU7FNdV2ZbwUCiAEUdERXOEOtqmrPlRbedTQ6DF4h5OcLAM_SygOhmG9nXDnqOfvfnE6hZlF7ooeugH2nN0hCEeMDEcAlH-KrvNXc4RhNDfQhBKZNDvwwyQHQtW9pfHzdpI"
                />
                <VehicleCard
                    name="Volvo FH16"
                    plate="3321-AB"
                    status="Maintenance"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuANzYSPUQQbyUdzjMuZG0GA_bOTh14e112XATwadZ-J1hm7mf-dfci_RZlSPCLTfo0fSIT7RBsAxLMuavRFquGKgdiI1W-VF2FjKUHyt09H2wuHjezY_lF9W2xHtLpA43YM9rl62OqY2xBHloe-b69rzP11kjW9miLBWiIL9EF35NioHr9wiy-hMaMRzvY3xXpIKXSCVesxpt6qlxcf2CdzG9e9N09y8c9mEY8voYk8p4D6yrd66VQzCHsSwgc2WMU8w5tyxikeDV_B"
                />
                <VehicleCard
                    name="Scania R500"
                    plate="9982-LM"
                    status="In Transit"
                    driverName="Arlene McCoy"
                    driverId="1192"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuBe2BgiC4TNiFyKteLEW2ikzqEDCMUE7DzTueUFafBFwjhBvU9cK0icE7tCvLdjsIj8Kc8CZqCsBZ8xNe_LldlZ2PtWZNGL_mWeUYqThxdfpqWFu8dBCehxWpokAYszwSJYQb4MD1esJIqq0tM8mq5cedCzPq-z7Ao1qdQDSliC7RnP6WqUrJdmxHuKh4oueRRcmn8S_ACPrpAfaaoCe3ORtc15J7LFCUoegUkqXILMUW-CH7dlbRxbhc2HK0WX45210RJn8BZlGUPD"
                />
                <VehicleCard
                    name="MAN TGX"
                    plate="1123-PO"
                    status="Idle"
                    driverName="Wade Warren"
                    driverId="8832"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuAH7dMYUJHTX7yiUQRfd0sCTMIJs3OxSweDWMyGtKZ3Gxf0plGIoWhSCbMEqlpP794jQzLvB-FjX3_ni_stJwTsm3i9mPpIng1Hf3Shpq3AmErC-ZPuaYe43XT6_F-vVNLQJt9Yf74jCzkFD-CzS7UFvqLVu_Z43vsv0ehqX-gmepAKGl-ykBhGvGbVeEnkjMCkUrJp7VWppU-yUDKFpNc45zzcrUBYGKuDIIcMu4Z4q0n9f4bUmpd2neQRURQu6aq-lmvwEovACo7O"
                />
                <VehicleCard
                    name="DAF XF"
                    plate="7765-TY"
                    status="In Transit"
                    driverName="Bessie Cooper"
                    driverId="2214"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuDnSO8XvyUtMrCVSwt36JqEa4BKIZ2a_pF-efsuq2QlAT3Iga565mhAdEB0uwZDaoLRABCIcsZRjmZVm_3NE7Or3l3BZgZzeiQEc0FrCrR9ZvMp4Q0wByHdsbDzoodIdiDhDqtEgv8yXn7OH-Tt0tuP4E4nQg7aiOyfhuUmOuBzK6FE5pGCm9UAEazW-lolqBw0x72jWYpFTuY0sZ5qwzNIAM1rxqoz5fIPE5NV4qVham42WjAEWV0PSarf4WrbtX0-KzpETkYKOkCN"
                />
                <VehicleCard
                    name="Iveco S-Way"
                    plate="4451-KL"
                    status="In Transit"
                    driverName="Marvin McKinney"
                    driverId="9901"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCgGgUQkWwZlFP-5aMdAfLg0FRh7tq7ciT1dHjuV5sZ_suoCOHc7tIixKdXTnuW9fE1p_rVouDecW1yOuCgT7NAUIzB71Q0APJDBnJxsLIE8sPGRw2aEoG06XjW6jUMkxoN7483_tdxZjp5tDuZ8L4Wmsoexsui1JEdEoCcm2tvDbczp8pkiSfblIHmqE7ETFqaqlR-EXCLWpdjI6Jy22a1U7nnZ7oU6748Al0HyWYJYwP1crKJsPutWWLHFqhfmYtQZH7FH3XtcLWi"
                />
            </div>
        </div>
    )
}
