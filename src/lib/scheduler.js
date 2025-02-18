import { scheduleJob } from 'node-schedule';
import { getFile, updateFile } from '../lib/github';

export function startDailyCommitScheduler(accessToken, repos) {
    console.log("Task Implememt")

  scheduleJob('*/10 * * * * *', async () => {
    console.log("Task Implememt")
    for (const repoUrl of repos) {
      try {
        const [owner, repo] = repoUrl.split('/').slice(-2);
        const fileInfo = await getFile(owner, repo, accessToken);

        await updateFile(
          owner,
          repo,
          accessToken,
          fileInfo.content,
          fileInfo.sha
        );

        console.log(`Successfully updated ${repoUrl}`);
      } catch (error) {
        console.error(`Error updating ${repoUrl}:`, error.message);
      }
    }
  });
}
