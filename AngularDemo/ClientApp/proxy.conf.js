const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:64376';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/EmployeeAPI/GetAllEmployees",
      "/api/EmployeeAPI/AddEmployee",
      "/api/EmployeeAPI/GetEmployeebyId",
      "/api/EmployeeAPI/UpdateEmployee",
      "/api/EmployeeAPI/DeleteEmployee"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
