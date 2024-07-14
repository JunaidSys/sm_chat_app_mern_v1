import Queue, { Job } from 'bull';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import Logger from 'bunyan';
// import { BullAdaper as AdapterBull } from "@bull-board/api"
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { config } from '@root/config';


// type IBaseJobData = IAuthJob | IUserJob | IEmailJob;
type IBaseJobData = any;

let bullAdapters: BullAdapter[] = [];
export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;
  log: Logger;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, `${config.REDIS_HOST}`);
    bullAdapters.push(new BullAdapter(this.queue));
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queue');

    createBullBoard({
      queues: bullAdapters,
      serverAdapter
    });
    this.log = config.createLogger(`${queueName}Queue`);
    this.queue.on('completed', (job: Job) => {
      job.remove;
    });
    this.queue.on('Global:completed', (jobId: string) => {
      this.log.info(`Job ${jobId} completed`);
    });
    this.queue.on('Global:stalled', (jobId: string) => {
      this.log.info(`Job ${jobId} is stalled`);
    });
  }

  protected addJob(name: string, data: any): void {
    this.queue.add(name, data, { attempts: 3, backoff: { type: 'fixed', delay: 5000 } });
  }
  //This code snippet defines a protected method processJob
  //(base.queue.ts: 45: 3 - 47: 4) in the BaseQueue(base.queue.ts: 13 - 49: 2)
  //class that processes a job by calling the process(base.queue.ts: 45: 3 - 47: 4)
  //method on a queue with the provided name, concurrency, and callback function.
  protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
    this.queue.process(name, concurrency, callback);
  }
}
