import Mailgun from 'mailgun.js';
import { appConfig } from '../../config';

export class EmailService {
  private static instance: EmailService;
  private mailgun: Mailgun;
  private client: any;

  private constructor() {
    this.mailgun = new Mailgun(null);
    this.client = this.mailgun.client({
      username: 'api',
      key: appConfig.mailgunApiKey,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EmailService();
    }
    return this.instance;
  }

  send(email: string) {
    this.client.messages
      .create('sandbox53e866823071468789ca9bd7bab0fff1.mailgun.org', {
        from: 'Mailgun Sandbox <postmaster@sandbox53e866823071468789ca9bd7bab0fff1.mailgun.org>',
        to: [email],
        subject: 'Подтвердите почту',
        template: 'email approve',
        't:variables': {
          url: 'test',
        },
      })
      .then((msg) => console.log(msg))
      .catch((err) => console.log(err));
  }
}
