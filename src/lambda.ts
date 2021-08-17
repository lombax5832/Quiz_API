import { app } from "./app"
import serverlessExpress from "@vendia/serverless-express"

exports.handler = serverlessExpress({ app })