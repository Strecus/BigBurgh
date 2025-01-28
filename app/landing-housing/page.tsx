"use client";

import { Suspense, useState, useEffect } from "react"
import ServiceLanding from "../components/ServiceLanding"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog"


export default function LandingHousing() {
  const [zipCode, setZipCode] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [mapUrl, setMapUrl] = useState("");

  const handleZipCodeSubmit = (e) => {
    e.preventDefault();
    setMapUrl(`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${zipCode}&zoom=12`);
    setIsOpen(false);
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
      script.async = true;
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button className="hidden">Open Zip Code Dialog</button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-lg w-1/4 p-4">
          <AlertDialogTitle className="text-center">Enter Your Zip Code</AlertDialogTitle>
          <form onSubmit={handleZipCodeSubmit} className="flex flex-col items-center space-y-2">
            <label className="flex flex-col items-center">
              Zip Code:
              <input 
                type="text" 
                value={zipCode} 
                onChange={(e) => setZipCode(e.target.value)} 
                required 
                className="mt-1 p-1 w-4/5"
              />
            </label>
            <AlertDialogAction type="submit" className="mt-2 w-4/5">Submit</AlertDialogAction>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      {mapUrl && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="400"
            src={mapUrl}
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ServiceLanding service="Housing" />
      </Suspense>
    </>
  )
}

