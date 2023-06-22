import fetch from 'node-fetch';

// using this api: https://clickup.com/api/clickupreference/operation/Createatimeentry/

export async function createTimeEntry(teamId='306973',startDateEpoch,msDuration,assigneeId=24627195,taskId, apikey ) {

  const tag = new Date().toISOString();
  console.log(tag);
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
        Authorization: apikey
      },
      body: JSON.stringify({
        description: 'from api',
        tags: [
          {
            name: `timesheet_${tag}`,
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