import Logger from 'bunyan';
import { DoneCallback, Job } from 'bull';
import { authService } from '@service/db/auth.service';
import { config } from '@root/config';
import { userService } from '@service/db/user.service';

const log: Logger = config.createLogger('authWorker');
class UserWorker {
  public async addUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      console.log('addUserToDb');
      console.log(job.data);
      console.log(value);

      await userService.addUserData(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
  public async updateUserInfo(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      await userService.updateUserInfo(key, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
  public async updateSocialLinks(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      await userService.updateSocialLinks(key, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
  public async updateNotificationSettings(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { key, value } = job.data;
      await userService.updateNotificationSettings(key, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();
