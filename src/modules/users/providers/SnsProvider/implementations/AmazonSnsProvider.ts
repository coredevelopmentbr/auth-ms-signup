import {
  SNSClient,
  PublishCommand,
  PublishBatchCommandOutput,
} from '@aws-sdk/client-sns';
import { fromCognitoIdentity } from '@aws-sdk/credential-providers';
import SnsProvider from '../interfaces/SnsProvider';

const REGION = 'us-east-1';
// const PROFILE = 'teste';

const snsClient = new SNSClient({
  region: REGION,
  credentials: fromCognitoIdentity({
    identityId: 'us-east-1:b3e7a493-09e9-44ef-9518-ff0af2077675',
    clientConfig: REGION,
  }),
});

class AmazonSnsProvider implements SnsProvider {
  public async sendMessage(
    payload: string
  ): Promise<PublishBatchCommandOutput> {
    const awsArn = 'arn:aws:sns:us-east-1:642742663663:auth-ms-signup-dev.fifo';

    const params = {
      Message: payload,
      TopicArn: awsArn,
    };

    const data = await snsClient.send(new PublishCommand(params));

    return data;
  }
}

export default AmazonSnsProvider;
