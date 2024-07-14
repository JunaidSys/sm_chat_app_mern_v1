import bcrypt from 'bcryptjs';

export { encryptPassword, decryptPassword };

export class Bcrypt {
  public async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async decryptPassword(password: string, hash: string): Promise<boolean> {
    const res = await bcrypt.compare(password, hash);
    return res;
  }
}

const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const decryptPassword = async (password: string, hash: string): Promise<void> => {
  await bcrypt.compare(password, hash);
};
