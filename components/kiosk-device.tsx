import type { ReactNode } from "react"

interface KioskDeviceProps {
  children: ReactNode
}

export default function KioskDevice({ children }: KioskDeviceProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl p-6">
      {/* Outer device body */}
      <div className="relative mx-auto">
        {/* Add soil tester box and connecting wire */}
        <div className="absolute right-[-120px] bottom-20">
          {/* Connecting wire */}
          <div className="absolute left-[-80px] top-1/2 h-[2px] w-[80px] -translate-y-1/2 bg-gradient-to-r from-gray-600 to-gray-700">
          
            {/* Wire glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-sm"></div>
          </div>

          {/* Soil tester box */}
          <div className="relative h-[120px] w-[100px] rounded-xl bg-[#2c3038] p-3 shadow-lg ring-1 ring-[#404246]">
            {/* Sensor area */}
            <div className="mb-2 h-1/2 rounded-lg bg-gray-900 p-2 ring-1 ring-gray-700">
              <div className="h-full w-full rounded-md bg-gray-800">
                <div className="h-full w-full animate-pulse rounded-md bg-blue-500/10"></div>
              </div>
            </div>
            {/* Status indicators */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <div className="h-px flex-1 mx-2 bg-gray-700"></div>
                <div className="text-xs text-gray-400">READY</div>
              </div>
              <div className="flex items-center justify-between">
                {/* <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div> */}
                {/* <div className="h-px flex-1 mx-2 bg-gray-700"></div> */}
                <div className="text-xs text-gray-400">SOIL TESTER </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device frame with dark aluminum finish */}
        <div className="relative mx-auto flex w-[520px] flex-col rounded-[48px] bg-[#2c3038] shadow-2xl ring-1 ring-[#404246]">
          {/* Inner frame */}
          <div className="relative mx-4 my-4 flex flex-col rounded-[40px] bg-[#343841]">
            <div className="relative flex h-[800px] flex-col rounded-[40px] p-6">
              {/* Top speaker and sensors */}
              <div className="absolute left-1/2 top-4 flex -translate-x-1/2 transform items-center space-x-8">
                <div className="flex space-x-4">
                  <div className="h-2 w-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                  <div className="h-2 w-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                </div>
              </div>

              {/* Main screen */}
              <div className="relative mt-8 flex-1 overflow-hidden rounded-3xl bg-gray-950 shadow-inner ring-1 ring-gray-800">
                {/* Status bar */}
                <div className="flex h-8 items-center justify-between bg-black/40 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-400">SYSTEM ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                  </div>
                </div>

                {/* Main content area */}
                <div className="h-[calc(100%-32px)] w-full">{children}</div>

                {/* Screen overlay effect */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent"></div>
              </div>

              {/* Bottom control panel */}
              <div className="mt-6 flex h-24 items-center justify-center rounded-2xl bg-[#2c3038] shadow-inner ring-1 ring-[#404246]">
                <div className="relative w-full max-w-[280px]">
                  {/* Soil testing compartment */}
                  <div className="relative h-16 rounded-xl bg-gray-900 p-3 ring-1 ring-gray-700">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-400">SANJAYA</p>
                      </div>
                    </div>
                    {/* Drawer handle */}
                    <div className="absolute bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 transform rounded-full bg-gray-800"></div>
                    {/* Glow effect */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-blue-500/30 blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting neck and base stand */}
        <div className="relative -mt-2"> {/* Negative margin to connect with device */}
          {/* Connecting neck */}
          <div className="mx-auto w-[80px]">
            <div className="h-8 bg-[#2c3038] rounded-b-lg ring-1 ring-[#404246]"></div>
          </div>
          
          {/* Main stand pillar */}
          <div className="mx-auto h-16 w-[80px] bg-gradient-to-b from-[#2c3038] to-[#343841] ring-1 ring-[#404246]"></div>
          
          {/* Base plate */}
          <div className="relative">
            {/* Top part */}
            <div className="mx-auto h-4 w-[240px] rounded-t-xl bg-[#2c3038] ring-1 ring-[#404246]"></div>
            {/* Bottom plate */}
            <div className="mx-auto h-2 w-[320px] rounded-xl bg-[#343841]">
              {/* Shadow effect */}
              <div className="absolute -bottom-4 left-1/2 h-4 w-[340px] -translate-x-1/2 transform">
                <div className="h-full w-full rounded-full bg-black/40 blur-md"></div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Ground reflection */}
        <div className="absolute -bottom-6 left-1/2 h-12 w-[360px] -translate-x-1/2 transform">
          <div className="h-full w-full rounded-full bg-[#2c3038]/20 blur-2xl"></div>
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 h-8 w-[300px] -translate-x-1/2 transform">
          <div className="h-full w-full rounded-full bg-blue-500/5 blur-xl"></div>
        </div>
      </div>
    </div>
  )
}

