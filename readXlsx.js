
import xlsx from 'node-xlsx'

// Function to format a date given the number of days since the epoch start
function getDate(daysSinceEpoch) {
  const epochStart = new Date('1899-12-30');
  console.log(epochStart.getTime())
  const date = new Date(epochStart.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
  const returnEpoch = epochStart.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000;
  return date, returnEpoch;
}

async function run() {

 // Parse a file
const workSheetsFromFile = xlsx.parse(`april2023.xlsx`);

const header = [
  'Day',       'Date',
  'Total Hours',        'Leave',
  'Public Holidays',    'Admin',
  'QA Support',         'Leap SSO',
  'Release Management', 'Test security',
  'Test scenarios',     'PDF Test',
  'Artemis',            'IdP',
  'Integrations',       'Maple'
  ]  

 var taskIds = {
  'Leave': "",
  'Public Holidays': "",    
  'Admin': "",
  'QA Support': "",         
  'Leap SSO': "",
  'Release Management':"", 
  'Test security': "",
  'Test scenarios': "",     
  'PDF Test':"",
  'Artemis':"",            
  'IdP':"",
  'Integrations':"",       
  'Maple': ""
 }

  const timeObjects = workSheetsFromFile[0].data
  .map(([Day, Date, TotalHours, Leave, PublicHolidays,Admin, QASupport, LeapSSO, ReleaseManagement,TestSecurity, TestScenarios, PDFTest,Artemis, IdP, Integrations, Maple]) => 
  ({ Day, Date, TotalHours, Leave, PublicHolidays,Admin, QASupport, LeapSSO, ReleaseManagement,TestSecurity, TestScenarios, PDFTest,Artemis, IdP, Integrations, Maple }));


  timeObjects.forEach(dailyTime => {
      // if Weekend
      if(!['Saturday', 'Sunday', 'Total'].includes(dailyTime.Day)){
        Object.entries(dailyTime).forEach(entry=> {
          const [key, value] = entry;
          if(value != undefined && !['Day','Date', 'TotalHours'].includes(key)){
            console.log("Send:"+key+"="+value)
          }
        });
      }
    })
    
    
}
  
//   console.log(getDate(workSheetsFromFile[0].data[1][1]));

// // Usage example
// const daysSinceEpoch = workSheetsFromFile[0].data[1][1]; // Example number of days since the epoch start
// const {formattedDate, dayEpoch} = getDate(daysSinceEpoch);
// console.log(dayEpoch)
// console.log(formattedDate); // Output: 5/18/2023


run();