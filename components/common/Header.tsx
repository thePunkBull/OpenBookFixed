import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import WalletButton from "./WalletButton";
import { Bars3Icon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import SettingsPanel from "./SettingsPanel";
import { useSerum } from "../../context";
import { DEX_PROGRAMS } from "../../utils/constants";
import { prettifyPubkey } from "../../utils/pubkey";

const Header: FC = () => {
  const { programID } = useSerum();


  return (
    <Popover className="relative z-50">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:space-x-6 space-x-2 bg-slate-800 border-b border-slate-700">
        <div className="flex justify-start items-center space-x-8">
          <div className="space-x-4 hidden md:flex items-center">
          </div>
        </div>
        <div className="md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-1 md:p-2 text-slate-200 hover:bg-slate-800 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden items-center justify-end md:flex space-x-4">
          <Popover className="relative">
            {({ open }) => (
              <>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-transparent bg-clip-text serum-gradient">
                      Program ID
                    </p>
                    <p className="text-sm text-slate-200">
                      {DEX_PROGRAMS[programID.toString()]
                        ? DEX_PROGRAMS[programID.toString()]
                        : `${prettifyPubkey(programID)}`}
                    </p>
                  </div>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-slate-700 hover:bg-slate-600 px-3 py-2 text-sm focus-style transition-colors`}
                  >
                    <Cog6ToothIcon
                      className={`${open ? "" : "text-opacity-70"}
                  h-5 w-5 text-slate-200 group-hover:text-slate-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
                <Popover.Panel className="bg-slate-800 rounded-md shadow-md border border-slate-700 p-3 absolute right-0 z-10 mt-2 w-96 transform ">
                  {({ close }) => <SettingsPanel close={close} />}
                </Popover.Panel>
              </>
            )}
          </Popover>
          <WalletButton />
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute w-full top-full origin-top transform transition md:hidden mt-2"
        >
          {({ close }) => (
            <div className="rounded-lg bg-slate-800 border border-slate-700 px-2 py-4 shadow-2xl mx-2">
              <SettingsPanel close={close} />
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;