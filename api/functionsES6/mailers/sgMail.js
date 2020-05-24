import sgMail from '@sendgrid/mail';
import { sendgridApiKey } from '../config';

sgMail.setApiKey(sendgridApiKey);

export default sgMail;
