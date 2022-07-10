import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Canvg } from "canvg";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState("");
  const [generated, setGenerated] = useState(null);

  useEffect(() => {
    if (text === "") setGenerated(null);
  }, [text]);

  function handleSubmit(event) {
    event.preventDefault();

    setGenerated(text);
  }

  function handleDownload() {
    const svg = document.querySelector("svg");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const svgString = new XMLSerializer().serializeToString(svg);

    const canvaInit = Canvg.fromString(context, svgString);

    canvaInit.resize(600, 600);
    canvaInit.start();

    const anchor = document.createElement("a");
    anchor.download = "frame.png";
    anchor.href = canvas.toDataURL("img/png");
    anchor.click();
  }

  return (
    <div className="w-screen h-screen bg-slate-200 dark:bg-slate-900 flex flex-col">
      <header className="sticky top-0 py-4 md:py-6 px-0 w-full flex justify-center items-center bg-white dark:bg-slate-700 border-b border-gray-300 dark:border-slate-600">
        <h1 className="text-lg md:text-2xl font-bold leading-7 text-gray-600 dark:text-gray-100">
          QR Code Generator
        </h1>
      </header>

      <div className="h-full flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="w-4/5 md:w-2/4">
          <div className="border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 shadow-sm overflow-hidden">
            <form action="#" className="relative" onSubmit={handleSubmit}>
              <div className="p-8 h-64">
                <textarea
                  rows={6}
                  name="description"
                  id="description"
                  className="block w-full border-0 py-0 resize-none bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-200 text-lg md:text-2xl placeholder:text-lg md:placeholder:text-2xl font-bold placeholder:font-bold outline-none"
                  placeholder="Enter your website, text or whatever you want"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                {text === "" && (
                  <span className="text-gray-400 mt-0 absolute top-24 md:top-16">
                    (Click on Generate to create your QR Code)
                  </span>
                )}
              </div>

              <div className="border-t border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-4 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-3 py-2 disabled:opacity-75 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 enabled:hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  disabled={text === ""}
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-4/5 md:w-1/4 mb-2 md:ml-2 md:mb-0">
          <div className="flex-1 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 shadow-sm overflow-hidden">
            <div className="flex h-64 justify-center items-center flex-col">
              {generated === null ? (
                <Image
                  src="/blank.png"
                  alt="Example QR Code"
                  width={200}
                  height={200}
                  className="opacity-50 pointer-events-none"
                />
              ) : (
                <QRCodeSVG
                  value={generated}
                  size={200}
                  includeMargin={true}
                  id="qr-code"
                />
              )}
            </div>
            <div className="border-t border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-4 flex justify-center">
              <button
                onClick={handleDownload}
                className="w-full md:w-auto inline-flex items-center justify-center px-3 py-2 disabled:opacity-75 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 enabled:hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={generated === null}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
