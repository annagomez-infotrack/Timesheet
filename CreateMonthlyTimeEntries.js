
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

  const apiKey = ''//use your own apiKey go to: https://app.clickup.com/306973/settings/apps
  const assigneeId = 1 // use your own assigneeId go to: https://clickup.com/api/clickupreference/operation/GetAuthorizedUser/
  const teamId = '306973' //306973 is the global teamId
  const workSheetsFromFile = xlsx.parse(`timesheet.xlsx`); //excel file for timesheet
  const dateFrom = new Date('2023-05-18') //start date for creating timeentry so it won't duplicate timeentries
 const taskIds = {
  'Leave': "860q9j3k9",
  'PublicHolidays': "860q9j3kx",    
  'Admin': "860q9j3nu",
  'Support': "",         
  'Top1': "",
  'Top2':"", 
  'Top3': "",
  'Top4': "",     
  'Top5':"",
  'OtherSupport1':"",            
  'OtherSupport2':"",
  'OtherSupport3':"",       
  'OtherSupport4': ""
 }

  const timeObjects = workSheetsFromFile[0].data
  .map(([Day, Date, TotalHours, Leave, PublicHolidays,Admin, Support, Top1, Top2,Top3, Top4, Top5,OtherSupport1, OtherSupport2, OtherSupport3, OtherSupport4]) => 
  ({ Day, Date, TotalHours, Leave, PublicHolidays,Admin, Support, Top1, Top2,Top3, Top4, Top5,OtherSupport1, OtherSupport2, OtherSupport3, OtherSupport4 }));


  timeObjects.forEach(async function(dailyTime) {

      let dateEpoch = await getDate(dailyTime.Date)
      //console.log(dateEpoch)
      let date = new Date(dateEpoch)
      // if not Weekend and after datefrom
      if(!['Saturday', 'Sunday', 'Total'].includes(dailyTime.Day) && dailyTime.Day !== "" && date >= dateFrom){
       
        Object.entries(dailyTime).forEach(async function(entry){
          const [key, value] = entry;
          if(value != undefined && !['Day','Date', 'TotalHours'].includes(key)){
            let duration=value*60*60*1000
            console.log(`Send:${key}=${value}`+`| startDateEpoch:${dateEpoch} | taskId:${taskIds[key]} | duration:${duration} | date:${date}`)
            //send data uncomment next line when you're ready to send everything
            //await createTimeEntry(teamId,dateEpoch,duration,assigneeId,taskIds[key],apiKey)
          }
        });
      }
    })
    
    
}


run();