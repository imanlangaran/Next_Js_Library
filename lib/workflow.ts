import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";
import { Client as QStashClient, resend } from "@upstash/qstash"


export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken!,
})

export const sendEmail = async ({email, subject, message}:{email: string, subject: string, message: string}) => {
  // await qstashClient.publishJSON({
  //   api: {
  //     name: "email",
  //     provider: resend({token: config.env.upstash.resendToken!}),
  //   }, 
  //   body:{
  //     from: "ImanLangaran <iman.langaran.ir>",
  //     to: [email],
  //     subject,
  //     html: message,
  //   }
  // })

  console.log("this is sendEmail function from lib\workflow.ts", { subject: subject, message: message, email: email });
}