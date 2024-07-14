import Logger from 'bunyan';
import { DoneCallback, Job } from 'bull';
import { authService } from '@service/db/auth.service';
import { config } from '@root/config';

const log: Logger = config.createLogger('authWorker');
class AuthWorker {
  async addAuthUserToDb(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      console.log(`AuthWorker addAuthUserToDb`);
      console.log(job);
      console.log(job.data);
      console.log('DOne');
      console.log(done);
      await authService.createAuthUser(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      console.log(`Error AuthWorker: addAuthUserToDb: ` + error);
      log.error(error);
      done(error as Error);
    }
  }
}

export const authWorker: AuthWorker = new AuthWorker();
