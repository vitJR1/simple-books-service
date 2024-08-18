import Mailgun from 'mailgun.js';
import formData from 'form-data';
import { appConfig } from '../../config';
import { logger } from '../../logger';

export class EmailService {
  private static instance: EmailService;
  private mailgun: Mailgun;
  private client: any;

  private constructor() {
    this.mailgun = new Mailgun(formData);
    this.client = this.mailgun.client({
      username: 'api',
      key: appConfig.mailgunApiKey,
    });
  }

  static getInstance() {
    if (!this.checkRequiredEnv()) {
      throw Error('Email service disabled');
    }
    if (!this.instance) {
      this.instance = new EmailService();
    }
    return this.instance;
  }

  private static checkRequiredEnv(): boolean {
    return (
      appConfig.mailgunApiKey !== undefined &&
      appConfig.mailgunDomain !== undefined
    );
  }

  async send(
    email: string,
    template: string,
    vars: Record<string, string>,
  ): Promise<void> {
    await this.client.messages
      .create(appConfig.mailgunDomain, {
        from: `no-reply<${appConfig.mailgunDomain}>`,
        to: [email],
        template: template,
        't:variables': vars,
      })
      .then((msg) => {
        logger.info('Email sent', { msg, template, vars });
      })
      .catch((err) => logger.error(err));
  }
}
