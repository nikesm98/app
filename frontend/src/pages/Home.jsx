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
