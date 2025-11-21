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

// Mock maintenance logs for dashboard
export const mockMaintenanceLogs = [
  {
    id: "1",
    vehicleNumber: "HR55AZ3114",
    batteryNumber: "BAT-2024-001",
    batteryPhoto: "https://via.placeholder.com/100",
    submittedAt: "2025-01-15T10:30:00",
    tyres: {
      front_right: "TYR-FR-001",
      front_left: "TYR-FL-001",
      rear_left_inner: "TYR-RLI-001",
      rear_left_outer: "TYR-RLO-001"
    }
  },
  {
    id: "2",
    vehicleNumber: "NL01AE4999",
    batteryNumber: "BAT-2024-002",
    batteryPhoto: "https://via.placeholder.com/100",
    submittedAt: "2025-01-14T14:20:00",
    tyres: {
      front_right: "TYR-FR-002",
      front_left: "TYR-FL-002"
    }
  },
  {
    id: "3",
    vehicleNumber: "HR55AP7119",
    batteryNumber: "BAT-2024-003",
    batteryPhoto: "https://via.placeholder.com/100",
    submittedAt: "2025-01-13T09:15:00",
    tyres: {
      trolly_front_single_left: "TYR-TFSL-001",
      trolly_front_single_right: "TYR-TFSR-001"
    }
  }
];

// Local storage helper functions
export const saveMaintenanceLog = (log) => {
  const logs = getMaintenanceLogs();
  const newLog = {
    ...log,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString()
  };
  logs.unshift(newLog);
  localStorage.setItem('maintenanceLogs', JSON.stringify(logs));
  return newLog;
};

export const getMaintenanceLogs = () => {
  const stored = localStorage.getItem('maintenanceLogs');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with mock data
  localStorage.setItem('maintenanceLogs', JSON.stringify(mockMaintenanceLogs));
  return mockMaintenanceLogs;
};
