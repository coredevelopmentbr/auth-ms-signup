export default interface SnsProvider {
  sendMessage(payload: string): Promise<unknown>;
}
