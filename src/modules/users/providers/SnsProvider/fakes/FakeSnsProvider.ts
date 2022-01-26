import SnsProvider from '../interfaces/SnsProvider';

class SNSProvider implements SnsProvider {
  public async sendMessage(payload: string): Promise<unknown> {
    return payload;
  }
}

export default SNSProvider;
