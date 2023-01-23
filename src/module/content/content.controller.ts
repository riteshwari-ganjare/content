import { Controller, Get, Query } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { RMQPayloadDto } from "src/submodule/rmq/src/dtos/rmqPayload.dto";
import { RmqTopics } from "src/submodule/rmq/src/enums/rmqTopics";
import {ContentService} from "./content.service"
@Controller("content")
export default class ContentController{
    constructor(private readonly contentService: ContentService) {}
    @EventPattern(RmqTopics.CONTENT_CREATION_TOPIC)
    async createContent(data: any) {
      try{
        let rmqPayload: RMQPayloadDto = data.payload

        console.log("Received content dto : ",rmqPayload)
  
        await this.contentService.createContent(rmqPayload.payload)
      }
      catch(err){
        console.log(err)
      }
      
    }
   


    @Get('/user-profile')
    async fetchContentByUser(@Query() query: { userId: number }){
      try{
        let { userId } = query;
        let fetchedContent = await this.contentService.fetchContentByUser(userId);
        return fetchedContent;
      }
      catch(err){
        console.log(err)
      }
    }
}