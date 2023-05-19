import fetch from 'node-fetch';

export async function createTimeEntry(teamId='306973',startDateEpoch,msDuration,assigneeId=24627195,taskId ) {

 
  const query = new URLSearchParams({
    custom_task_ids: 'true',
    team_id: teamId
  }).toString();

  const resp = await fetch(
    `https://api.clickup.com/api/v2/team/${teamId}/time_entries?${query}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'pk_24627195_NZ8FYLF8IVVAK9MJQWYBACHFSU43PSMF'
      },
      body: JSON.stringify({
        description: 'from api',
        tags: [
          {
            name: 'timesheet_ag',
            tag_bg: '#BF55EC',
            tag_fg: '#FFFFFF'
          }
        ],
        start: startDateEpoch,
        billable: false,
        duration: msDuration,
        assignee: assigneeId,
        tid: taskId
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

//run();