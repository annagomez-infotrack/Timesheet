import fetch from 'node-fetch';

async function run() {

 
  const query = new URLSearchParams({
    custom_task_ids: 'true',
    team_id: '306973'
  }).toString();

  const teamId = '306973';
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
            name: 'name of tag',
            tag_bg: '#BF55EC',
            tag_fg: '#FFFFFF'
          }
        ],
        start: 1684330120000,
        billable: false,
        duration: 50000,
        assignee: 24627195,
        tid: '860qcfee5'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();