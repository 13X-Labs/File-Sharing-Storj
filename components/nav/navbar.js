import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navbar = [
      {
        name: "File Sharing - Upload File to IPFS",
        link: "#",
      },
      {
        name: "13X Labs",
        link: "https://www.13xlabs.com/",
      }
    ];
    return (
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center h-16">
                <div className="flex items-center">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navbar.map((item, id) => (
                        <div key={id}>
                          <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal uppercase">
                            <Link href={`${item.link}`}>{item.name}</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="-mr-2 flex sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                {navbar.map((item, id) => (
                  <div key={id}>
                    <Disclosure.Button
                      as="div"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light uppercase"
                    >
                      <Link href={`${item.link}`}>{item.name}</Link>
                    </Disclosure.Button>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}