import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { getMaintenanceLogs } from '../mock';
import { ArrowLeft, Search, Calendar, Truck, Battery, CircleDot } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const maintenanceLogs = getMaintenanceLogs();
    setLogs(maintenanceLogs);
    setFilteredLogs(maintenanceLogs);
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

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by vehicle number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 hover:border-[#007BC1] transition-colors"
            />
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

        {filteredLogs.length === 0 ? (
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
                      {log.batteryPhoto && (
                        <img
                          src={log.batteryPhoto}
                          alt="Battery"
                          className="w-24 h-24 object-cover rounded-lg border-2"
                          style={{ borderColor: '#007BC1' }}
                        />
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
                  {log.vehicleImages && Object.keys(log.vehicleImages).length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="font-semibold mb-3" style={{ color: '#204788' }}>Vehicle Images</p>
                      <div className="flex gap-3 flex-wrap">
                        {Object.entries(log.vehicleImages).map(([key, url]) => (
                          <img
                            key={key}
                            src={url}
                            alt={key}
                            className="h-20 w-20 object-cover rounded-lg border-2"
                            style={{ borderColor: '#204788' }}
                          />
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
