import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from '../hooks/use-toast';
import { vehicleNumbers, tyrePositions, vehicleImageTypes } from '../mock';
import { Upload, Save, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';

// ⭐ Apps Script deployed URL
const API = process.env.REACT_APP_BACKEND_URL;

const MaintenanceForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    vehicleNumber: '',
    batteryNumber: '',
    batteryPhoto: null,
    tyres: {},
    tyrePhotos: {},
    vehicleImages: {}
  });

  /* ---------------- HANDLERS ---------------- */

  const handleVehicleChange = (value) => {
    setFormData({ ...formData, vehicleNumber: value });
  };

  const handleBatteryNumberChange = (e) => {
    setFormData({ ...formData, batteryNumber: e.target.value });
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

  /* ---------------- SUBMIT ---------------- */

  // --- only the submit part changes ---
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.vehicleNumber) {
    toast({
      title: "Validation Error",
      description: "Please select a vehicle number",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const payload = { action: "submit", ...formData };

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      toast({
        title: "Success",
        description: "Maintenance log submitted",
      });

      setFormData({
        vehicleNumber: "",
        batteryNumber: "",
        batteryPhoto: null,
        tyres: {},
        tyrePhotos: {},
        vehicleImages: {},
      });

      document.querySelectorAll("input[type=file]").forEach((i) => (i.value = ""));
    } else {
      toast({
        title: "Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
  }

  setIsSubmitting(false);
};


  /* ---------------- JSX ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-white transition-colors"
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="shadow-xl border-t-4" style={{ borderTopColor: '#007BC1' }}>
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-3xl font-bold" style={{ color: '#204788' }}>
              Vehicle Maintenance Entry Form
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* VEHICLE SELECT */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold" style={{ color: '#204788' }}>
                  Vehicle Number <span className="text-red-500">*</span>
                </Label>

                <Select value={formData.vehicleNumber} onValueChange={handleVehicleChange} disabled={isSubmitting}>
                  <SelectTrigger className="w-full h-12 border-2 hover:border-[#007BC1]">
                    <SelectValue placeholder="Select vehicle number" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleNumbers.map(vehicle => (
                      <SelectItem key={vehicle} value={vehicle}>{vehicle}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* BATTERY CARD */}
              <Card className="border-2" style={{ borderColor: '#007BC1' }}>
                <CardHeader style={{ backgroundColor: '#007BC1' }}>
                  <CardTitle className="text-white text-xl">Battery Information</CardTitle>
                </CardHeader>

                <CardContent className="pt-6 space-y-4">

                  <div>
                    <Label style={{ color: '#204788' }}>Battery Number</Label>
                    <Input
                      value={formData.batteryNumber}
                      onChange={handleBatteryNumberChange}
                      className="mt-2 h-12 border-2 hover:border-[#007BC1]"
                      placeholder="Enter battery number"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label style={{ color: '#204788' }}>Battery Photo</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('batteryPhoto', e.target.files[0])}
                        className="h-12 border-2"
                        disabled={isSubmitting}
                      />
                      {formData.batteryPhoto && (
                        <img src={formData.batteryPhoto} className="h-20 w-20 rounded border-2" style={{ borderColor: '#007BC1' }} alt="Battery" />
                      )}
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* TYRE SECTIONS */}
              <Card className="border-2" style={{ borderColor: '#F5A11B' }}>
                <CardHeader style={{ backgroundColor: '#F5A11B' }}>
                  <CardTitle className="text-white">Primer Tyre Positions</CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {tyrePositions.primer.map(pos => (
                      <div key={pos.id} className="p-4 bg-slate-50 rounded-lg border space-y-3">

                        <Label style={{ color: '#204788' }}>{pos.label}</Label>

                        <Input
                          placeholder="Tyre number"
                          value={formData.tyres[pos.id] || ''}
                          onChange={(e) => handleTyreNumberChange(pos.id, e.target.value)}
                          className="h-10 border-2 hover:border-[#F5A11B]"
                          disabled={isSubmitting}
                        />

                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleTyrePhotoUpload(pos.id, e.target.files[0])}
                            className="h-10 border-2"
                            disabled={isSubmitting}
                          />

                          {formData.tyrePhotos[pos.id] && (
                            <img
                              src={formData.tyrePhotos[pos.id]}
                              alt={pos.label}
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

              {/* TRAILER TYRES */}
              <Card className="border-2" style={{ borderColor: '#E73036' }}>
                <CardHeader style={{ backgroundColor: '#E73036' }}>
                  <CardTitle className="text-white">Trailer Tyre Positions</CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {tyrePositions.trailer.map(pos => (
                      <div key={pos.id} className="p-4 bg-slate-50 rounded-lg border space-y-3">

                        <Label style={{ color: '#204788' }}>{pos.label}</Label>

                        <Input
                          placeholder="Tyre number"
                          value={formData.tyres[pos.id] || ''}
                          onChange={(e) => handleTyreNumberChange(pos.id, e.target.value)}
                          className="h-10 border-2 hover:border-[#E73036]"
                          disabled={isSubmitting}
                        />

                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleTyrePhotoUpload(pos.id, e.target.files[0])}
                            className="h-10 border-2"
                            disabled={isSubmitting}
                          />

                          {formData.tyrePhotos[pos.id] && (
                            <img
                              src={formData.tyrePhotos[pos.id]}
                              alt={pos.label}
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

              {/* VEHICLE IMAGES */}
              <Card className="border-2" style={{ borderColor: '#204788' }}>
                <CardHeader style={{ backgroundColor: '#204788' }}>
                  <CardTitle className="text-white">Vehicle Images</CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {vehicleImageTypes.map(type => (
                      <div key={type.id} className="p-4 bg-slate-50 rounded-lg border space-y-3">

                        <Label className="flex items-center gap-2" style={{ color: '#204788' }}>
                          <Upload className="h-4 w-4" />
                          {type.label}
                        </Label>

                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleVehicleImageUpload(type.id, e.target.files[0])}
                            className="h-11 border-2"
                            disabled={isSubmitting}
                          />

                          {formData.vehicleImages[type.id] && (
                            <img
                              src={formData.vehicleImages[type.id]}
                              alt={type.label}
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

              {/* SUBMIT BUTTON */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12 h-14 text-lg font-semibold text-white"
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
