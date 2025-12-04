import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/utils";

import { toast } from '../hooks/use-toast';
import { vehicleNumbers, tyrePositions, vehicleImageTypes } from '../mock';
import { Upload, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { UserMenu } from '../components/UserMenu';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL;

const MaintenanceForm = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit maintenance logs",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    battery1Number: '',
    battery1Photo: null,
    battery2Number: '',
    battery2Photo: null,
    tyres: {},
    tyrePhotos: {},
    vehicleImages: {}
  });

  const handleVehicleChange = (value) => {
    setFormData({ ...formData, vehicleNumber: value });
    setComboboxOpen(false);
  };

  const handleBattery1NumberChange = (e) => {
    setFormData({ ...formData, battery1Number: e.target.value });
  };

  const handleBattery2NumberChange = (e) => {
    setFormData({ ...formData, battery2Number: e.target.value });
  };

  const handleFileUpload = (field, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, [field]: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleTyreNumberChange = (positionId, value) => {
    setFormData({
      ...formData,
      tyres: { ...formData.tyres, [positionId]: value }
    });
  };

  const handleTyrePhotoUpload = (positionId, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        tyrePhotos: { ...formData.tyrePhotos, [positionId]: reader.result }
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleVehicleImageUpload = (imageType, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        vehicleImages: { ...formData.vehicleImages, [imageType]: reader.result }
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vehicleNumber) {
      toast({
        title: "Validation Error",
        description: "Please select a vehicle number",
        variant: "destructive"
      });
      return;
    }

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Unable to get authentication token. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend API with auth token
      const response = await axios.post(
        `${API}/maintenance/submit`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Your data has been submitted successfully.",
          className: "bg-green-50 border-green-200"
        });

        setTimeout(() => {
          setFormData({
            vehicleNumber: '',
            battery1Number: '',
            battery1Photo: null,
            battery2Number: '',
            battery2Photo: null,
            tyres: {},
            tyrePhotos: {},
            vehicleImages: {}
          });
          document.querySelectorAll('input[type="file"]').forEach(input => {
            input.value = '';
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: error.response?.data?.detail || "Failed to submit maintenance log. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#007BC1' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-white transition-colors"
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <UserMenu />
        </div>

        <Card className="shadow-xl border-t-4" style={{ borderTopColor: '#007BC1' }}>
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-3xl font-bold" style={{ color: '#204788' }}>
              Vehicle Maintenance Entry Form
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* VEHICLE NUMBER - SEARCHABLE COMBOBOX */}
              <div className="space-y-3">
                <Label htmlFor="vehicle" className="text-lg font-semibold" style={{ color: '#204788' }}>
                  Vehicle Number <span className="text-red-500">*</span>
                </Label>

                <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className="w-full h-12 px-4 border-2 rounded-md text-left flex items-center justify-between hover:border-[#007BC1] transition-colors"
                      disabled={isSubmitting}
                      style={{ borderColor: "#E5E7EB" }}  
                    >
                      {formData.vehicleNumber || "Select vehicle number"}
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0 border-2 border-[#007BC1] rounded-md shadow-lg bg-white"
                    align="start"
                  >
                    <Command>
                      <div className="flex items-center px-3 py-2 border-b bg-gray-50">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
                          />
                        </svg> */}

                        <CommandInput
                          placeholder="Search vehicle number..."
                          className=""
                        />
                      </div>

                      <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>No vehicle found.</CommandEmpty>

                        <CommandGroup>
                          {vehicleNumbers.map((vehicle) => (
                            <CommandItem
                              key={vehicle}
                              value={vehicle}
                              onSelect={() => handleVehicleChange(vehicle)}
                              className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100"
                            >
                              {vehicle}

                              {formData.vehicleNumber === vehicle ? (
                                <Check className="ml-auto h-4 w-4 text-[#007BC1]" />
                              ) : null}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

              </div>

              {/* Battery Section */}
              <Card className="border-2" style={{ borderColor: '#007BC1' }}>
                <CardHeader style={{ backgroundColor: '#007BC1' }}>
                  <CardTitle className="text-white text-xl">Battery Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="batteryNumber" className="text-base font-medium" style={{ color: '#204788' }}>
                      Battery Number 1
                    </Label>
                    <Input
                      id="batteryNumber"
                      value={formData.battery1Number}
                      onChange={handleBattery1NumberChange}
                      placeholder="Enter battery number 1"
                      className="mt-2 h-11 border-2 hover:border-[#007BC1] transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="batteryPhoto" className="text-base font-medium" style={{ color: '#204788' }}>
                      Battery Photo 1
                    </Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        id="batteryPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('battery1Photo', e.target.files[0])}
                        className="h-11 border-2 hover:border-[#007BC1] transition-colors"
                        disabled={isSubmitting}
                      />
                      {formData.battery1Photo && (
                        <img src={formData.battery1Photo} alt="Battery" className="h-20 w-20 object-cover rounded border-2" style={{ borderColor: '#007BC1' }} />
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="batteryNumber" className="text-base font-medium" style={{ color: '#204788' }}>
                      Battery Number 2
                    </Label>
                    <Input
                      id="batteryNumber"
                      value={formData.battery2Number}
                      onChange={handleBattery2NumberChange}
                      placeholder="Enter battery number 2"
                      className="mt-2 h-11 border-2 hover:border-[#007BC1] transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="batteryPhoto" className="text-base font-medium" style={{ color: '#204788' }}>
                      Battery Photo 2
                    </Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        id="batteryPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('battery2Photo', e.target.files[0])}
                        className="h-11 border-2 hover:border-[#007BC1] transition-colors"
                        disabled={isSubmitting}
                      />
                      {formData.battery2Photo && (
                        <img src={formData.battery2Photo} alt="Battery" className="h-20 w-20 object-cover rounded border-2" style={{ borderColor: '#007BC1' }} />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Primer Tyres Section */}
              <Card className="border-2" style={{ borderColor: '#F5A11B' }}>
                <CardHeader style={{ backgroundColor: '#F5A11B' }}>
                  <CardTitle className="text-white text-xl">Primer/Horse Tyre Positions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {tyrePositions.primer.map((position) => (
                      <div key={position.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border">
                        <Label className="text-base font-semibold" style={{ color: '#204788' }}>
                          {position.label}
                        </Label>
                        <Input
                          placeholder="Tyre number"
                          value={formData.tyres[position.id] || ''}
                          onChange={(e) => handleTyreNumberChange(position.id, e.target.value)}
                          className="h-10 border-2 hover:border-[#F5A11B] transition-colors"
                          disabled={isSubmitting}
                        />
                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleTyrePhotoUpload(position.id, e.target.files[0])}
                            className="h-10 text-sm border-2 hover:border-[#F5A11B] transition-colors"
                            disabled={isSubmitting}
                          />
                          {formData.tyrePhotos[position.id] && (
                            <img
                              src={formData.tyrePhotos[position.id]}
                              alt={position.label}
                              className="h-16 w-16 object-cover rounded border-2"
                              style={{ borderColor: '#F5A11B' }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trailer Tyres Section */}
              <Card className="border-2" style={{ borderColor: '#E73036' }}>
                <CardHeader style={{ backgroundColor: '#E73036' }}>
                  <CardTitle className="text-white text-xl">Trailer Tyre Positions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {tyrePositions.trailer.map((position) => (
                      <div key={position.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border">
                        <Label className="text-base font-semibold" style={{ color: '#204788' }}>
                          {position.label}
                        </Label>
                        <Input
                          placeholder="Tyre number"
                          value={formData.tyres[position.id] || ''}
                          onChange={(e) => handleTyreNumberChange(position.id, e.target.value)}
                          className="h-10 border-2 hover:border-[#E73036] transition-colors"
                          disabled={isSubmitting}
                        />
                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleTyrePhotoUpload(position.id, e.target.files[0])}
                            className="h-10 text-sm border-2 hover:border-[#E73036] transition-colors"
                            disabled={isSubmitting}
                          />
                          {formData.tyrePhotos[position.id] && (
                            <img
                              src={formData.tyrePhotos[position.id]}
                              alt={position.label}
                              className="h-16 w-16 object-cover rounded border-2"
                              style={{ borderColor: '#E73036' }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Images Section */}
              <Card className="border-2" style={{ borderColor: '#204788' }}>
                <CardHeader style={{ backgroundColor: '#204788' }}>
                  <CardTitle className="text-white text-xl">Vehicle Images</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {vehicleImageTypes.map((imageType) => (
                      <div key={imageType.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border">
                        <Label className="text-base font-semibold flex items-center gap-2" style={{ color: '#204788' }}>
                          <Upload className="h-4 w-4" />
                          {imageType.label}
                        </Label>
                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleVehicleImageUpload(imageType.id, e.target.files[0])}
                            className="h-11 border-2 hover:border-[#204788] transition-colors"
                            disabled={isSubmitting}
                          />
                          {formData.vehicleImages[imageType.id] && (
                            <img
                              src={formData.vehicleImages[imageType.id]}
                              alt={imageType.label}
                              className="h-20 w-20 object-cover rounded border-2"
                              style={{ borderColor: '#204788' }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12 h-14 text-lg font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#007BC1' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Submit Maintenance Log
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceForm;
