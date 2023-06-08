
import xlsx from 'node-xlsx'
import { createTimeEntry } from './createTimeEntry.js';

// Function to format a date given the number of days since the epoch start
async function getDate(daysSinceEpoch) {
  const epochStart = new Date('1899-12-30');
  const date = new Date(epochStart.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
  const returnEpoch = epochStart.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000;
  return returnEpoch;
}

async function run() {

const apiKey = 'pk_24627195_NZ8FYLF8IVVAK9MJQWYBACHFSU43PSMF' //use your own apiKey
const assigneeId = 24627195 // use your own assigneeId
const teamId = '306973' //306973 is the global teamId
const dateFrom = new Date('2023-05-03')
const dateTo = new Date('2023-06-21')


const workSheetsFromFile = xlsx.parse(`may2023.xlsx`);

 var taskIds = {
  'Leave': "860q9j3k9",
  'PublicHolidays': "860q9j3kx",    
  'Admin': "860q9j3nu",
  'QASupport': "860q9j3nu",         
  'LeapSSO': "860q9j5b5",
  'ReleaseManagement':"860q9kf9t", 
  'TestSecurity': "860q9kfcy",
  'TestScenarios': "860q9kfer",     
  'PDFTest':"860q9kfj5",
  'Artemis':"860q9j3nu",            
  'IdP':"860q9j3nu",
  'Integrations':"860q9j3nu",       
  'Maple': "860q9j3nu"
 }

  const timeObjects = workSheetsFromFile[0].data
  .map(([Day, Date, TotalHours, Leave, PublicHolidays,Admin, QASupport, LeapSSO, ReleaseManagement,TestSecurity, TestScenarios, PDFTest,Artemis, IdP, Integrations, Maple]) => 
  ({ Day, Date, TotalHours, Leave, PublicHolidays,Admin, QASupport, LeapSSO, ReleaseManagement,TestSecurity, TestScenarios, PDFTest,Artemis, IdP, Integrations, Maple }));


  timeObjects.forEach(async function(dailyTime) {
    let dateEpoch = await getDate(dailyTime.Date)
    //console.log(dateEpoch)
    let date = new Date(dateEpoch)
      // if Weekend
    if(!['Saturday', 'Sunday', 'Total'].includes(dailyTime.Day) && dailyTime.Day !== "" && date >= dateFrom && date <= dateTo){
      
      Object.entries(dailyTime).forEach(async function(entry){
        const [key, value] = entry;
        if(value != undefined && !['Day','Date', 'TotalHours'].includes(key)){
          let duration=value*60*60*1000
          console.log(`Send:${key}=${value}`+`| startDateEpoch:${dateEpoch} | taskId:${taskIds[key]} | duration:${duration} | date:${date}`)
          await createTimeEntry(teamId,dateEpoch,duration,assigneeId,taskIds[key],apiKey)
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