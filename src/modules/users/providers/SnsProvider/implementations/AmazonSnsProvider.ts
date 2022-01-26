import {
  SNSClient,
  PublishCommand,
  PublishBatchCommandOutput,
} from '@aws-sdk/client-sns';
import { v4 } from 'uuid';
import { fromIni } from '@aws-sdk/credential-provider-ini';

import SnsProvider from '../interfaces/SnsProvider';

const snsClient = new SNSClient({
  region: 'us-east-1',
  credentials: fromIni({ profile: 'luiz' }),
});

class AmazonSnsProvider implements SnsProvider {
  public async sendMessage(
    payload: string
  ): Promise<PublishBatchCommandOutput> {
    const awsArn = 'arn:aws:sns:us-east-1:642742663663:auth-ms-signup-dev.fifo';

    const params = {
      Message: payload,
      TopicArn: awsArn,
      MessageGroupId: v4(),
    };

    const data = await snsClient.send(new PublishCommand(params));

    return data;
  }
}

export default AmazonSnsProvider;
