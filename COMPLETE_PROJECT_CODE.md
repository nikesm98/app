# Vehicle Maintenance Logs - Complete Project Code
## CJ Darcl Logistics Fleet Management System

---

## 📋 Table of Contents

1. [Frontend Code](#frontend-code)
2. [Backend Code](#backend-code)
3. [Google Apps Script](#google-apps-script)
4. [Configuration Files](#configuration-files)
5. [Deployment Instructions](#deployment-instructions)
6. [Setup Guide](#setup-guide)

---

# FRONTEND CODE

## 1. src/App.js

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import MaintenanceForm from './pages/MaintenanceForm';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maintenance" element={<MaintenanceForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
```

---

## 2. src/App.css

```css
/* Vehicle Maintenance Logs - CJ Darcl Logistics */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.App {
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

/* Smooth transitions for interactive elements */
button {
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

button:hover {
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

input {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 193, 0.1);
}
```

---

## 3. src/mock.js

```javascript
// Mock data for Vehicle Maintenance Logs

export const vehicleNumbers = [
  "HR55AZ3114", "HR55AP7119", "HR55AP1908", "HR55AP5443", "HR55AP3537",
  "HR55AP9057", "HR55AP1181", "HR55AP6189", "HR55AP8302", "HR55AP3538",
  "HR55AP2933", "HR55AP9013", "HR55AP4716", "HR55AP6982", "HR55AP1569",
  "HR55AP7671", "HR55AP3523", "HR55AP0407", "HR55AP0740", "HR55AP7396",
  "HR55AP1657", "HR55AR2073", "HR55AR1287", "HR55AR4913", "HR55AR3298",
  "HR55AR2616", "HR55AR1698", "HR55AR4395", "HR55AR4507", "HR55AR2561",
  "HR55AR7377", "NL01AE4999", "NL01AE4997", "NL01AE4995", "NL01AE4993",
  "NL01AE4991", "NL01AE4989", "NL01AE4987", "NL01AE4985", "NL01AE4983",
  "NL01AE4981", "NL01AE4979", "NL01AE4975", "NL01AE4973", "NL01AE4971",
  "NL01AE4969", "NL01AE4967", "NL01AE4965", "NL01AE4963", "NL01AE4961",
  "NL01AE4959", "NL01AE4957", "NL01AE4955", "NL01AE4953", "NL01AE4951",
  "NL01AD6494", "NL01AD4558", "NL01AD4557", "NL01AD4556", "NL01AD4444",
  "NL01AD4443", "NL01AD4442", "NL01AD4441", "NL01AD4440", "NL01AE4977"
];

export const tyrePositions = {
  primer: [
    { id: "front_right", label: "Front Right" },
    { id: "front_left", label: "Front Left" },
    { id: "rear_left_inner", label: "Rear Left Inner" },
    { id: "rear_left_outer", label: "Rear Left Outer" },
    { id: "rear_right_inner", label: "Rear Right Inner" },
    { id: "rear_right_outer", label: "Rear Right Outer" }
  ],
  trailer: [
    { id: "trolly_front_single_left", label: "Trolly Front Single Left" },
    { id: "trolly_front_single_right", label: "Trolly Front Single Right" },
    { id: "trolly_rear_single_left", label: "Trolly Rear Single Left" },
    { id: "trolly_rear_single_right", label: "Trolly Rear Single Right" },
    { id: "trolly_front_out_right", label: "Trolly Front Out Right" },
    { id: "trolly_front_in_right", label: "Trolly Front In Right" },
    { id: "trolly_front_out_left", label: "Trolly Front Out Left" },
    { id: "trolly_front_in_left", label: "Trolly Front In Left" },
    { id: "trolly_rear_in_left", label: "Trolly Rear In Left" },
    { id: "trolly_rear_out_left", label: "Trolly Rear Out Left" },
    { id: "trolly_rear_out_right", label: "Trolly Rear Out Right" },
    { id: "trolly_rear_in_right", label: "Trolly Rear In Right" }
  ]
};

export const vehicleImageTypes = [
  { id: "front", label: "Front View" },
  { id: "left", label: "Left View" },
  { id: "right", label: "Right View" },
  { id: "rear", label: "Rear View" }
];
```

---

## 4. src/pages/Home.jsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileText, BarChart3, Truck, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Maintenance Logs',
      description: 'Record vehicle maintenance details including battery and tyre information',
      action: () => navigate('/maintenance'),
      buttonText: 'New Entry',
      color: '#007BC1'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'View Dashboard',
      description: 'Access and review all submitted maintenance records',
      action: () => navigate('/dashboard'),
      buttonText: 'View Records',
      color: '#F5A11B'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://customer-assets.emergentagent.com/job_3357bef3-2434-491f-a162-2f75dd5df70d/artifacts/qta62q9l_Logo_PNG.png"
                alt="CJ Darcl Logistics"
                className="h-16 w-auto"
              />
            </div>
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6" style={{ color: '#747375' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full" style={{ backgroundColor: '#007BC1' }}>
              <Truck className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: '#204788' }}>
            Vehicle Maintenance Logs
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#747375' }}>
            Comprehensive maintenance tracking system for CJ Darcl Logistics fleet management
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 hover:scale-105"
              style={{ borderTopColor: feature.color }}
            >
              <CardContent className="p-8 space-y-6">
                <div
                  className="inline-flex p-4 rounded-xl"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <div style={{ color: feature.color }}>{feature.icon}</div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold" style={{ color: '#204788' }}>
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#747375' }}>
                    {feature.description}
                  </p>
                </div>
                <Button
                  onClick={feature.action}
                  size="lg"
                  className="w-full h-12 text-base font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-lg border-l-4" style={{ borderLeftColor: '#007BC1' }}>
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold" style={{ color: '#007BC1' }}>65+</p>
              <p className="text-sm font-medium mt-2" style={{ color: '#747375' }}>Fleet Vehicles</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-l-4" style={{ borderLeftColor: '#F5A11B' }}>
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold" style={{ color: '#F5A11B' }}>100%</p>
              <p className="text-sm font-medium mt-2" style={{ color: '#747375' }}>Digital Tracking</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-l-4" style={{ borderLeftColor: '#E73036' }}>
            <CardContent className="p-6 text-center">
              <p className="text-4xl font-bold" style={{ color: '#E73036' }}>24/7</p>
              <p className="text-sm font-medium mt-2" style={{ color: '#747375' }}>Monitoring</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="font-medium" style={{ color: '#204788' }}>
            © 2025 CJ Darcl Logistics. All rights reserved.
          </p>
          <p className="text-sm mt-2" style={{ color: '#747375' }}>
            Powered by Advanced Fleet Management System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
```

---

## 5. src/pages/MaintenanceForm.jsx

```jsx
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
```

---

## 6. src/pages/Dashboard.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Search, Calendar, Truck, Battery, CircleDot, Loader2, RefreshCw } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API}/maintenance/logs`);
      if (response.data.success) {
        setLogs(response.data.logs);
        setFilteredLogs(response.data.logs);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err.response?.data?.detail || 'Failed to load maintenance logs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = logs.filter(log =>
        log.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(logs);
    }
  }, [searchTerm, logs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-white transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="flex gap-3 items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by vehicle number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-2 hover:border-[#007BC1] transition-colors"
              />
            </div>
            <Button
              onClick={fetchLogs}
              variant="outline"
              className="h-12 px-4 border-2 hover:border-[#007BC1] transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <Card className="shadow-xl border-t-4 mb-8" style={{ borderTopColor: '#007BC1' }}>
          <CardHeader className="bg-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold" style={{ color: '#204788' }}>
                Maintenance Records Dashboard
              </CardTitle>
              <Badge className="text-lg px-4 py-2" style={{ backgroundColor: '#007BC1' }}>
                {filteredLogs.length} Records
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {isLoading ? (
          <Card className="shadow-lg">
            <CardContent className="py-16 text-center">
              <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin" style={{ color: '#007BC1' }} />
              <p className="text-xl" style={{ color: '#204788' }}>Loading maintenance logs...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="shadow-lg border-l-4" style={{ borderLeftColor: '#E73036' }}>
            <CardContent className="py-16 text-center">
              <p className="text-xl mb-4" style={{ color: '#E73036' }}>Error: {error}</p>
              <Button onClick={fetchLogs} style={{ backgroundColor: '#007BC1' }} className="text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : filteredLogs.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-16 text-center">
              <Truck className="h-20 w-20 mx-auto mb-4" style={{ color: '#747375' }} />
              <p className="text-xl" style={{ color: '#204788' }}>
                {searchTerm ? 'No records found for this vehicle' : 'No maintenance logs yet'}
              </p>
              <p className="text-gray-500 mt-2">Start by submitting a maintenance entry</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="shadow-lg hover:shadow-xl transition-shadow border-l-4" style={{ borderLeftColor: '#007BC1' }}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Vehicle Info */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Truck className="h-6 w-6 mt-1" style={{ color: '#007BC1' }} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Vehicle Number</p>
                          <p className="text-2xl font-bold" style={{ color: '#204788' }}>
                            {log.vehicleNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 mt-1" style={{ color: '#F5A11B' }} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Submitted On</p>
                          <p className="text-base font-semibold" style={{ color: '#204788' }}>
                            {formatDate(log.submittedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Battery Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Battery className="h-5 w-5" style={{ color: '#007BC1' }} />
                        <p className="font-semibold text-lg" style={{ color: '#204788' }}>Battery</p>
                      </div>
                      {log.batteryNumber && (
                        <div className="bg-slate-50 p-3 rounded-lg border">
                          <p className="text-sm text-gray-500">Battery Number</p>
                          <p className="font-medium" style={{ color: '#204788' }}>{log.batteryNumber}</p>
                        </div>
                      )}
                      {log.batteryPhotoUrl && (
                        <a href={log.batteryPhotoUrl} target="_blank" rel="noopener noreferrer">
                          <img
                            src={log.batteryPhotoUrl}
                            alt="Battery"
                            className="w-24 h-24 object-cover rounded-lg border-2 hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ borderColor: '#007BC1' }}
                          />
                        </a>
                      )}
                    </div>

                    {/* Tyre Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <CircleDot className="h-5 w-5" style={{ color: '#E73036' }} />
                        <p className="font-semibold text-lg" style={{ color: '#204788' }}>Tyres</p>
                      </div>
                      {log.tyres && Object.keys(log.tyres).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(log.tyres).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="bg-slate-50 p-2 rounded border text-sm">
                              <p className="text-gray-500 text-xs capitalize">
                                {key.replace(/_/g, ' ')}
                              </p>
                              <p className="font-medium" style={{ color: '#204788' }}>{value}</p>
                            </div>
                          ))}
                          {Object.keys(log.tyres).length > 4 && (
                            <Badge variant="secondary" className="w-full justify-center">
                              +{Object.keys(log.tyres).length - 4} more tyres
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">No tyre data</p>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Images Preview */}
                  {log.vehicleImageUrls && Object.keys(log.vehicleImageUrls).length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="font-semibold mb-3" style={{ color: '#204788' }}>Vehicle Images</p>
                      <div className="flex gap-3 flex-wrap">
                        {Object.entries(log.vehicleImageUrls).map(([key, url]) => (
                          <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                            <img
                              src={url}
                              alt={key}
                              className="h-20 w-20 object-cover rounded-lg border-2 hover:opacity-80 transition-opacity cursor-pointer"
                              style={{ borderColor: '#204788' }}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
```

---

# BACKEND CODE

## 7. backend/server.py

```python
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import sys

# Add backend directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from routes.maintenance import router as maintenance_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Vehicle Maintenance Logs API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Vehicle Maintenance Logs API - CJ Darcl Logistics"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include maintenance routes
api_router.include_router(maintenance_router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
```

---

## 8. backend/models/maintenance.py

```python
from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime

class MaintenanceSubmission(BaseModel):
    vehicleNumber: str = Field(..., min_length=1, description="Vehicle registration number")
    batteryNumber: Optional[str] = None
    batteryPhoto: Optional[str] = None
    tyres: Optional[Dict[str, str]] = Field(default_factory=dict)
    tyrePhotos: Optional[Dict[str, str]] = Field(default_factory=dict)
    vehicleImages: Optional[Dict[str, str]] = Field(default_factory=dict)

class MaintenanceResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict] = None
    error: Optional[str] = None

class MaintenanceLog(BaseModel):
    id: str
    vehicleNumber: str
    batteryNumber: Optional[str] = None
    batteryPhotoUrl: Optional[str] = None
    tyres: Optional[Dict[str, str]] = Field(default_factory=dict)
    tyrePhotoUrls: Optional[Dict[str, str]] = Field(default_factory=dict)
    vehicleImageUrls: Optional[Dict[str, str]] = Field(default_factory=dict)
    submittedAt: str

class MaintenanceLogsResponse(BaseModel):
    success: bool
    count: int
    logs: List[MaintenanceLog]
```

---

## 9. backend/routes/maintenance.py

```python
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests
import os
import logging
from datetime import datetime
import json

from models.maintenance import (
    MaintenanceSubmission,
    MaintenanceResponse,
    MaintenanceLog,
    MaintenanceLogsResponse
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/maintenance", tags=["maintenance"])

# Google Apps Script URL will be configured via environment variable
GOOGLE_APPS_SCRIPT_URL = os.environ.get('GOOGLE_APPS_SCRIPT_URL', '')

@router.post("/submit", response_model=MaintenanceResponse)
async def submit_maintenance_log(submission: MaintenanceSubmission):
    """
    Submit a new maintenance log entry.
    Forwards data to Google Apps Script which handles Drive upload and Sheet storage.
    """
    try:
        # Validate vehicle number is provided
        if not submission.vehicleNumber:
            raise HTTPException(status_code=400, detail="Vehicle number is required")
        
        # Prepare data for Google Apps Script
        payload = {
            "action": "submit",
            "vehicleNumber": submission.vehicleNumber,
            "batteryNumber": submission.batteryNumber or "",
            "batteryPhoto": submission.batteryPhoto or "",
            "tyres": json.dumps(submission.tyres or {}),
            "tyrePhotos": json.dumps(submission.tyrePhotos or {}),
            "vehicleImages": json.dumps(submission.vehicleImages or {}),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Check if Google Apps Script URL is configured
        if not GOOGLE_APPS_SCRIPT_URL:
            logger.warning("Google Apps Script URL not configured, using mock response")
            return MaintenanceResponse(
                success=True,
                message="Maintenance log submitted successfully (mock mode - configure GOOGLE_APPS_SCRIPT_URL)",
                data={
                    "id": str(datetime.now().timestamp()),
                    "vehicleNumber": submission.vehicleNumber,
                    "submittedAt": payload["timestamp"]
                }
            )
        
        # Forward to Google Apps Script
        response = requests.post(
            GOOGLE_APPS_SCRIPT_URL,
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return MaintenanceResponse(
                success=True,
                message="Maintenance log submitted successfully",
                data=result
            )
        else:
            logger.error(f"Google Apps Script error: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to save to Google Sheets: {response.text}"
            )
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to Google Sheets: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )

@router.get("/logs", response_model=MaintenanceLogsResponse)
async def get_maintenance_logs(vehicle_number: Optional[str] = Query(None, description="Filter by vehicle number")):
    """
    Retrieve all maintenance logs from Google Sheets.
    Optionally filter by vehicle number.
    """
    try:
        # Check if Google Apps Script URL is configured
        if not GOOGLE_APPS_SCRIPT_URL:
            logger.warning("Google Apps Script URL not configured, returning empty logs")
            return MaintenanceLogsResponse(
                success=True,
                count=0,
                logs=[]
            )
        
        # Prepare query parameters
        params = {"action": "get_logs"}
        if vehicle_number:
            params["vehicle_number"] = vehicle_number
        
        # Request logs from Google Apps Script
        response = requests.get(
            GOOGLE_APPS_SCRIPT_URL,
            params=params,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            logs = [MaintenanceLog(**log) for log in result.get("logs", [])]
            return MaintenanceLogsResponse(
                success=True,
                count=len(logs),
                logs=logs
            )
        else:
            logger.error(f"Google Apps Script error: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to retrieve logs from Google Sheets: {response.text}"
            )
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to Google Sheets: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )
```

---

# GOOGLE APPS SCRIPT

## 10. Google Apps Script Code (Code.gs)

```javascript
/**
 * Vehicle Maintenance Logs - Google Apps Script
 * 
 * This script handles:
 * 1. Receiving maintenance data from the backend API
 * 2. Uploading images to Google Drive
 * 3. Saving data to Google Sheets with Drive links
 * 4. Retrieving logs for the dashboard
 */

// Configuration
const SHEET_NAME = "Maintenance Logs";
const DRIVE_FOLDER_NAME = "Vehicle Maintenance Images";

/**
 * Initialize Google Sheet and Drive folder
 * Run this function ONCE after creating the script
 */
function setup() {
  try {
    // Create or get spreadsheet
    let sheet = getOrCreateSheet();
    
    // Create headers if sheet is new
    if (sheet.getLastRow() === 0) {
      const headers = [
        "ID",
        "Timestamp",
        "Vehicle Number",
        "Battery Number",
        "Battery Photo URL",
        "Tyres Data (JSON)",
        "Tyre Photos URLs (JSON)",
        "Vehicle Images URLs (JSON)"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Create Drive folder
    const folder = getOrCreateDriveFolder();
    
    Logger.log("✓ Setup complete!");
    Logger.log("✓ Sheet created: " + sheet.getParent().getUrl());
    Logger.log("✓ Drive folder created: " + folder.getUrl());
    
    return {
      success: true,
      sheetUrl: sheet.getParent().getUrl(),
      folderUrl: folder.getUrl()
    };
  } catch (error) {
    Logger.log("✗ Setup error: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Handle POST requests from backend
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === "submit") {
      return submitMaintenanceLog(data);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Invalid action" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("doPost error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (retrieve logs)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === "get_logs") {
      const vehicleNumber = e.parameter.vehicle_number || null;
      return getMaintenanceLogs(vehicleNumber);
    }
    
    // Default: return API info
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Vehicle Maintenance Logs API - CJ Darcl Logistics",
        endpoints: {
          submit: "POST with action=submit",
          get_logs: "GET with action=get_logs"
        }
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("doGet error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Submit maintenance log entry
 */
function submitMaintenanceLog(data) {
  try {
    const sheet = getOrCreateSheet();
    const folder = getOrCreateDriveFolder();
    const timestamp = new Date().toISOString();
    const rowId = sheet.getLastRow();
    
    // Upload battery photo if provided
    let batteryPhotoUrl = "";
    if (data.batteryPhoto && data.batteryPhoto.startsWith("data:image")) {
      batteryPhotoUrl = uploadBase64ToDrive(
        data.batteryPhoto,
        `battery_${data.vehicleNumber}_${Date.now()}`,
        folder
      );
    }
    
    // Upload tyre photos
    const tyrePhotosData = JSON.parse(data.tyrePhotos || "{}");
    const tyrePhotoUrls = {};
    for (const [position, base64] of Object.entries(tyrePhotosData)) {
      if (base64 && base64.startsWith("data:image")) {
        tyrePhotoUrls[position] = uploadBase64ToDrive(
          base64,
          `tyre_${position}_${data.vehicleNumber}_${Date.now()}`,
          folder
        );
      }
    }
    
    // Upload vehicle images
    const vehicleImagesData = JSON.parse(data.vehicleImages || "{}");
    const vehicleImageUrls = {};
    for (const [view, base64] of Object.entries(vehicleImagesData)) {
      if (base64 && base64.startsWith("data:image")) {
        vehicleImageUrls[view] = uploadBase64ToDrive(
          base64,
          `vehicle_${view}_${data.vehicleNumber}_${Date.now()}`,
          folder
        );
      }
    }
    
    // Append row to sheet
    const row = [
      rowId,
      timestamp,
      data.vehicleNumber,
      data.batteryNumber || "",
      batteryPhotoUrl,
      data.tyres || "{}",
      JSON.stringify(tyrePhotoUrls),
      JSON.stringify(vehicleImageUrls)
    ];
    
    sheet.appendRow(row);
    
    const result = {
      success: true,
      message: "Maintenance log saved successfully",
      data: {
        id: rowId.toString(),
        vehicleNumber: data.vehicleNumber,
        submittedAt: timestamp
      }
    };
    
    return ContentService.createTextOutput(
      JSON.stringify(result)
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("submitMaintenanceLog error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Retrieve maintenance logs
 */
function getMaintenanceLogs(vehicleNumber) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, count: 0, logs: [] })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const logs = [];
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Filter by vehicle number if provided
      if (vehicleNumber && row[2] !== vehicleNumber) {
        continue;
      }
      
      const log = {
        id: row[0].toString(),
        vehicleNumber: row[2],
        batteryNumber: row[3] || null,
        batteryPhotoUrl: row[4] || null,
        tyres: JSON.parse(row[5] || "{}"),
        tyrePhotoUrls: JSON.parse(row[6] || "{}"),
        vehicleImageUrls: JSON.parse(row[7] || "{}"),
        submittedAt: row[1]
      };
      
      logs.push(log);
    }
    
    // Sort by timestamp descending (newest first)
    logs.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        count: logs.length, 
        logs: logs 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("getMaintenanceLogs error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Upload base64 image to Google Drive
 */
function uploadBase64ToDrive(base64Data, fileName, folder) {
  try {
    // Extract mime type and data
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid base64 format");
    }
    
    const mimeType = matches[1];
    const base64 = matches[2];
    
    // Convert base64 to blob
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64),
      mimeType,
      fileName
    );
    
    // Upload to Drive
    const file = folder.createFile(blob);
    
    // Make file accessible to anyone with link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return shareable link
    return file.getUrl();
    
  } catch (error) {
    Logger.log("uploadBase64ToDrive error: " + error.toString());
    return "";
  }
}

/**
 * Get or create Google Sheet
 */
function getOrCreateSheet() {
  const spreadsheets = DriveApp.getFilesByName(SHEET_NAME);
  
  if (spreadsheets.hasNext()) {
    const spreadsheet = SpreadsheetApp.open(spreadsheets.next());
    return spreadsheet.getSheets()[0];
  }
  
  // Create new spreadsheet
  const spreadsheet = SpreadsheetApp.create(SHEET_NAME);
  return spreadsheet.getSheets()[0];
}

/**
 * Get or create Drive folder
 */
function getOrCreateDriveFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  
  if (folders.hasNext()) {
    return folders.next();
  }
  
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}
```

---

# CONFIGURATION FILES

## 11. Frontend package.json (Dependencies)

```json
{
  "dependencies": {
    "axios": "^1.8.4",
    "lucide-react": "^0.507.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.5.1"
  }
}
```

## 12. Backend requirements.txt (Dependencies)

```
fastapi==0.110.1
uvicorn==0.25.0
requests>=2.31.0
python-dotenv>=1.0.1
motor==3.3.1
pydantic>=2.6.4
```

## 13. Backend .env Configuration

```bash
# Add this line to your backend/.env file:
GOOGLE_APPS_SCRIPT_URL=YOUR_WEB_APP_URL_HERE

# Example:
# GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbz.../exec
```

---

# DEPLOYMENT INSTRUCTIONS

## Step 1: Deploy Google Apps Script

1. Go to: **https://script.google.com**
2. Click **"New Project"**
3. Copy the Google Apps Script code (Section 10 above)
4. Paste into the script editor
5. Save project as **"Vehicle Maintenance Logs"**
6. Select `setup` function from dropdown and click Run
7. Grant permissions when prompted
8. Deploy as Web App:
   - Click **Deploy** > **New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
9. **Copy the Web App URL**

## Step 2: Configure Backend

Add the Web App URL to `/app/backend/.env`:

```bash
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 3: Restart Backend

```bash
sudo supervisorctl restart backend
```

## Step 4: Test the Application

1. Open: http://localhost:3000
2. Fill out a maintenance form
3. Submit the form
4. Check dashboard for the new entry
5. Verify data in Google Sheets
6. Verify images in Google Drive

---

# SETUP GUIDE

## Frontend Setup

```bash
cd /app/frontend
yarn install
yarn start
```

## Backend Setup

```bash
cd /app/backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

---

# NOTES

- **CJ Darcl Logo URL**: https://customer-assets.emergentagent.com/job_3357bef3-2434-491f-a162-2f75dd5df70d/artifacts/qta62q9l_Logo_PNG.png
- **Color Theme**: #007BC1 (Blue), #204788 (Navy), #747375 (Grey), #F5A11B (Yellow), #E73036 (Red)
- **Image Size Limit**: 5MB per image
- **All 65 Vehicle Numbers**: Included in mock.js
- **18 Tyre Positions**: 6 Primer + 12 Trailer
- **4 Vehicle Views**: Front, Left, Right, Rear

---

**END OF COMPLETE PROJECT CODE**

Built with ❤️ for CJ Darcl Logistics Fleet Management
