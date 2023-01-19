import Link from "next/link";
import React from "react";

export default class Footers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="text-center text-base text-white">
            &copy; 2023, <Link href='https://www.13xlabs.com/' target='_blank'>13X Labs</Link>. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
}