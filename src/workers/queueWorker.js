require("dotenv").config();
require("module-alias/register");

const sendVerifyEmailJob = require("@/jobs/sendVerifyEmailJob");
const queueModel = require("@/models/queue.model");

const handlers = {
  sendVerifyEmailJob,
};
async function jobProcess(job) {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await queueModel.update(job.id, { status: "processing" });

      await handler(job);
      await queueModel.update(job.id, { status: "completed" });
    } catch (error) {
      console.log(error);
      const retries_count = job.retries_count || 0;
      const max_retries = job.max_retries ?? 3;

      if (retries_count < max_retries) {
        await queueModel.update(job.id, {
          status: "pending",
          retries_count: retries_count + 1,
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
      }
      await queueModel.update(job.id, { status: "reject" });
    }
  }
}

async function queueWorker() {
  while (true) {
    const jobs = await queueModel.findPendingJobs();
    for (let job of jobs) {
      await jobProcess(job);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
queueWorker();
