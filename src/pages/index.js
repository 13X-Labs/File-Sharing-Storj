import React from 'react';
import Head from 'next/head'
import axios from 'axios';
import Navbar from 'components/nav/navbar';
import Footer from 'components/footer/footer';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'next/link';
import QRCode from 'react-qr-code';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlImage: null,
      precentageUpload: 0,
      value: '',
      copied: false,
    };
  }

  componentDidMount = () => {
  }

  // upload image to ipfs (demo server storj-ipfs.com)
  uploadImage = (e) => { 
    let url = 'https://demo.storj-ipfs.com/api/v0/add'
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      let formData = new FormData();
      formData.append("file", file);
      axios.post(url, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary= ${file._boundary}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let precentage = Math.floor((loaded * 100) / total);
          if (precentage <= 100) {
            this.setState({
              precentageUpload: precentage
            })
          }
        }
      }).then((response) => {
        this.setState({
          urlImage: response.data.Hash
        })
      }).catch((error) => {
        console.error(error)
      });
    }
  }


  render() {
    return (
      <>
        <Head>
          <title>File Sharing - Upload File to IPFS | 13X Labs</title>
          <meta name="description" content="File Sharing - Upload File to IPFS by 13XLabs. 13X Labs is a R&D Technology company focusing on blockchain, dApp, Web3, Storage3, etc." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <Navbar />
            {/* Drop File to Attach or Browser */}
            <div className=" h-screen w-screen sm:px-8 md:px-16 sm:py-8 bg-gray-700">
              <div className="container mx-auto max-w-screen-lg h-full">
                <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event);">
                  <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                    <label
                        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                            <ArrowUpTrayIcon className="block h-6 w-6" aria-hidden="true" />
                            <span className="font-medium text-gray-600">
                            Drag and drop your files anywhere or &nbsp;
                            <a className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">Upload a file</a>
                            </span>
                        </span>
                        <input id='file-input' type='file' onChange={this.uploadImage} className="hidden" />
                    </label>
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                      <div className="bg-gray-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: this.state.precentageUpload * 10, maxWidth: "100%"}}> {this.state.precentageUpload}%</div>
                    </div>
                    <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                          Product built 13X Labs
                    </h1> 
                    {this.state.urlImage ?
                    <div className=''>
                      <div className='flex justify-center'>
                      <input className='inline-block px-6 py-2.5 w-full bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
                    value={`https://demo.storj-ipfs.com/ipfs/${this.state.urlImage}`} disabled/>
                      <CopyToClipboard text={`https://demo.storj-ipfs.com/ipfs/${this.state.urlImage}`}
                        onCopy={() => this.setState({copied: true})}>
                        <button className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Copy</button>
                      </CopyToClipboard>
                      <button>  
                        <Link className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' 
                        href={`https://demo.storj-ipfs.com/ipfs/${this.state.urlImage}`} target='_blank'>View</Link>
                      </button>
                      </div>
                      <p className='text-center mt-2'>QR Code Generator</p>
                      <div className='mt-1 flex justify-center'>
                        <QRCode value={`https://demo.storj-ipfs.com/ipfs/${this.state.urlImage}`} size={128} />
                      </div>
                    </div>
                    : null}
                    
                  </section>
                </article>
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </>
    )
  }   
}