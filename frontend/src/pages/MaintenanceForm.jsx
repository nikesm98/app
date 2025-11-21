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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - only vehicle number is required
    if (!formData.vehicleNumber) {
      toast({
        title: "Validation Error",
        description: "Please select a vehicle number",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend API
      const response = await axios.post(`${API}/maintenance/submit`, formData);

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Your data has been submitted successfully.",
          className: "bg-green-50 border-green-200"
        });

        // Reset form after 1.5 seconds
        setTimeout(() => {
          setFormData({
            vehicleNumber: '',
            batteryNumber: '',
            batteryPhoto: null,
            tyres: {},
            tyrePhotos: {},
            vehicleImages: {}
          });
          // Reset file inputs
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-white transition-colors"
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl border-t-4" style={{ borderTopColor: '#007BC1' }}>
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-3xl font-bold" style={{ color: '#204788' }}>
              Vehicle Maintenance Entry Form
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Vehicle Selection */}
              <div className="space-y-3">
                <Label htmlFor="vehicle" className="text-lg font-semibold" style={{ color: '#204788' }}>
                  Vehicle Number <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.vehicleNumber} onValueChange={handleVehicleChange} disabled={isSubmitting}>
                  <SelectTrigger className="w-full h-12 text-base border-2 hover:border-[#007BC1] transition-colors">
                    <SelectValue placeholder="Select vehicle number" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {vehicleNumbers.map((vehicle) => (
                      <SelectItem key={vehicle} value={vehicle} className="text-base">
                        {vehicle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Battery Section */}
              <Card className="border-2" style={{ borderColor: '#007BC1' }}>
                <CardHeader style={{ backgroundColor: '#007BC1' }}>
                  <CardTitle className="text-white text-xl">Battery Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="batteryNumber" className="text-base font-medium" style={{ color: '#204788' }}>
                      Battery Number
                    </Label>
                    <Input
                      id="batteryNumber"
                      value={formData.batteryNumber}
                      onChange={handleBatteryNumberChange}
                      placeholder="Enter battery number"
                      className="mt-2 h-11 border-2 hover:border-[#007BC1] transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="batteryPhoto" className="text-base font-medium" style={{ color: '#204788' }}>
                      Battery Photo
                    </Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        id="batteryPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('batteryPhoto', e.target.files[0])}
                        className="h-11 border-2 hover:border-[#007BC1] transition-colors"
                        disabled={isSubmitting}
                      />
                      {formData.batteryPhoto && (
                        <img src={formData.batteryPhoto} alt="Battery" className="h-20 w-20 object-cover rounded border-2" style={{ borderColor: '#007BC1' }} />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Primer Tyres Section */}
              <Card className="border-2" style={{ borderColor: '#F5A11B' }}>
                <CardHeader style={{ backgroundColor: '#F5A11B' }}>
                  <CardTitle className="text-white text-xl">Primer Tyre Positions</CardTitle>
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
